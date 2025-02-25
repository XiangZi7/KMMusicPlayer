<script setup lang="ts">
import { categories } from '@/utils/enum'
import { getArtistList, API } from '@/api'

const router = useRouter()
const albumList = ref<API.Artist[]>([])

const selectedArtist = ref('-1')
const selectedarea = ref('-1')
// 切换菜单显示
const toggleMenu = (index: number) => {
  categories.value[index].isOpen = !categories.value[index].isOpen
}

const handleSubCategoryClick = (id: string, index: number) => {
  if (index === 0) {
    selectedArtist.value = id
  } else {
    selectedarea.value = id
  }
  handleGetArtistList()
}

const handleGetArtistList = () => {
  getArtistList({
    area: selectedarea.value,
    type: selectedArtist.value,
  }).then((res) => {
    albumList.value = res.artists
  })
}

onMounted(() => {
  handleGetArtistList()
})
</script>
<template>
  <div class="flex h-full">
    <div class="w-64 bg-background p-4">
      <h2 class="mb-4 text-lg font-semibold">歌手分类</h2>
      <nav>
        <div class="mb-2">
          <button
            class="inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            @click="toggleMenu(0)"
          >
            {{ categories[0].name }}
            <icon-tabler:chevron-right
              :style="{
                transform: categories[0].isOpen
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }"
            />
          </button>
          <div v-show="categories[0].isOpen" class="ml-4 mt-1 space-y-1">
            <button
              v-for="(subCategory, subIndex) in categories[0].subCategories"
              :key="subIndex"
              @click="handleSubCategoryClick(subCategory.id, 0)"
              class="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full justify-start"
              :class="
                selectedArtist === subCategory.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-transparent text-foreground'
              "
            >
              {{ subCategory.label }}
            </button>
          </div>
        </div>
        <div class="mb-2">
          <button
            class="inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            @click="toggleMenu(1)"
          >
            {{ categories[1].name }}
            <icon-tabler:chevron-right
              :style="{
                transform: categories[1].isOpen
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }"
            />
          </button>
          <div v-show="categories[1].isOpen" class="ml-4 mt-1 space-y-1">
            <button
              v-for="(subCategory, subIndex) in categories[1].subCategories"
              :key="subIndex"
              @click="handleSubCategoryClick(subCategory.id, 1)"
              class="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full justify-start"
              :class="
                selectedarea === subCategory.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-transparent text-foreground'
              "
            >
              {{ subCategory.label }}
            </button>
          </div>
        </div>
      </nav>
    </div>
    <main class="flex-1">
      <div class="p-4 md:p-6 lg:p-8">
        <div class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
          <div
            v-for="(artist, index) in albumList"
            :key="index"
            class="group relative overflow-hidden rounded-lg bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <el-image
              lazy
              :alt="artist.name"
              class="h-full w-full transition-transform duration-300 group-hover:scale-110"
              :src="artist.picUrl + '?param=230y230'"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 px-4 text-white opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:opacity-100"
            >
              <h2 class="mb-1 text-xl font-semibold">{{ artist.name }}</h2>
              <p class="mb-2 text-sm" v-if="artist.alias.length > 0">
                {{ artist.alias.map((item) => item).join() }}
              </p>
              <div class="flex items-center justify-between">
                <button
                  @click="router.push(`/artist/${artist.id}`)"
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-xs"
                >
                  <icon-tabler:play />
                  查看</button
                ><button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 w-8"
                  type="button"
                >
                  <icon-akar-icons:more-vertical-fill />
                  <span class="sr-only">更多选项</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
