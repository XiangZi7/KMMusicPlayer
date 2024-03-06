<template>
  <div class="w-full py-6 md:py-12 lg:py-24">
    <div class="container flex flex-col gap-4 px-4 text-center md:px-6">
      <div class="space-y-2">
        <div class="inline-block rounded-full ring-2 ring-white">
          <img
            src="http://p2.music.126.net/ciXQIDgThBtsJO_bV_35Nw==/109951163141677343.jpg"
            width="96"
            height="96"
            alt="Avatar"
            class="rounded-full object-cover"
            style="aspect-ratio:96/96;object-fit:cover"
          />
        </div>
        <div class="space-y-1">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl">XiangZi7</h1>
          <p class="text-gray-500 dark:text-gray-400">Miku Kuriyama is my wife hhh </p>
        </div>
      </div>
      <div class="mx-auto space-y-4 max-w-[700px]">
        <p class="text-gray-500/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400/70">
          小小开源爱好者,如觉得项目能给予你帮助，烦请点个star <span class="text-red-400">❤</span>！
        </p>
      </div>
      <div class="flex items-center justify-center gap-3">
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
      <div class="mx-auto space-y-4 max-w-[700px]">
        <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">Open Source Projects</h2>
        <ul class="grid gap-4 list-none sm:grid-cols-2">
          <li class="grid gap-1">
            <a class="font-medium" href="https://github.com/XiangZi7/KM-Music-Player" rel="ugc">
              KM-Music-Player
            </a>
            <p class="text-sm text-gray-500 dark:text-gray-400">是一款基于 Vue 3.4、Vite 5、Pinia 和 Element-Plus 开发的开源 Web 音乐播放器。</p>
          </li>
          <li class="grid gap-1">
            <a class="font-medium" href="https://github.com/XiangZi7/KM-Music-Player/tree/React-18" rel="ugc">
              React 18 音乐播放器
            </a>
            <p class="text-sm text-gray-500 dark:text-gray-400">基于React18、antd...开发的精美音乐播放器</p>
          </li>
          <li class="grid gap-1">
            <a class="font-medium" href="https://github.com/XiangZi7/KM-Music-Player/tree/uniapp" rel="ugc">
              UniApp 音乐播放器
            </a>
            <p class="text-sm text-gray-500 dark:text-gray-400">基于uniapp、Vue3.2、Vite4、Pinia、图鸟开发音乐播放器。t</p>
          </li>
          <li class="grid gap-1">
            <a class="font-medium" href="https://github.com/XiangZi7/KM-Music-Player/tree/vue2KM-Player" rel="ugc">
              Vue2 音乐播放器
            </a>
            <p class="text-sm text-gray-500 dark:text-gray-400">比较旧的项目了</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

