<script setup lang="ts">
import { formatNumber, formatMillisecondsToTime } from '@/utils'
import { getAllMV, API } from '@/api'
import { mvTabs, areasList, orderList } from '@/utils/enum'

const { pause } = useAudioPlayer()
const router = useRouter()
const videos = ref<API.MV[]>([])

// MV 类型
const selected = ref('全部')
// 区域
const selectedArea = ref('全部')
// 排序
const selectedOrder = ref('上升最快')

onMounted(() => {
  handlegetAllMV()
})

const handlegetAllMV = () => {
  getAllMV({
    area: selectedArea.value,
    order: selectedOrder.value,
    type: selected.value,
    limit: 30,
  }).then((res) => {
    videos.value = res.data
  })
}

const changeTabs = (id: string) => {
  selected.value = id
  handlegetAllMV()
}

const handleClickVideo = (id: number | string) => {
  pause()
  router.push(`/mv/${id}`)
}
</script>
<template>
  <div class="p-6 w-full">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Music Videos</h1>
      <div class="flex items-center gap-4">
        <div class="relative">
          <icon-akar-icons:search
            class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 w-64"
            placeholder="Search MVs"
            disabled
          />
        </div>
        <button
          disabled
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <icon-cil:filter />
          Filters
        </button>
        <el-select v-model="selectedArea" class="w-28" @change="handlegetAllMV">
          <el-option
            v-for="item in areasList"
            :key="item"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="selectedOrder"
          class="w-28"
          @change="handlegetAllMV"
        >
          <el-option
            v-for="item in orderList"
            :key="item"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="mb-4">
      <div
        class="inline-flex h-10 items-center rounded-md bg-muted/70 p-1 text-muted-foreground w-full justify-start mb-4 overflow-x-auto"
      >
        <button
          v-for="tab in mvTabs"
          :key="tab.id"
          @click="changeTabs(tab.id)"
          :class="{
            'bg-background text-foreground shadow-sm': selected === tab.id,
          }"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div
      class="rounded-lg flex items-center justify-around border bg-card text-card-foreground shadow-sm mb-8 overflow-hidden"
    >
      <div class="p-0 relative aspect-video h-96">
        <img
          class="w-full object-cover h-full"
          src="http://p1.music.126.net/vPYrihz3y-E6QOA0e-cdtw==/109951163015017142.jpg"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <h2 class="text-2xl font-bold mb-2">Catch the Moment 中文版</h2>
          <p class="text-lg mb-4">LiSA</p>
          <div class="flex items-center gap-4">
            <button
              @click="handleClickVideo('5646424')"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-white text-black hover:bg-gray-200"
            >
              <icon-ic:baseline-play-circle-outline />
              Play Now</button
            ><button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-white border-white hover:bg-white/20"
            >
              <icon-material-symbols:favorite-outline />
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
      <div class="p-0 relative aspect-video h-96">
        <img
          class="w-full object-cover h-full"
          src="http://p1.music.126.net/4oha9uHv_5hnHkcavczUyg==/109951163019982124.jpg"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <h2 class="text-2xl font-bold mb-2">
            《刀剑神域：序列之争》终极版预告
          </h2>
          <p class="text-lg mb-4">V.A.</p>
          <div class="flex items-center gap-4">
            <button
              @click="handleClickVideo('5619462')"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-white text-black hover:bg-gray-200"
            >
              <icon-ic:baseline-play-circle-outline />
              Play Now</button
            ><button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-white border-white hover:bg-white/20"
            >
              <icon-material-symbols:favorite-outline />
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Popular Music Videos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="video in videos"
          :key="video.id"
          @click="handleClickVideo(video.id)"
          class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
        >
          <div class="p-0">
            <div class="aspect-video relative group">
              <el-image
                class="w-full h-full"
                :alt="video.name"
                lazy
                :src="video.cover + '?param=422y237'"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-play w-12 h-12"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-1">{{ video.name }}</h3>
              <p class="text-sm text-muted-foreground mb-2">
                {{ video.artistName }}
              </p>
              <div
                class="flex items-center justify-between text-sm text-muted-foreground"
              >
                <div class="flex items-center gap-1">
                  <icon-mdi:eye-outline class="lucide lucide-clock w-4 h-4" />
                  <span>{{ formatNumber(video.playCount) }} views</span>
                </div>
                <div class="flex items-center gap-1">
                  <icon-mingcute:time-duration-line
                    class="lucide lucide-clock w-4 h-4"
                  />
                  <span>{{ formatMillisecondsToTime(video.duration) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
