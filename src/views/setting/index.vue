<script setup lang="ts">
const SettingStore = useSettingStore()
</script>
<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <header
      class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
    >
      <h1 class="text-2xl font-bold">Settings</h1>
    </header>
    <div class="flex flex-col sm:gap-4 sm:py-4">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="flex items-start gap-6 w-full">
          <div class="grid gap-6">
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div class="flex flex-col space-y-1.5 p-6">
                <h3
                  class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
                >
                  播放器抽屉设置
                </h3>
                <p class="text-sm text-muted-foreground">播放器抽屉功能设置</p>
              </div>
              <div class="p-6">
                <div class="grid gap-4">
                  <div class="flex items-center space-x-2">
                    <el-switch
                      v-model="SettingStore.isDrawerCover"
                      @change="SettingStore.setDrawerCover"
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="keyboard-shortcuts"
                    >
                      抽屉封面背景
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <el-switch
                      v-model="SettingStore.isOriginalParsed"
                      @change="SettingStore.setOriginalParsed"
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="keyboard-shortcuts"
                    >
                      歌词
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <el-switch
                      v-model="SettingStore.isTranslatedParsed"
                      @change="SettingStore.setTranslatedParsed"
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="keyboard-shortcuts"
                    >
                      翻译
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <el-switch
                      v-model="SettingStore.isRomaParsed"
                      @change="SettingStore.setRomaParsed"
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="keyboard-shortcuts"
                    >
                      罗马音
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
