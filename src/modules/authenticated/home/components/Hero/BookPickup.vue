<template>
  <div
    dir="auto"
    class="relative flex flex-col lg:flex-row justify-between items-center w-full h-full gap-12"
  >
    <div
      class="flex flex-col justify-center items-center lg:items-start text-center lg:text-start mt-8 lg:mt-0 gap-8 lg:gap-6 w-full lg:w-1/2 h-full select-none"
    >
      <h1
        class="text-5xl lg:text-[54px] xl:text-[64px] font-black text-primary-800 leading-[1.1]"
      >
        {{ $t("mainHeading1") }} <br />
        {{ $t("mainHeading2") }}
      </h1>
      <p class="sm:text-lg text-base text-gray-600">
        {{ $t("description") }}
      </p>
      <SearchBookingPickup class="z-20 mb-6 lg:mb-8" />
      <div class="flex flex-row justify-center items-center gap-4">
        <div class="relative">
          <Badge class="fill-yellow-600 stroke-yellow-600" :size="80" />
          <p
            class="absolute text-center top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 font-black text-2xl text-white leading-[1.1]"
          >
            O DZ
          </p>
        </div>
        <p class="text-xl font-semibold">
          {{ $t("listingLabel1") }} <br />
          {{ $t("mainHeading2") }}
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-center items-end h-full select-none">
      <!-- stop user  from selecting  -->
      <img
        src="@/assets/images/bg-booking.png"
        class="bg-cover animate-ultra-smmoth-slow-bounce hidden lg:flex lg:h-[400px] xl:h-[450px] bg-hero-img"
        alt="hero"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "lucide-vue-next";
</script>
