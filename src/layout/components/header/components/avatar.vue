<script setup lang="ts">
const showLogin = ref(false)
const user = UserStore()
</script>
<template>
  <el-dropdown v-if="user.userInfo && user.userInfo.userId">
    <el-avatar
      :src="user.userInfo.avatarUrl"
      class="mr-2"
      shape="circle"
      :size="32"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item>Action 1</el-dropdown-item> -->
        <el-dropdown-item>
          <el-popconfirm title="确定要退出登录?" @confirm="user.userLogout">
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
  <LoginPopup v-if="showLogin" v-model="showLogin" />
</template>
