<template>
  <div
    class="hero-container p-4 bg-gray-100 f-col-center w-full rounded-none sm:rounded-xl"
  >
    <Tabs
      default-value="sender"
      class="flex flex-col justify-start items-center h-full w-full"
    >
      <TabsList class="p-1 bg-white gap-1 rounded-full">
        <TabsTrigger class="tab-trigger-btn" value="sender">
          <Package :size="isDesktop ? 20 : 18" />
          {{ $t("bookTripButton") }}
        </TabsTrigger>
        <TabsTrigger class="tab-trigger-btn" value="travaller">
          <Truck :size="isDesktop ? 20 : 18" />
          {{ $t("PubsishTripButton") }}
        </TabsTrigger>
      </TabsList>

      <div class="h-full pt-0 lg:pt-4 f-col-center">
        <TabsContent value="sender">
          <Transition name="list1" appear mode="out-in">
            <BookPickup />
          </Transition>
        </TabsContent>

        <TabsContent value="travaller">
          <Transition name="list2" appear mode="out-in">
            <PublishTrip />
          </Transition>
        </TabsContent>
      </div>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { Package } from "lucide-vue-next";
import { Truck } from "lucide-vue-next";
const isDesktop = useMediaQuery("(min-width: 768px)");
</script>
<style scoped lang="scss">
.tab-trigger-btn {
  @apply text-xs sm:text-base gap-1.5 sm:gap-3 px-3 sm:px-6 data-[state=active]:bg-primary-600 data-[state=active]:text-white rounded-full;
}

.list1-move,
.list1-enter-active,
.list1-leave-active {
  transition: all 0.5s ease-in-out;
}

.list1-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.list1-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.list1-leave-active {
  position: absolute;
}

.list2-move,
.list2-enter-active,
.list2-leave-active {
  transition: all 0.5s ease-in-out;
}

.list2-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.list2-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.list2-leave-active {
  position: absolute;
}
</style>
