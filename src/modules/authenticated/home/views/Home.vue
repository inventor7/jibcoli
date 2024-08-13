<template>
  <Hero />
</template>

<script setup lang="ts">
import Hero from "../components/Hero.vue";
import { useMeta } from "vue-meta";

useMeta({
  title: "Home",
  meta: [{ name: "description", content: "JibColi Home Page" }],
});
</script>
