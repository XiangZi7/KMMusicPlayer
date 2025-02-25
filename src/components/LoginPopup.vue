<script setup lang="ts">
const dialogTableVisible = defineModel<boolean>()

// 获取完用户数据就关闭登录窗口
function closeLoginModal() {
  dialogTableVisible.value = false
}
const { qrImgUrl, qrStatus } = useLoginQr(closeLoginModal)
</script>
<template>
  <el-dialog v-model="dialogTableVisible" width="500">
    <div class="rounded-lg w-80 mx-auto">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3
          class="text-2xl font-semibold leading-none tracking-tight text-center"
        >
          二维码登录
        </h3>
      </div>
      <div class="p-6 pt-0 flex flex-col items-center space-y-4">
        <div class="relative">
          <img :src="qrImgUrl" alt="二维码" class="h-52 w-52" />
          <div
            v-if="qrStatus?.avatarUrl"
            class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
          >
            <span
              class="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20"
              ><img
                v-if="qrStatus?.avatarUrl"
                class="aspect-square h-full w-full"
                :alt="qrStatus?.nickname"
                :src="qrStatus?.avatarUrl"
            /></span>
          </div>
        </div>
        <p class="text-sm text-center text-gray-500">
          {{ qrStatus?.message || '加载中...' }}
        </p>
        <div class="text-center" v-if="qrStatus?.nickname">
          <p class="font-semibold">{{ qrStatus?.nickname }}</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
