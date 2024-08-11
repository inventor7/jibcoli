<template>
  <div
    class="flex flex-col justify-center items-center max-w-[1440px] relative sm:fixed w-full top-0 right-1/2 translate-x-1/2 bg-white z-50"
  >
    <nav
      class="flex flex-row justify-between items-center w-full p-2 md:px-8 md:py-0 border-b-[2px] border-gray-200 shadow"
    >
      <h2 class="font-black text-primary-600 text-2xl sm:text-3xl w-1/3">
        JibliColi
      </h2>
      <ul
        class="hidden md:flex flex-row justify-between items-center w-1/3 text-gray-600"
      >
        <li class="nav-item">
          <House />
        </li>
        <li class="nav-item">
          <BookMarked />
        </li>
        <li class="nav-item">
          <Navigation />
        </li>
        <li class="nav-item">
          <MessageCircle />
        </li>
      </ul>

      <div class="flex flex-row justify-end items-center gap-4 sm:gap-8 w-1/3">
        <Translate />
        <AccountInfo />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { House } from "lucide-vue-next";
import { BookMarked } from "lucide-vue-next";
import { Navigation } from "lucide-vue-next";
import { MessageCircle } from "lucide-vue-next";

const isDesktop = useMediaQuery("(min-width: 768px)");
</script>

<style scoped>
.nav-item {
  @apply relative flex flex-col justify-center items-center cursor-pointer hover:text-primary-600  h-16 w-12 rounded-md transition-all duration-150 ease-in-out;
}

.nav-item::after {
  @apply absolute bottom-0 bg-primary-600 transition-all duration-150 ease-in-out h-[3.5px] rounded-3xl w-0  block  content-[''];
}

.nav-item:hover::after {
  @apply w-full;
}
</style>
