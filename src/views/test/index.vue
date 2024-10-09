<script setup lang="ts">
type Role = 'admin' | 'user' | 'guest'
type Action = 'create' | 'edit' | 'delete' | 'view'

// 使用 ref 来创建响应式的数据
const currentUserRole = ref<Role>('admin') // 当前用户角色类型

// 权限配置
const roles = {
  ADMIN: 'admin' as Role,
  USER: 'user' as Role,
  GUEST: 'guest' as Role,
}

// 定义角色对应的权限
const rolePermissions = {
  [roles.ADMIN]: ['create', 'edit', 'delete', 'view'],
  [roles.USER]: ['edit', 'view'],
  [roles.GUEST]: ['view'],
}

// 检查权限
function hasPermission(action: Action): boolean {
  return rolePermissions[currentUserRole.value]?.includes(action) ?? false
}

// 切换角色
const SwitchingRole = (role: Role) => {
  currentUserRole.value = role
}
</script>

<template>
  <div>
    <el-button type="primary" v-if="hasPermission('create')">创建</el-button>
    <el-button type="primary" v-if="hasPermission('edit')">编辑</el-button>
    <el-button type="primary" v-if="hasPermission('delete')">删除</el-button>
    <el-button type="primary" v-if="hasPermission('view')">查看</el-button>
    <el-button type="primary" @click="SwitchingRole('user')"
      >切换用户</el-button
    >
    <el-button type="primary" @click="SwitchingRole('admin')"
      >切换管理员</el-button
    >

    <el-carousel height="200px" motion-blur>
      <el-carousel-item v-for="item in 3" :key="item">
        <div class="grid grid-cols-3 h-full">
          <div class="bg-red-400">1</div>
          <div class="bg-blue-300">2</div>
          <div class="bg-slate-500">3</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
/* 样式 */
</style>
