<script setup lang="ts">
  import { searchDefault } from '@/api'

  const userStore = useUserStore()
  const router = useRouter()
  const keyWord = ref('')

  // 默认搜索关键词
  const searchKW = ref()

  const showLogin = ref(false)
  const toSearch = () => {
    if (!keyWord.value) {
      keyWord.value = searchKW.value.showKeyword
    }
    router.push(`/search?kw=${keyWord.value}`)
  }

  onMounted(async () => {
    searchDefault().then((res) => {
      searchKW.value = res.data
    })

    await userStore.checkLoginStatus() // 检查登录状态
  })
</script>
<template>
  <header
    class="flex justify-between p-2 items-center border-b dark:border-gray-600"
  >
    <div class="flex items-center">
      <div class="flex btncontainer mr-4 w-64">
        <div class="btn btn1" />
        <div class="btn btn2" />
        <div class="btn btn3" />
      </div>
      <div class="flex items-center gap-2">
        <el-button text circle @click="router.back()">
          <icon-material-symbols:arrow-back-ios />
        </el-button>
        <el-button text circle @click="router.forward()">
          <icon-material-symbols:arrow-forward-ios />
        </el-button>
        <div class="flex items-center">
          <el-input
            v-model="keyWord"
            :placeholder="searchKW?.showKeyword"
            style="--el-input-border-radius: 30px; width: 300px"
            @keyup.enter="toSearch"
            class="dark:text-white"
          >
            <template #prefix>
              <icon-ion:search class="text-gray-700 dark:text-gray-300" />
            </template>
          </el-input>
        </div>
        <!-- 关于我 -->
        <div class="about-me flex gap-2 app-region-no-drag">
          <a href="https://github.com/XiangZi7/KM-Music-Player" target="_blank">
            <div
              class="flex items-center bg-black text-white gap-1 text-xs p-1 rounded-lg"
            >
              <img
                alt="GitHub Repo stars"
                src="https://img.shields.io/github/stars/XiangZi7/KM-Music-Player?style=flat&logo=github&label=Kuriyama%20Mirai%20Player&labelColor=%23000&color=%23000"
              />
            </div>
          </a>
          <a href="https://github.com/XiangZi7" target="_blank">
            <div
              class="flex items-center bg-black text-white gap-1 text-xs p-1 rounded-lg"
            >
              <img
                alt="GitHub User's stars"
                src="https://img.shields.io/github/stars/XiangZi7?style=flat&logo=github&label=XiangZi&labelColor=%23000&color=%23000"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <el-dropdown v-if="userStore.userInfo && userStore.userInfo.userId">
        <el-avatar
          :src="userStore.userInfo.avatarUrl"
          class="mr-2"
          shape="circle"
          :size="32"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item divided>
              <el-popconfirm
                title="确定要退出登录?"
                @confirm="userStore.userLogout"
              >
                <template #reference>退出</template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="mr-3" v-else type="primary" @click="showLogin = true">
        <div class="flex items-center gap-1">
          <icon-ic:baseline-person-pin />
          登录
        </div>
      </el-button>
    </div>
    <LoginPopup v-if="showLogin" v-model="showLogin" />
  </header>
</template>

<style scoped>
  .app-region {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
  }

  .search,
  .avatar,
  .btn-back,
  .btncontainer {
    -webkit-app-region: no-drag;
    /* 使得子元素可点击 */
  }

  .btn {
    height: 15px;
    width: 15px;
    margin: 5px;
    border-radius: 50%;
    cursor: pointer;
    /* 其他样式保持不变 */
  }

  .btn1 {
    background: #fac536;
    position: relative;
    overflow: hidden;
  }

  .btn1::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 10%;
    opacity: 0;
    background: #222;
    transition: 300ms;
  }

  .btn1:hover::before {
    opacity: 1;
    top: 50%;
  }

  .btn2 {
    background: #39ea49;
    position: relative;
    overflow: hidden;
  }

  .btn2::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45%;
    height: 45%;
    opacity: 0;
    background: #222;
    transition: 300ms;
  }

  .btn2::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 15%;
    height: 80%;
    opacity: 0;
    background: #39ea49;
    transition: 300ms;
  }

  .btn2:hover::before,
  .btn2:hover::after {
    opacity: 1;
    top: 50%;
  }

  .btn3 {
    background: #f25056;
    position: relative;
    overflow: hidden;
  }

  .btn3::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 15%;
    height: 50%;
    opacity: 0;
    background: #222;
    transition: 300ms;
  }

  .btn3::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 15%;
    opacity: 0;
    height: 50%;
    background: #222;
    transition: 300ms;
  }

  .btn3:hover::before,
  .btn3:hover::after {
    opacity: 1;
    top: 50%;
  }
</style>
