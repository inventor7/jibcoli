<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer" as-child>
      <Avatar>
        <User :size="isDesktop ? 20 : 16" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[50vw] sm:w-56 ml-4">
      <DropdownMenu>
        <DropdownMenuItem
          @click="goToProfile()"
          class="cursor-pointer py-2 sm:py-4 gap-6"
          value="profile"
        >
          <User :size="isDesktop ? 20 : 16" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          class="cursor-pointer py-2 sm:py-4 gap-6"
          value="settings"
        >
          <Settings :size="isDesktop ? 20 : 16" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          class="cursor-pointer py-2 sm:py-4 gap-6"
          value="logout"
        >
          <LogOut :size="isDesktop ? 20 : 16" />
          Logout
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { User } from "lucide-vue-next";
import { Settings } from "lucide-vue-next";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const isDesktop = useMediaQuery("(min-width: 768px)");
const position = ref("bottom");

const goToProfile = () => {
  router.push("/auth/login");
};
</script>
