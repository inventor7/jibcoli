<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer" as-child>
      <Avatar>
        <User :size="isDesktop ? 20 : 16" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenu class="list-none" v-model="locale">
        <DropdownMenuItem
          @click="goToProfile()"
          class="cursor-pointer gap-6"
          value="profile"
        >
          <User :size="isDesktop ? 20 : 16" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem class="cursor-pointer gap-6" value="settings">
          <Settings :size="isDesktop ? 20 : 16" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer gap-6" value="logout">
          <LogOut :size="isDesktop ? 20 : 16" />
          Logout
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useMediaQuery } from "@vueuse/core";
import { User } from "lucide-vue-next";
import { Settings } from "lucide-vue-next";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();

const isDesktop = useMediaQuery("(min-width: 768px)");
const position = ref("bottom");

const goToProfile = () => {
  router.push("/auth/login");
};
</script>
