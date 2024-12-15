<script setup lang="ts">
  import Recommend from './components/recommend.vue'
  import Singer from './components/singer.vue'
  import Rankings from './components/Rankings.vue'

  const activeName = ref('third')
</script>
<template>
  <div class="p-6 h-full w-full">
    <el-tabs v-model="activeName">
      <el-tab-pane label="推荐" name="first">
        <Recommend v-if="activeName === 'first'"  />
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="second">
        <Rankings v-if="activeName === 'second'"  />
      </el-tab-pane>
      <el-tab-pane label="歌手" name="third">
        <Singer v-if="activeName === 'third'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
