<script setup lang="ts">
import { getTopSong, topPlaylist, API } from '@/api'
import { formatMillisecondsToTime, replaceUrlParams } from '@/utils'
const router = useRouter()
const audio = AudioStore()

const { loadTrack, play } = useAudioPlayer()

// 推荐歌单
const recommendeList = ref<API.Playlist[]>([])
// 排行榜
const topSongList = ref<API.TopSongItem[]>([])

onMounted(async () => {
  // 获取推荐歌单
  const { playlists } = await topPlaylist({
    limit: 6,
    order: 'hot',
    cat: '欧美',
  })
  recommendeList.value = playlists

  // 获取排行榜
  const { data } = await getTopSong()
  topSongList.value = data
})

// 转换歌曲实体
const convertToTrackModel = (song: any) => {
  return {
    id: song.id.toString(),
    title: song.name,
    artist: song.artists.map((artist: any) => artist.name).join(', '),
    album: song.album.name,
    cover: song.album.picUrl || '',
    url: '',
    duration: song.duration,
  }
}

const handlePlaylclick = async (row: any) => {
  // 转换歌曲实体
  const track = convertToTrackModel(row)
  // 添加到播放列表
  audio.addTracks(track)
  // 播放
  await loadTrack()
  play()
}
</script>
<template>
  <div class="flex gap-6 p-4 w-full">
    <div class="flex-1">
      <div class="w-full flex flex-col overflow-hidden mb-8">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-200 via-pink-200 to-blue-200 mb-8 dark:bg-gradient-to-r dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900"
        >
          <div class="p-6 pb-20 md:pb-6 banner">
            <div class="max-w-[60%]">
              <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
                Sailor Legends:<br />A Journey of Courage and Friendship
              </h1>
              <p class="text-white/90 mb-4">with Usagi Tsukino</p>
              <div class="flex items-center gap-4 text-sm text-white/80 mb-6">
                <div class="flex items-center gap-2">
                  <icon-tabler:play />
                  10,000+ plays
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-white/80"></div>
                  160 currently listening
                </div>
              </div>
              <div class="flex gap-3">
                <button
                  @click="router.push('/playlist/2636813460')"
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-black/90 hover:bg-black text-white"
                >
                  <icon-tabler:play />
                  Listen now</button
                ><button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <icon-material-symbols:add />
                  Add to playlist
                </button>
              </div>
            </div>
          </div>
          <!-- <img
              alt="Podcast host illustration"
              loading="lazy"
              width="400"
              height="400"
              class="absolute bottom-0 right-0 md:right-6"
            /> -->
          <img
            alt="Podcast host illustration"
            width="350"
            height="350"
            class="absolute top-0 right-0 md:right-10"
            src="@/assets/banner/35.png"
          />
        </div>
        <!-- Recommended -->
        <div class="">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Recommended For Today</h2>
            <button
              @click="router.push('/playlist')"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-10 px-4 py-2"
            >
              See more
            </button>
          </div>
          <div class="grid grid-cols-4 md:grid-cols-6 gap-4">
            <div
              class="rounded-lg transition duration-300 hover:bg-themeBgColor bg-card text-card-foreground border-0 shadow-nonec"
              v-for="i in recommendeList"
              :key="i.id"
            >
              <div class="p-0">
                <div class="aspect-square rounded-2xl overflow-hidden">
                  <img
                    :alt="i.name"
                    loading="lazy"
                    width="200"
                    height="200"
                    class="w-full h-full object-cover"
                    :src="replaceUrlParams(i.coverImgUrl, 'param=350y350')"
                  />
                </div>
                <div class="flex flex-col p-2">
                  <h3 class="font-medium mb-1 line-clamp-1">{{ i.name }}</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ i.creator.nickname }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 歌曲 -->
      <div class="w-full">
        <h2 class="text-xl font-semibold mb-4">Recently played</h2>
        <el-scrollbar class="h-96">
          <div class="grid gap-3">
            <div
              v-for="item in topSongList"
              :key="item.id"
              class="flex items-center gap-4 transition duration-300 hover:bg-themeBgColor"
              @dblclick="handlePlaylclick(item)"
            >
              <div class="w-16 h-16 rounded-2xl overflow-hidden">
                <el-image
                  :alt="item.album.name"
                  width="64"
                  height="64"
                  class="w-full h-full object-cover"
                  :src="item.album.picUrl + '?param=90y90'"
                />
              </div>
              <div class="flex-1">
                <h3 class="font-medium">{{ item.album.name }}</h3>
                <p class="text-sm text-muted-foreground line-clamp-1">
                  {{ item.artists.map((item) => item.name).join('  ') }}
                </p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground line-clamp-1">
                  {{ formatMillisecondsToTime(item.duration) }}
                </p>
              </div>
              <div class="flex items-center justify-end gap-4 w-1/5">
                <button
                  @click="handlePlaylclick(item)"
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full"
                >
                  <icon-tabler:play class="text-base" />
                </button>
                <button
                  v-if="item.mvid"
                  @click="router.push(`/mv/${item.mvid}`)"
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full"
                >
                  <icon-solar:video-frame-linear class="text-base" />
                </button>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABkCAMAAADqvX3PAAAAKlBMVEUAAADX19fX19fBwcHT09PX19fW1tbT09PW1tbV1dXOzs7Ozs7BwcHV1dX5uIg2AAAADnRSTlMAPQAKH0czAAApFAAAAHys1goAAAHwSURBVHja7ZfdcuMwCEb1GUIDcd//dZuk2n5rZzCKOzuzFzo3+XNOBAIHtQosxwi0XUw/jjh2qN1pVzV43FJwJIDLuq5tvaNmzxeEZI5wWP/p9v0gypgGYhGH8fL28yyM7ycOJkFlJW3tZDHhRdBjIO22JR6a1BGMgTAWopvr6BC1jSB1MDWyXYfvkpDlg4iiV83lITiuoXZL+U4/ltcNq2MhogaYBWMYjYU8HHfSRdTrCIOLYImemrfz8dMO6DlVGYyFMWz3tmuGY6GgO1ikXVM51JDXurBO0nyEcyPTnvOXvmyb0hzqfV64jUUYw47Re9CZe6EbeC+M39+TcfK/gTFZuxZgOSag7aMASwGkrQW1Y2lLwXRMx3RMx3T8Pw67FpSOcA5RCccOcTMNL05aRw7Fn2kizA7+1VNH6ENAOBgOxiIK888dHPVqh+Q/yeknzQfHkhx+nqyjT0QFzDUd2Skp53lp7PdFnEkYIhzQv/KRzJUV0QdDSON5+S14CEW0vqSTiAPWWDknCLsY0BZxnNP0L/Z9YQEO8yznXZ2yNwfgTu7rNFgj9aamvS9eZljMTNOeoybSGNwQkvZ+3XrCU07t4HmWSBjDLBzEwdSzhMYcRPRZNYmgdjA1FyahcKQIqpKZs8N0TMd0TMd0/BvHF8n9f8tHo7HcAAAAAElFTkSuQmCC),
    linear-gradient(to right, #fd31a2, #ff3a8b, #ff4b78, #cf4af3, #e73bd7);
}
</style>
