<script setup lang="ts">
import { Avatar } from "@element-plus/icons";
import { logout } from "@/api";

const router = useRouter();
const state = reactive({
  kw: "",
  showLogin: false,
});
const { kw, showLogin } = toRefs(state);
const userStore = useUserStore();

function isEmpty(obj: object) {
  return Object.keys(obj).length > 0;
}

function toSearch() {
  router.push({ path: "/search", query: { kw: state.kw } });
}

function userLogout() {
  logout().then(() => {
    userStore.setUserInfo({});
  });
}

// onMounted(() => {
//   plCount().then((res) => {
//     console.log(res);
//   });
// });
function toRouter(path) {
  router.push({ path });
}
</script>
<template>
  <header class="header w-full flex items-center">
    <div class="menu-circle" />
    <div class="w-[40px] flex">
      <i-material-symbols:arrow-back-ios
        class="cursor-pointer"
        @click="router.back()"
      />
      <i-material-symbols:arrow-back-ios
        class="cursor-pointer trfo"
        @click="router.forward()"
      />
    </div>
    <div class="search-bar">
      <input
        v-model="kw"
        type="text"
        placeholder="Search"
        @keyup.enter="toSearch"
      />
    </div>
    <div>
      <!--  关于我  -->
      <div class="about ml-3 flex">
        <el-button
          href="https://github.com/XiangZi7/KM-Music-Player/"
          target="_blank"
          tag="a"
          class="yx-tag"
        >
          <div class="flex gap-2 items-center">
            <i-bi:github />
            Profile
          </div>
        </el-button>
        <el-button
          href="https://github.com/XiangZi7/"
          target="_blank"
          tag="a"
          class="yx-tag"
        >
          <div class="flex gap-2 items-center">
            <i-bi:github />
            GitHub
          </div>
        </el-button>
      </div>
    </div>
    <!--  登录  -->
    <div
      class="flex justify-end ml-auto items-center gap-2 text-[var(--prism-color)]"
    >
      <div v-if="isEmpty(userStore.userInfo)" class="flex items-center gap-3">
        <el-dropdown>
          <img class="profile-img" :src="userStore.userInfo.avatarUrl" alt="" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="toRouter(`/user/${userStore.userInfo.userId}`)"
              >
                <div class="flex gap-1 items-center">
                  <i-mdi:account-circle-outline />
                  个人信息
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="flex gap-3" @click="userLogout">
                <div class="flex gap-1 items-center">
                  <i-material-symbols-light:logout />
                  退出
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="text-[14px] text-[var(--prism-color)]">
          {{ userStore.userInfo.nickname }}
        </div>
        <el-dropdown>
          <i-material-symbols:notifications-active-outline
            class="text-[16px] text-[var(--prism-color)]"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userLogout">
                <i-material-symbols-light:logout />
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <i-solar:settings-minimalistic-outline />
      </div>
      <div v-else @click="showLogin = true">
        <el-button class="yx-tag" :icon="Avatar" round>登录</el-button>
      </div>
    </div>
    <user-login v-if="showLogin" v-model="showLogin" />
  </header>
</template>
<style lang="scss" scoped>
@use "header.scss";
</style>
