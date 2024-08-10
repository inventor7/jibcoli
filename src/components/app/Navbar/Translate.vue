<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer" as-child>
      <Avatar>
        <Languages :size="isDesktop ? 20 : 16" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup class="list-none" v-model="locale">
        <DropdownMenuRadioItem class="cursor-pointer gap-2" value="ar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.34em"
            height="1em"
            viewBox="0 0 640 480"
          >
            <path fill="#fff" d="M320 0h320v480H320z" />
            <path fill="#006233" d="M0 0h320v480H0z" />
            <path
              fill="#d21034"
              d="M424 180a120 120 0 1 0 0 120a96 96 0 1 1 0-120m4 60l-108-35.2l67.2 92V183.2l-67.2 92z"
            />
          </svg>
          Arabic
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem class="cursor-pointer gap-2" value="en">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.34em"
            height="1em"
            viewBox="0 0 640 480"
          >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path
              stroke="#fff"
              stroke-width="37"
              d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
            />
            <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
            <marker id="flagUs4x30" markerHeight="30" markerWidth="30">
              <path fill="#fff" d="m14 0l9 27L0 10h28L5 27z" />
            </marker>
            <path
              fill="none"
              marker-mid="url(#flagUs4x30)"
              d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z"
            />
          </svg>
          English
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem class="cursor-pointer gap-2" value="fr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.34em"
            height="1em"
            viewBox="0 0 640 480"
          >
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#000091" d="M0 0h213.3v480H0z" />
            <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
          </svg>
          French
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useMediaQuery } from "@vueuse/core";
import { Languages } from "lucide-vue-next";

const { locale } = useI18n();

const isDesktop = useMediaQuery("(min-width: 768px)");
const position = ref("bottom");

const selectLang = (lang: string) => {};
</script>
