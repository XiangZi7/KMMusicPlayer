import { createRouter, createWebHashHistory } from "vue-router/auto";

// 创建 router 实例
const router = createRouter({
  history: createWebHashHistory(),
});
/**
 *  目录结构即路由。
 *
 *  eg:
 *
 *  src/pages/index.vue => /
 *  src/pages/about.vue => /about
 *  src/pages/users/index.vue => /users
 *  src/pages/users/profile.vue => /users/profile
 *  src/pages/users/[id].vue => /users/:id
 *  src/pages/[user]/settings.vue => /:user/settings
 *  src/pages/[...notFound].vue => 404 路由
 */
export default router;
