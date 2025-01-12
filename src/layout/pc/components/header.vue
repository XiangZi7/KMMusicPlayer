<template>
  <header>
    <div
      class="flex justify-between items-center h-16 bg-gray-100 dark:bg-black"
    >
      <div class="flex items-center">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4"
          >About</router-link
        >
      </div>
      <div class="flex items-center">
        <router-link
          to="/login"
          class="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4"
          >Register</router-link
        >
      </div>
    </div>
  </header>
</template>
