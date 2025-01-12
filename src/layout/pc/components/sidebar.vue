<template>
  <div
    class="w-52 rounded-lg py-4 flex flex-col gap-2.5 text-sm border-r border-border"
  >
    <ul class="list-none flex flex-col gap-2 px-2.5">
      <li
        class="flex items-center text-gray-400 gap-2.5 transition-all duration-300 ease-out p-1.5 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-white hover:translate-x-0.5 hover:-translate-y-0.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pencil"
        >
          <path
            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          ></path>
          <path d="m15 5 4 4"></path>
        </svg>
        <p class="font-semibold">Rename</p>
      </li>
      <li
        class="flex items-center text-gray-400 gap-2.5 transition-all duration-300 ease-out p-1.5 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-white hover:translate-x-0.5 hover:-translate-y-0.5"
      >
        <svg
          class="lucide lucide-user-round-plus"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 21a8 8 0 0 1 13.292-6"></path>
          <circle r="5" cy="8" cx="10"></circle>
          <path d="M19 16v6"></path>
          <path d="M22 19h-6"></path>
        </svg>
        <p class="font-semibold">Add Member</p>
      </li>
    </ul>
    <div class="border-t-2 border-gray-600"></div>
    <ul class="list-none flex flex-col gap-2 px-2.5">
      <li
        class="flex items-center text-gray-400 gap-2.5 transition-all duration-300 ease-out p-1.5 rounded-md cursor-pointer hover:bg-[#5353ff] hover:text-white hover:translate-x-0.5 hover:-translate-y-0.5"
      >
        <svg
          class="lucide lucide-settings"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          ></path>
          <circle r="3" cy="12" cx="12"></circle>
        </svg>
        <p class="font-semibold">Settings</p>
      </li>
      <li
        class="flex items-center text-gray-400 gap-2.5 transition-all duration-300 ease-out p-1.5 rounded-md cursor-pointer hover:bg-red-700 hover:text-white"
      >
        <svg
          class="lucide lucide-trash-2"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line y2="17" y1="11" x2="10" x1="10"></line>
          <line y2="17" y1="11" x2="14" x1="14"></line>
        </svg>
        <p class="font-semibold">Delete</p>
      </li>
    </ul>
    <div class="border-t-2 border-gray-600"></div>
    <ul class="list-none flex flex-col gap-2 px-2.5">
      <li
        class="flex items-center text-purple-400 gap-2.5 transition-all duration-300 ease-out p-1.5 rounded-md cursor-pointer hover:bg-purple-800"
      >
        <svg
          class="lucide lucide-users-round"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle r="5" cy="8" cx="10"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </svg>
        <p class="font-semibold">Team Access</p>
      </li>
    </ul>
  </div>
</template>
