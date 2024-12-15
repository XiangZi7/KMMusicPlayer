<script setup lang="ts">
  import { topList, getMVRanking } from '@/api'

  const router = useRouter()
  const artistToplist = ref()
  const MVRankingList = ref()
  const mvType = ['内地', '港台', '欧美', '日本', '韩国']
  onMounted(() => {
    topList().then((res) => {
      artistToplist.value = res
    })
    getMVRanking().then(({ data }) => {
      MVRankingList.value = data
    })
  })

  const handleMVtype = (type: '内地' | '港台' | '欧美' | '日本' | '韩国') => {
    getMVRanking({ area: type }).then(({ data }) => {
      MVRankingList.value = data
    })
  }
</script>
<template>
  <div class="text-white">
    <div class="max-w-[1400px] mx-auto space-y-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="flex-1 space-y-8">
          <section class="pt-20">
            <div class="rounded-lg shadow-sm banner text-white">
              <div class="p-0 flex">
                <div class="p-8 flex-1"
                  ><p class="text-xl mb-2">Billie Eilish</p>
                  <h2 class="text-4xl font-bold mb-6">What Was I Made For?</h2>
                  <el-button
                    type="primary"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-white text-black hover:bg-gray-200"
                  >
                    Listen now
                  </el-button>
                </div>
                <div class="w-[350px] mt-[-70px]"
                  ><img
                    alt="Billie Eilish"
                    loading="lazy"
                    class="object-cover"
                    src="@/assets/phgirl3.png"
                /></div>
              </div>
            </div>
          </section>
          <section>
            <div class="flex justify-between items-center mb-4"
              ><h2 class="text-2xl font-semibold text-black">所有榜单</h2>
              <el-button type="primary">View all </el-button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                class="group relative rounded-lg overflow-hidden cursor-pointer"
                v-for="item in artistToplist?.list"
                :key="item.id"
                @click="router.push(`/playlist?id=${item.id}`)"
                ref="observedElement"
              >
                <el-image
                  lazy
                  :src="item.coverImgUrl + '?param=360y360'"
                  :alt="item.name"
                  class="w-full h-auto rounded-lg object-cover transition-all duration-300 group-hover:opacity-80"
                />
              </div>
            </div>
          </section>
        </div>
        <div class="lg:w-[300px]">
          <section class="rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <h2 class="text-xl font-semibold text-black">MV排行榜</h2>
                <el-dropdown placement="bottom">
                  <el-button circle size="small">
                    <icon-bytesize:chevron-bottom />
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="item in mvType"
                        :key="item"
                        @click="handleMVtype(item)"
                      >
                        {{ item }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div class="relative h-[500px]">
              <el-scrollbar>
                <div class="min-w-full">
                  <div
                    v-for="item in MVRankingList"
                    :key="item.id"
                    class="flex items-center gap-3 p-2 rounded-lg mb-2"
                    @click="router.push(`/video??id=${item.id}`)"
                  >
                    <div class="relative w-16 h-9 flex-shrink-0">
                      <el-image
                        class="rounded cursor-pointer"
                        lazy
                        :src="item.cover + '?param=360y300'"
                      />
                    </div>
                    <div class="flex-1 min-w-0"
                      ><p class="font-medium text-black truncate">
                        {{ item.name }}</p
                      >
                      <p class="text-sm text-gray-400 truncate">
                        {{ item.artistName }}</p
                      >
                    </div>
                    <span class="text-sm text-gray-400"
                      >{{ item.playCount }} 次观看</span
                    >
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .banner {
    background-image: url('@/assets/cubes.png'),
      linear-gradient(to right, #fd31a2, #ff3a8b, #ff4b78, #e1899a, #fddae3);
  }
</style>
