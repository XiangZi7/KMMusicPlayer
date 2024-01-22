<script setup lang="ts">
const dialogVisible = defineModel();
// 获取完用户数据就关闭登录窗口
function closeLoginModal() {
  dialogVisible.value = false;
}
const { qrImgUrl, qrStatus } = useLoginQr(closeLoginModal);
</script>
<template>
  <el-dialog v-model="dialogVisible" width="30%">
    <div class="qr-container">
      <h1>扫码登录</h1>
      <div class="qr-image flex items-center justify-center h-[180px]">
        <!-- 你的二维码图片 URL，你应该动态地从后端获取这个图片的 src 属性 -->
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
        <div>qrStatus:{{ qrStatus?.message || "加载中..." }}</div>
        <p class="instructions">请使用移动端网易云音乐扫描上方二维码登录</p>
      </div>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
.qr-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.qr-container h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.qr-image {
  margin: auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.instructions {
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}
</style>
