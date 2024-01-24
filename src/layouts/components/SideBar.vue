<script setup lang="ts">
import { SideBarData } from "./SideBarData";
import { userPlaylist } from "@/api";
import { ISideBar } from "@/layouts/interface";

const router = useRouter();

const userStore = useUserStore();

// eslint-disable-next-line no-undef
const state = reactive<ISideBar>({
  playlist: [],
});

const { playlist } = toRefs(state);
watch(
  () => userStore.userInfo,
  () => {
    if (Object.keys(userStore.userInfo).length > 0) {
      userPlaylist({ id: userStore.userInfo.userId }).then(({ playlist }) => {
        state.playlist = playlist;
      });
    }
  },
  {
    immediate: true,
  },
);

function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}
</script>
<template>
  <aside class="left-side">
    <el-scrollbar>
      <div class="left-side-p">
        <div class="side-wrapper">
          <div class="side-title flex" style="justify-content: center">
            <img src="@/assets/logo2.png" alt="" style="width: 150px" />
          </div>
        </div>
        <div v-for="item1 in SideBarData" :key="item1.title" class="side-box">
          <div class="side-title mt-2 mb-2">{{ item1.title }}</div>
          <div class="side-menu">
            <div
              v-for="item2 in item1.child"
              :key="item2.title"
              class="side-item"
              @click="router.push({ path: item2.router })"
            >
              <component :is="item2.icon" />
              {{ item2.title }}
            </div>
          </div>
        </div>
        <!--用户歌单-->
        <div v-if="!isEmpty(userStore.userInfo)" class="side-box">
          <div class="side-title mt-2 mb-2">用户歌单</div>
          <div
            v-for="item in playlist"
            :key="item.id"
            class="side-item"
            @click="
              router.push({ path: `/songList/songListDetails/${item.id}` })
            "
          >
            <img
              :src="item.coverImgUrl + '?param=50y50'"
              class="rounded"
              :alt="item.name"
              width="25"
              height="25"
            />
            {{ item.name }}
          </div>
        </div>
      </div>
    </el-scrollbar>
  </aside>
</template>
<style lang="scss" scoped>
@use "SideBar";
</style>
