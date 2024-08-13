<template>
  <div
    class="relative overflow-hidden max-w-[1777px] p-4 sm:p-6 bg-gray-100 f-col-center w-full rounded-none sm:rounded-xl"
  >
    <Tabs
      default-value="sender"
      class="flex flex-col justify-start items-center h-full w-full"
    >
      <TabsList class="p-1 z-10 bg-white gap-1 sm:gap-3 rounded-full">
        <TabsTrigger class="tab-trigger-btn" value="sender">
          <Package :size="isDesktop ? 20 : 18" />
          {{ $t("bookTripButton") }}
        </TabsTrigger>
        <TabsTrigger class="tab-trigger-btn" value="travaller">
          <Truck :size="isDesktop ? 20 : 18" />
          {{ $t("PubsishTripButton") }}
        </TabsTrigger>
      </TabsList>

      <div class="h-full w-full pt-0 lg:pt-4 f-col-center">
        <TabsContent value="sender">
          <Transition name="fade" appear mode="in-out">
            <BookPickup />
          </Transition>
        </TabsContent>

        <TabsContent class="w-full" value="travaller">
          <Transition name="fade" appear mode="out-in">
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
  @apply text-xs  gap-1.5  px-3  data-[state=active]:bg-primary-600 data-[state=active]:text-white rounded-full;
}
</style>
