<script setup>
const state = reactive({
  list: [],
  levelInfo: {},
});
const { list, levelInfo } = toRefs(state);
import { userAccount, userLevel } from "@/api";

onMounted(() => {
  userAccount().then(({ profile }) => {
    state.list = profile;
  });
  userLevel().then(({ data }) => {
    state.levelInfo = data;
    console.log("=>([id].vue:15) state.level", state.levelInfo);
  });
});
</script>
<template>
  <div class="container">
    <div class="profile-header">
      <img
        :src="list.avatarUrl"
        alt="Profile Picture"
        width="120"
        height="120"
      />
      <div>
        <h1>{{ list.nickname }}</h1>
        <h2>{{ list.description || "暂无描述" }}</h2>
      </div>
    </div>
    <div class="profile-info">
      <h3>user Info</h3>
      <p>level:{{ levelInfo.level }}</p>
    </div>
    <div class="profile-info">
      <h3>About Me</h3>
      <p>该项目用于巩固技术学习，如果喜欢，请在GitHub点一个star。谢谢</p>
    </div>
    <div class="profile-info">
      <h3>Contact Details</h3>
      <p>Email: 793923048@qq.com</p>
      <p>Phone: 13135xxxxx6666</p>
    </div>
    <div class="social-links">
      <a href="https://github.com/XiangZi7/" target="_blank">
        <div class="flex gap-1 items-center">
          <i-logos:github-icon />
          GitHub
        </div>
      </a>
      <a href="https://space.bilibili.com/52419790" target="_blank">
        <div class="flex gap-1 items-center">
          <i-tabler:brand-bilibili />
          bilibili
        </div>
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 700px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.profile-header img {
  border-radius: 50%;
  margin-right: 20px;
}
.profile-header h1 {
  margin: 0;
  color: #333;
}
.profile-header h2 {
  margin: 0;
  font-size: 1rem;
  color: #555;
}
.profile-info {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-left: 4px solid #333;
}
.profile-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}
.profile-info p {
  margin: 0;
  color: #666;
}
.contact-info {
  text-align: center;
}
.contact-info a {
  text-decoration: none;
  color: #333;
}
.social-links {
  margin-top: 20px;
  text-align: center;
}
.social-links a {
  margin: 0 10px;
  display: inline-block;
}
.social-links img {
  width: 24px;
  height: auto;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.social-links img:hover {
  opacity: 1;
}
</style>
