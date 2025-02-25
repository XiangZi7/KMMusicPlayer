<script setup lang="ts">
import { API } from '@/api/interface'
import { PropType } from 'vue'
import { formatMillisecondsToTime } from '@/utils'
import { urlV1 } from '@/api'
import default_album from '@/assets/default_album.jpg'
const audio = AudioStore()
const router = useRouter()
const { loadTrack, play } = useAudioPlayer()

defineProps({
  data: {
    type: Array as PropType<API.Song[]>,
    default: () => [],
  },
})

// 转换歌曲实体
const convertToTrackModel = (song: API.Song) => {
  return {
    id: song.id.toString(), // 假设 song.id 是个数字，需要转换成字符串
    title: song.name,
    artist: song.ar.map((artist) => artist.name).join(', '), // 假设 artist 是一个对象数组
    album: song.al.name, // 假设 album 的名称是字符串
    cover: song.al.picUrl || default_album, // 假设有封面图片的 URL
    url: '', // 假设有音频地址
    duration: song.dt, // 毫秒
  }
}

// 双击播放
const handleRowDblclick = async (row: API.Song) => {
  // 转换歌曲实体
  const track = convertToTrackModel(row)
  // 添加到播放列表
  audio.addTracks(track)
  // 播放
  await loadTrack()
  play()
}

const downLoadMusic = (row: API.Song) => {
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
          `${row.name} - ${row.ar.map((item: any) => item.name).join(' ')}`
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
</script>
<template>
  <el-table
    :data="data"
    style="
      --el-table-border: none;
      --el-table-border-color: none;
      --el-table-tr-bg-color: none;
      --el-table-header-bg-color: none;
      --el-table-row-hover-bg-color: hsl(var(--background));
    "
    class="!rounded-lg !h-full"
    @row-dblclick="handleRowDblclick"
  >
    <el-table-column prop="name" label="标题">
      <template #default="{ row }">
        <div class="flex gap-2 items-center">
          <div class="w-10 h-10" v-if="row.al.picUrl">
            <el-image
              :src="row.al.picUrl + '?param=90y90'"
              fit="cover"
              lazy
              :alt="row.name"
              class="w-full h-full rounded-md"
            />
          </div>
          <div class="flex-1 line-clamp-1">{{ row.name }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="ar" label="艺术家">
      <template #default="{ row }">
        <div class="line-clamp-1 w-48">
          {{ row.ar.map((item: any) => item.name).join(' \ ') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="al" label="专辑">
      <template #default="{ row }">
        {{ row.al.name }}
      </template>
    </el-table-column>
    <el-table-column prop="dt" label="时长">
      <template #default="{ row }">
        {{ formatMillisecondsToTime(row.dt) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button text circle>
          <icon-mingcute:play-circle-line class="text-lg" />
        </el-button>
        <el-button text circle v-if="row.mv">
          <icon-solar:video-frame-linear
            class="text-lg"
            @click="router.push(`/mv/${row.mv}`)"
          />
        </el-button>
        <el-button text circle @click="downLoadMusic(row)">
          <icon-carbon:cloud-download class="text-lg" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
