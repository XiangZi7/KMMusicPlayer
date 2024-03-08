<script setup lang="ts">
import { artistList } from "@/api";
import { isEmptyObject } from "@/utils/utils";
const router = useRouter();
const state = reactive({
  artistsList: [],
});
const { artistsList } = toRefs(state);

onMounted(() => {
  artistList({ offset: 1 }).then((res) => {
    state.artistsList = res.artists;
  });
});
</script>
<template>
  <section v-if="!isEmptyObject(artistsList)" class="w-full">
    <div class="container px-4 md:px-6 mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight">Famous Singers</h1>
        <p class="text-gray-500">Discover the stories behind the music.</p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="item in artistsList"
          :key="item.id"
          class="w-full"
          @click="router.push({ path: `/category/${item.id}` })"
        >
          <div
            class="flex gap-4 items-center transform transition duration-300 ease-in-out hover:scale-105"
          >
            <img
              :src="item.img1v1Url + '?param=100y100'"
              alt="Singer Image"
              class="rounded-full w-20 h-20 object-cover transition duration-300 ease-in-out hover:scale-110"
            />
            <div>
              <h3
                class="font-semibold text-gray-800 transition duration-300 ease-in-out hover:text-gray-600"
              >
                {{ item.name }}
              </h3>
              <p
                class="text-sm transition duration-300 ease-in-out hover:text-gray-500"
              >
                {{ item.alias.map((item2) => item2).join("、") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped></style>
