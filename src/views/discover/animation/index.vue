<script setup lang="ts">
import { aniSearch } from '@/api/index'

const router = useRouter()
type vidioType = 'nnyy' | 'xfani'

interface AnimeItem {
  id: number
  title: string
  img: string
}
const kw = ref('')
const type = ref<vidioType>('nnyy')
const aniList = ref<AnimeItem[]>([])

const options = ref([
  {
    label: 'nnyy',
    value: 'nnyy',
  },
  {
    label: 'xfani',
    value: 'xfani',
  },
])

function toSearch() {
  aniList.value = []
  aniSearch<{ data: AnimeItem[] }>({ kw: kw.value, type: type.value }).then(
    (res) => {
      aniList.value = res.data
    }
  )
}
</script>
<template>
  <div class="h-full bg-gray-50 text-gray-800 p-8" data-id="1">
    <div class="max-w-4xl mx-auto" data-id="2">
      <header class="text-center mb-12" data-id="3">
        <h1 class="text-3xl font-semibold mb-2" data-id="4">
          Anime Movie Search
        </h1>
        <p class="text-gray-600" data-id="5">Find your favorite anime movies</p>
      </header>
      <div class="flex items-center mb-8" data-id="6">
        <el-input
          placeholder="Search for anime movies..."
          type="text"
          size="large"
          v-model="kw"
          @keyup.enter.native="toSearch"
        >
          <template #append>
            <el-select
              v-model="type"
              placeholder="请选择接口"
              size="large"
              style="width: 200px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-input>
        <el-button type="primary" size="large" @click="toSearch">
          <div class="flex items-center gap-1">
            <icon-ic:round-search />
            <span class="text-base">search</span>
          </div>
        </el-button>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
        <div
          class="overflow-hidden"
          v-for="item in aniList"
          :key="item.id"
          @click="router.push(`/animation/play?id=${item.id}&type=${type}`)"
        >
          <el-image
            :alt="item.title"
            class="w-full h-56 object-cover rounded-xl cursor-pointer"
            :src="item.img"
          />
          <h3
            class="text-lg text-center cursor-pointer font-semibold mb-2"
            data-id="14"
          >
            {{ item.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
