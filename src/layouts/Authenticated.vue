<template>
  <Navbar />

  <div
    class="flex flex-col justify-start items-center pt-0 sm:pt-[75px] px-0 sm:px-4"
  >
    <router-view></router-view>
  </div>
  <NavbarBottom />
</template>

<script lang="ts" setup></script>
