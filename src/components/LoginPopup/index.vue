<script setup lang="ts">
const dialogVisible = defineModel<boolean>()

// 获取完用户数据就关闭登录窗口
function closeLoginModal() {
  dialogVisible.value = false
}

const { qrImgUrl, qrStatus } = useLoginQr(closeLoginModal)
</script>
<template>
  <el-dialog v-model="dialogVisible" width="30%">
    <div class="bg-white p-7 rounded-lg shadow-lg text-center">
      <h1 class="text-xl text-black m-5">扫码登录</h1>
      <div
        class="m-auto p-2 bg-white border rounded-lg flex items-center justify-center h-[180px]"
      >
        <img :src="qrImgUrl" alt="二维码登录" />
      </div>
      <div class="flex flex-col gap-1 items-center">
        <el-avatar
          v-if="qrStatus?.avatarUrl"
          class="mt-3"
          :src="qrStatus?.avatarUrl"
          shape="circle"
        />
        <div>{{ qrStatus?.nickname }}</div>
        <div>qrStatus:{{ qrStatus?.message || '加载中...' }}</div>
        <p class="text-gray-400 text-sm mt-5">
          请使用移动端网易云音乐扫描上方二维码登录
        </p>
      </div>
    </div>
  </el-dialog>
</template>
