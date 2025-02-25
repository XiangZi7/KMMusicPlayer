<script setup lang="ts">
import { playlistDetail, API } from '@/api'
import { formatNumber, parseTimestamp } from '@/utils'
const route = useRoute()
const audui = AudioStore()
const playlist = ref<API.PlaylistDetail | null>(null)
const { loadTrack, play } = useAudioPlayer()
watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      playlist.value = null
      const res = await playlistDetail(id as string)
      playlist.value = res.playlist
    }
  },
  { immediate: true }
)

const handlePlayAll = async () => {
  audui.setAudioStore('trackList', [])

  if (!playlist.value) return

  const result = playlist.value.tracks.map((song) => {
    return {
      id: song.id.toString(), // 假设 song.id 是个数字，需要转换成字符串
      title: song.name,
      artist: song.ar.map((artist) => artist.name).join(', '), // 假设 artist 是一个对象数组
      album: song.al.name, // 假设 album 的名称是字符串
      cover: song.al.picUrl || '', // 假设有封面图片的 URL
      url: '', // 假设有音频地址
      duration: song.dt, // 毫秒
    }
  })

  audui.setAudioStore('trackList', result)
  audui.setAudioStore('currentSongIndex', 0)
  // 播放
  await loadTrack()
  play()
}
</script>
<template>
  <div class="flex flex-col h-full bg-background flex-1 md:overflow-hidden">
    <div class="flex flex-col md:flex-row p-6 gap-6">
      <div class="flex-shrink-0 w-60 h-60">
        <img
          :alt="playlist?.name"
          class="w-full h-full object-cover rounded-lg shadow-lg"
          :src="playlist?.coverImgUrl + '?param=500y500'"
        />
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ playlist?.name }}</h1>
          <p
            class="text-muted-foreground mb-4 line-clamp-2"
            :title="playlist?.description"
          >
            {{ playlist?.description }}
          </p>
          <div
            class="flex items-center gap-2 text-sm text-muted-foreground mb-4"
          >
            <span
              class="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6"
            >
              <img
                class="aspect-square h-full w-full"
                :alt="playlist?.creator.nickname"
                :src="playlist?.creator.avatarUrl"
            /></span>
            <span>{{ playlist?.creator.nickname }}</span>
            <span>•</span>
            <span>{{ playlist?.trackCount }} 首歌曲</span>
          </div>
          <div
            class="flex items-center gap-2 text-sm text-muted-foreground"
            v-if="playlist?.tags"
          >
            <el-tag
              v-for="tag in playlist?.tags"
              class="text-sm"
              effect="dark"
              :key="tag"
              >{{ tag }}
            </el-tag>
          </div>
        </div>
        <div class="flex items-center gap-4 mt-4">
          <button
            @click="handlePlayAll"
            class="text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
          >
            <icon-solar:play-line-duotone />
            播放</button
          ><button
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
          >
            <icon-ic:sharp-favorite-border /></button
          ><button
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
            type="button"
            id="radix-:r0:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <icon-ion:more />
          </button>
        </div>
      </div>
    </div>
    <Table :data="playlist?.tracks" class="flex-1 md:overflow-x-hidden" />
    <div class="border-t p-4 text-sm text-muted-foreground">
      <span>{{ formatNumber(playlist?.subscribedCount ?? 0) }} 次收藏</span>
      <span class="mx-2">•</span>
      <span>{{ formatNumber(playlist?.playCount ?? 0) }} 次播放</span>
      <span class="mx-2">•</span>
      <span>{{ formatNumber(playlist?.shareCount ?? 0) }} 次分享</span>
      <span class="mx-2">•</span>
      <span>{{ formatNumber(playlist?.commentCount ?? 0) }} 条评论</span>
      <span class="mx-2">•</span>
      <span>创建于 {{ parseTimestamp(playlist?.createTime ?? '0') }}</span>
    </div>
  </div>
</template>
