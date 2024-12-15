<script setup lang="ts">
  import { playlistDetail, commentPlaylist } from '@/api'
  import { PlaylistDetailResponse } from '@/api/interface'
  import { Track } from '@/stores/interface.ts'
  import { Comment } from '@/api/interface'

  const route = useRoute()
  const audioStore = useAudioStore()
  const state = reactive({
    playlistData: {
      playlist: {
        tracks: [],
      },
    } as unknown as PlaylistDetailResponse,
    commentListData: [] as Comment[],
    drawer: false,
  })
  const { playlistData, commentListData, drawer } = toRefs(state)

  onMounted(() => {
    playlistDetail(route.query.id as string).then((res) => {
      state.playlistData = res
    })
  })

  function formatNumber(num: number): string {
    if (num < 10000) {
      return num.toString() // 直接返回小于10000的数字
    } else if (num < 100000) {
      const formatted = (num / 10000).toFixed(1)
      return formatted.endsWith('.0')
        ? formatted.slice(0, -2) + '万'
        : formatted + '万' // 处理 1.0万 和 1.5万
    } else {
      return (num / 10000).toFixed(0) + '万' // 对于大于或等于100000的数字，直接显示为整数的万
    }
  }

  function formattedDate(str: string) {
    return new Date(str).toLocaleString()
  }

  const getCommentPlaylist = (pages: number = 1) => {
    commentPlaylist({ offset: pages, id: route.query.id as string }).then(
      (res) => {
        state.commentListData = state.commentListData.concat(res.comments)
      }
    )
  }

  const showDrawer = () => {
    state.drawer = true
    if (state.commentListData.length > 0) return
    commentPlaylist({ offset: 1, id: route.query.id as string }).then((res) => {
      state.commentListData = res.comments
    })
  }

  const playMusic = () => {
    let newArr = playlistData.value.playlist.tracks.map((row) => {
      return {
        id: row.id,
        title: row.name,
        singer: row.ar.map((ar: any) => ar.name).join(' / '),
        album: row.al.name,
        cover: row.al.picUrl,
        time: row.dt,
        source: '',
        mv: row.mv as number,
      }
    })
    audioStore.addTrack(newArr as unknown as Track[])
  }
</script>
<template>
  <div class="container p-6 overflow-hidden h-full flex-1">
    <div class="flex gap-6 h-full">
      <div class="flex-[20%] max-w-[20%] space-y-4 relative" v-if="playlistData.playlist.coverImgUrl">
        <img
          alt="Album cover"
          class="w-full aspect-square object-cover rounded-lg shadow-xl"
          :src="playlistData.playlist.coverImgUrl + '?param=560y560'"
        />
        <div
          class="absolute top-0 right-2 bg-gray-400/50 dark:bg-gray-600/50 px-2 py-1 rounded-md text-white text-sm flex items-center gap-1"
        >
          <icon-ic:outline-play-circle />
          {{ formatNumber(playlistData.playlist.playCount) }}
        </div>

        <div class="flex items-center space-x-4">
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12"
          >
            <img
              class="aspect-square h-full w-full"
              alt="Creator avatar"
              :src="playlistData.playlist.creator?.avatarUrl"
            />
          </span>
          <div>
            <p class="text-sm font-medium">Created by</p>
            <p class="text-lg font-semibold">
              {{ playlistData.playlist.creator?.nickname }}
            </p>
          </div>
        </div>
        <h1 class="text-2xl font-bold tracking-tight dark:text-white">
          {{ playlistData.playlist.name }}
        </h1>
        <div
          class="flex gap-2 text-muted-foreground dark:text-gray-300 text-sm md:text-base"
        >
          <span
            class="bg-[var(--el-color-primary)] text-white dark:bg-gray-700 px-2 py-1 rounded-md text-sm"
            v-for="item in playlistData.playlist.tags"
            >{{ item }}</span
          >
        </div>
        <p
          class="text-muted-foreground dark:text-gray-300 text-sm md:line-clamp-5"
          :title="playlistData.playlist.description"
        >
          {{ playlistData.playlist.description }}
        </p>
        <div class="flex gap-1 w-full">
          <div class="flex items-center">
            <el-button text circle class="!p-3" @click="playMusic">
              <icon-material-symbols:play-circle-outline
                class="text-xl dark:text-white"
              />
            </el-button>
            <span class="text-sm dark:text-gray-300">
              {{ formatNumber(playlistData.playlist.playCount) }}
            </span>
          </div>
          <div class="flex items-center">
            <el-button text circle class="!p-3">
              <icon-mdi:cards-heart-outline class="text-xl dark:text-white" />
            </el-button>
            <span class="text-sm dark:text-gray-300">
              {{ formatNumber(playlistData.playlist.subscribedCount) }}
            </span>
          </div>
          <div class="flex items-center">
            <el-button text circle class="!p-3" @click="showDrawer">
              <icon-uil:comment-dots class="text-xl dark:text-white" />
            </el-button>
            <span class="text-sm dark:text-gray-300">
              {{ formatNumber(playlistData.playlist.commentCount) }}
            </span>
          </div>
        </div>
        <p class="text-muted-foreground dark:text-gray-300 text-sm">
          创建于{{ formattedDate(playlistData.playlist.createTime) }}
        </p>
        <span class="text-muted-foreground dark:text-gray-300 text-sm">
          共{{ playlistData.playlist.trackCount }}首歌曲
        </span>
      </div>
      <div class="flex flex-col flex-1 overflow-x-hidden">
        <div class="gap-6 flex flex-1">
          <div class="relative w-full h-full">
            <MusicList v-model="playlistData.playlist.tracks" />
          </div>
        </div>
      </div>
    </div>
    <CommentPopup
      v-model="drawer"
      :data="commentListData"
      @DIntersect="getCommentPlaylist"
    />
  </div>
</template>
