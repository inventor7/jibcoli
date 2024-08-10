<template>
  <router-view v-slot="{ Component }">
    <div
      class="max-w-[1440px] w-full h-full"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <component :is="Component"></component>
    </div>
    <Toaster />
  </router-view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const locale = useI18n();
</script>

<style>
/* styling the scroll bar */
::-webkit-scrollbar {
  @apply w-2 h-0;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}
</style>
