<template>
  <nav dir="ltr" class="w-full z-50 fixed bottom-0 bg-white inset-x-0">
    <ul
      class="md:hidden flex flex-row justify-between items-center text-gray-600 px-6 border-t-[1.5px] shadow-2xl"
    >
      <li class="nav-item">
        <House :size="24" :stroke-width="1.8" />
      </li>
      <li class="nav-item">
        <BookMarked :size="24" :stroke-width="1.8" />
      </li>
      <li class="nav-item">
        <Navigation :size="24" :stroke-width="1.8" />
      </li>
      <li class="nav-item">
        <MessageCircle :size="24" :stroke-width="1.8" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { House } from "lucide-vue-next";
import { BookMarked } from "lucide-vue-next";
import { Navigation } from "lucide-vue-next";
import { MessageCircle } from "lucide-vue-next";

import { RouterView } from "vue-router";
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
