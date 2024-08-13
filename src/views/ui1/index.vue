<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex justify-center items-center flex-grow">
      <div
        class="w-[400px] h-[300px] bg-white dark:bg-zinc-900 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
      >
        <div class="flex flex-col h-full">
          <div
            class="h-12 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-between px-2"
          >
            <div class="flex gap-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span class="text-zinc-900 dark:text-zinc-100 font-medium"
              >Google Chrome</span
            >
            <button class="bg-blue-500 text-white rounded px-2 py-1">
              Login
            </button>
          </div>
          <div class="flex-1 overflow-auto p-4">
            <div class="flex flex-col gap-4">
              <div class="h-12 bg-zinc-100 dark:bg-zinc-800"></div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
                <div class="h-40 bg-zinc-100 dark:bg-zinc-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
