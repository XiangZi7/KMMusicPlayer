<script setup lang="ts">
  import { urlV1 } from '@/api'
  import { MusicPlayer } from '@/hooks/interface'
  import { Song } from '@/api/interface'
  import { Track } from '@/stores/interface'

  const tableData = defineModel<Song[]>()
  const AudioStore = useAudioStore()
  const router = useRouter()
  const { playSong } = inject('MusicPlayer') as MusicPlayer

  // 存储音乐并且播放
  const playMusic = async (row: Song) => {
    const existingIndex = AudioStore.trackList.findIndex(
      (existingTrack) => existingTrack.id === row.id
    )

    if (existingIndex === -1) {
      try {
        const { data } = await urlV1(row.id)
        const param: Track = {
          id: row.id,
          title: row.name,
          singer: row.ar.map((ar: any) => ar.name).join(' / '),
          album: row.al.name,
          cover: row.al.picUrl,
          time: row.dt,
          source: data[0].url,
          mv: row.mv as number,
        }

        AudioStore.addTrackAndPlay(param)
        playSong(param) // 自动播放新添加的歌曲
      } catch (error) {
        console.error('Error fetching music URL:', error)
      }
    } else {
      const existingTrack = AudioStore.trackList[existingIndex]
      AudioStore.addTrackAndPlay(existingTrack)
      playSong(existingTrack) // 自动播放已存在的歌曲
    }
  }

  const downLoadMusic = (row: Song) => {
    urlV1(row.id).then(({ data }) => {
      const musicUrl = data[0].url

      // 发起请求以获取音乐文件的二进制数据
      fetch(musicUrl)
        .then((response) => response.blob()) // 将响应转换为 blob
        .then((blob) => {
          const link = document.createElement('a')
          const url = URL.createObjectURL(blob) // 创建blob URL

          // 设置下载链接
          link.href = url
          link.setAttribute(
            'download',
            `${row.name} - ${row.ar.map((item) => item.name).join(' ')}`
          ) // 修改下载的文件名
          document.body.appendChild(link) // 将链接添加到DOM中（临时）
          link.click() // 触发点击下载

          // 清理 URL 对象和链接
          URL.revokeObjectURL(url)
          document.body.removeChild(link) // 删除链接
        })
        .catch((error) => {
          console.error('Download failed:', error)
        })
    })
  }

  const formatMillisecondsToTimes = (time: number) => {
    return formatMillisecondsToTime(time)
  }
</script>
<template>
  <div
    class="h-full w-full box-border flex flex-1 flex-col overflow-x-hidden overflow-auto"
  >
    <el-table
      :data="tableData"
      style="
        width: 100%;
        --el-table-border: none;
        --el-table-border-color: none;
      "
      @row-dblclick="playMusic"
      class="!text-xs !flex-1"
    >
      <!--歌名-->
      <el-table-column prop="name" label="歌名">
        <template #default="{ row }">
          <div class="flex items-center gap-1">
            <div class="min-w-10 h-10">
              <el-image
                class="w-full h-full rounded-lg"
                lazy
                :src="row.al.picUrl + '?param=90y90'"
                :alt="row.al.name"
              />
            </div>
            <span
              class="line-clamp-1 cursor-pointer"
              @click="router.push(`/search?kw=${row.name}`)"
              :title="row.name"
              >{{ row.name }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template #default="{ row }">
          <div class="line-clamp-1">
            <template v-if="row.ar && row.ar.length">
              <router-link
                v-for="(item, index) in row.ar"
                :key="item.id"
                class="cursor-pointer"
                :to="`/search?kw=${item.name}`"
              >
                {{ item.name }}
                <!-- 在这里添加分隔符 -->
                <span v-if="index < row.ar.length - 1"> \ </span>
              </router-link>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑">
        <template #default="{ row }">
          <span class="line-clamp-1" :title="row.al.name">
            {{ row.al.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="{ row }">
          <span>
            {{ formatMillisecondsToTimes(row.dt) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="" width="180">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-button type="primary" text circle @click="playMusic(row)">
              <icon-mingcute:play-circle-line class="text-lg text-gray-500" />
            </el-button>
            <el-button
              type="primary"
              text
              circle
              v-if="row.mv && row.mv !== 0"
              @click="router.push(`/video?id=${row.mv}`)"
            >
              <icon-solar:video-frame-linear class="text-lg text-gray-500" />
            </el-button>
            <el-button type="primary" text circle @click="downLoadMusic(row)">
              <icon-carbon:cloud-download class="text-lg text-gray-500" />
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
