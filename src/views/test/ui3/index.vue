<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="min-w-[360px] max-w-[960px]">
      <header
        class="h-16 flex items-center justify-between px-4 border-b-2 border-gray-300"
      >
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <path
              d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
            ></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        </button>
        <div class="h-10 w-32 flex items-center justify-center">栗山未来</div>
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
          </svg>
        </button>
      </header>
      <main class="flex-grow overflow-y-auto">
        <div class="flex flex-col gap-4 p-4">
          <div
            class="w-full h-80 rounded-md overflow-hidden border-2 border-gray-300"
          >
            <img src="@/assets/gthub-avatar.png" class="w-full h-full" />
          </div>
          <div class="flex items-center gap-2">
            <button class="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                ></path>
              </svg>
            </button>
            <button class="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <polyline points="9 17 4 12 9 7"></polyline>
                <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
              </svg>
            </button>
            <button class="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </button>
            <button class="focus:outline-none ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <path
                  d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                ></path>
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500">
            Liked by<strong class="font-medium text-gray-600">user</strong> and
            <strong class="font-medium text-gray-600">others</strong>
          </p>
          <div class="flex items-center gap-2">
            <strong class="font-medium text-gray-600">user</strong>
            <p class="text-sm text-gray-500">Great post!</p>
          </div>
          <p class="text-xs text-gray-400">2 HOURS AGO</p>
        </div>
      </main>
      <footer
        class="h-16 flex items-center justify-around px-4 border-t-2 border-gray-300"
      >
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
        <button class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            ></path>
          </svg>
        </button>
        <div class="relative">
          <div class="h-6 w-6 rounded-full overflow-hidden">
            <img src="@/assets/gthub-avatar.png" class="w-full h-full" alt="" />
          </div>
          <span
            class="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </div>
      </footer>
    </div>
  </div>
</template>
