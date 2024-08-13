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
  console.log('🚀 => row:', row)
  // urlV1(row.id).then(({ data }) => {
  //   console.log(data[0].url)
  //   const musicUrl = data[0].url
  //   const link = document.createElement('a')
  //   link.href = musicUrl
  //   link.setAttribute('download', row.name)
  //   link.click()
  // })
}

const formatMillisecondsToTimes = (time: number) => {
  return formatMillisecondsToTime(time)
}
</script>
<template>
  <div class="h-full w-full">
    <el-table
      :data="tableData"
      style="
        width: 100%;
        --el-table-border: none;
        --el-table-border-color: none;
      "
      @row-dblclick="playMusic"
      class="!text-xs"
    >
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
            <span class="line-clamp-1" :title="row.name">{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template #default="{ row }">
          <span
            class="line-clamp-1"
            :title="row.ar.map((ar: any) => ar.name).join(' / ')"
          >
            {{ row.ar.map((ar: any) => ar.name).join(' / ') }}
          </span>
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
              v-if="row.mv !== 0"
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
