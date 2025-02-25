<script setup lang="ts">
const router = useRouter()
import { aniSearch, API } from '@/api'
const tabs = ref([
  { id: 'all', label: '最新', content: '最新动漫内容在这里展示...' },
  { id: 'action', label: '动作', content: '动作类动漫内容在这里展示...' },
  { id: 'adventure', label: '冒险', content: '冒险类动漫内容在这里展示...' },
  { id: 'fantasy', label: '奇幻', content: '奇幻类动漫内容在这里展示...' },
  { id: 'drama', label: '剧情', content: '剧情类动漫内容在这里展示...' },
])

const selected = ref('all') // Default selected button

const selectedType = ref('')
const selectedYear = ref('')

// 动漫类型
const types = [
  { label: '冒险', value: '1' },
  { label: '奇幻', value: '2' },
  { label: '科幻', value: '3' },
  { label: '爱情', value: '4' },
  { label: '喜剧', value: '5' },
]

const years = [
  { label: '一年', value: '1' },
  { label: '两年', value: '2' },
  { label: '三年', value: '3' },
  { label: '五年', value: '5' },
  { label: '十年', value: '10' },
]

const animes = ref<API.Anime[]>([])

const searchText = ref('')
const searchAnimes = async () => {
  const res = await aniSearch({
    kw: searchText.value,
    type: 'nnyy',
  })
  animes.value = res.data
}
</script>
<template>
  <div class="flex h-full w-full">
    <aside class="w-64 border-r p-4 flex flex-col">
      <div class="space-y-4">
        <el-input
          placeholder="搜索动漫..."
          v-model="searchText"
          @keyup.enter="searchAnimes"
        />
        <el-select placeholder="请选择类型" v-model="selectedType">
          <el-option
            v-for="type in types"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>

        <el-select placeholder="请选择年限" v-model="selectedYear">
          <el-option
            v-for="year in years"
            :key="year.value"
            :label="year.label"
            :value="year.value"
          ></el-option>
        </el-select>
      </div>
      <div class="mt-auto text-sm text-muted-foreground">共 6 部动漫</div>
    </aside>
    <main class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col">
        <div class="px-4 py-2 border-b">
          <div
            class="inline-flex h-10 items-center rounded-md bg-muted/70 p-1 text-muted-foreground w-full justify-start overflow-x-auto"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="selected = tab.id"
              :class="{
                'bg-background text-foreground shadow-sm': selected === tab.id,
              }"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
        <!--动漫列表-->
        <div class="flex-1 overflow-x-hidden my-2">
          <div
            class="relative overflow-hidden gap-6 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] px-4 py-2"
          >
            <div
              v-for="anime in animes"
              :key="anime.id"
              class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div
                class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <el-image
                  :alt="anime.title"
                  class="w-full h-48 object-cover"
                  :src="anime.img"
                />
                <div class="flex flex-col space-y-1.5 p-3">
                  <h3
                    class="font-semibold tracking-tight text-base line-clamp-1"
                  >
                    {{ anime.title }}
                  </h3>
                </div>
                <div class="p-3 pt-0">
                  <div
                    class="flex items-center text-sm text-muted-foreground mb-2"
                  >
                    <icon-streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars
                      class="lucide lucide-star w-4 h-4 text-yellow-400 mr-1"
                    />
                    <span>{{ anime.rate }}</span>
                    <span class="mx-2">•</span>
                    <icon-material-symbols:calendar-month-outline
                      class="lucide lucide-calendar w-4 h-4 mr-1"
                    />
                    <span>{{ anime.year }}</span>
                  </div>
                  <div class="flex flex-wrap gap-1 mb-2">
                    {{ anime.country }}
                    <!-- <div
                    v-for="genre in anime.genres"
                    :key="genre"
                    class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs"
                  >
                    {{ genre }}
                  </div> -->
                  </div>
                </div>
                <div class="flex items-center p-3 pt-0">
                  <button
                    @click="
                      router.push(`/animation/play?id=${anime.id}&type=nnyy`)
                    "
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full"
                  >
                    <icon-ic:outline-play-circle
                      class="lucide lucide-play w-4 h-4 mr-2"
                    />
                    观看
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
