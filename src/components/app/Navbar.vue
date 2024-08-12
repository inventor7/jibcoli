<template>
  <div
    class="flex flex-col justify-center items-center max-w-[1777px] relative sm:fixed w-full top-0 right-1/2 translate-x-1/2 bg-white z-50">
    <nav
      class="flex flex-row justify-between items-center w-full p-2 md:px-8 md:py-0 border-b-[2px] border-gray-200 shadow 2xl:border-none xl:shadow-none">
      <h2 class="font-black text-primary-600 text-2xl sm:text-3xl w-1/3">
        JibliColi
      </h2>
      <ul class="hidden md:flex flex-row justify-between items-center w-1/3 text-gray-600">
        <RouterLink v-for="route in routes" :key="route.name" :to="{ name: route.name }">
          <li 
            :class="{ 'active': isActiveRoute(route.name) }"
            class="nav-item"
            @click="setActiveRoute(route.name)"
          >
            <component :is="route.icon" />
          </li>
        </RouterLink>
      </ul>
      <div class="flex flex-row justify-end items-center gap-4 sm:gap-8 w-1/3">
        <Translate />
        <AccountInfo />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from "@vueuse/core";
import { House, BookMarked, Navigation, MessageCircle } from "lucide-vue-next";

const route = useRoute();
const activeRoute = ref(route.name);
const isDesktop = useMediaQuery("(min-width: 768px)");

const routes = [
  { name: 'Home', icon: House },
  { name: 'Bookings', icon: BookMarked },
  { name: 'Travels', icon: Navigation },
  { name: 'Inbox', icon: MessageCircle },
];

const isActiveRoute = (routeName: string) => {
  return activeRoute.value === routeName;
};

const setActiveRoute = (routeName: string) => {
  activeRoute.value = routeName;
};
</script>

<style scoped>
.nav-item {
  @apply relative flex flex-row justify-center items-center cursor-pointer text-gray-600 h-16 w-12 rounded-md transition-all duration-150 ease-in-out;
}

.nav-item::after {
  @apply absolute bottom-0 transition-all duration-150 ease-in-out h-[3.5px] rounded-3xl w-0 block content-[''];
}

.nav-item:hover {
  @apply text-gray-400;
}



.nav-item.active {
  @apply text-primary-600;
}

.nav-item.active::after {
  @apply w-full bg-primary-600;
}
</style>