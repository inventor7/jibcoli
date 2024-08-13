<template>
  <nav dir="ltr" class="w-full z-50 fixed bottom-0 bg-white inset-x-0">
    <ul
      class="md:hidden flex flex-row justify-between items-center text-gray-600 px-4 border-t-[1.5px] shadow-2xl"
    >
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.name }"
      >
        <li
          :class="{ 'text-primary-600 active': isActiveRoute(route.name) }"
          class="nav-item"
          @click="setActiveRoute(route.name)"
        >
          <component :is="route.icon" :size="18" :stroke-width="1.5" />
        </li>
      </RouterLink>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { House, BookMarked, Navigation, MessageCircle } from "lucide-vue-next";

const route = useRoute();
const activeRoute = ref(route.name);

const routes = [
  { name: "Home", icon: House },
  { name: "Bookings", icon: BookMarked },
  { name: "Travels", icon: Navigation },
  { name: "Inbox", icon: MessageCircle },
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
  @apply relative flex flex-col justify-center items-center cursor-pointer hover:text-primary-600 h-14 w-10 rounded-md transition-all duration-150 ease-in-out;
}

.nav-item::after {
  @apply absolute bottom-0 bg-primary-600 transition-all duration-150 ease-in-out h-[3.5px] rounded-3xl w-0 block content-[''];
}

.nav-item.active::after {
  @apply w-full;
}
</style>
