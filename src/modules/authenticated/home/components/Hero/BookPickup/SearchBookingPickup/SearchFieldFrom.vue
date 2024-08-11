<template>
  <FormField v-slot="{ field }" name="language">
    <FormItem class="flex flex-col w-full">
      <Popover v-if="isTablet" v-model:open="isOpen">
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="ghost"
              :size="isTablet ? 'lg' : 'sm'"
              role="combobox"
              class="rounded-full text-base sm:text-lg"
              :class="[
                ' justify-between',
                !field.value && 'text-muted-foreground',
              ]"
            >
              {{ selectedLanguage ? selectedLanguage.label : $t("fromLabel") }}
              <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="p-0">
          <Command class="h-[50vh]">
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>Nothing found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="language in languages"
                  :key="language.value"
                  :value="language.label"
                  @select="onLanguageSelect(language)"
                >
                  {{ language.label }}
                  <Check
                    :class="[
                      'ml-auto h-4 w-4',
                      language.value === selectedLanguage?.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    ]"
                  />
                </CommandItem> </CommandGroup
            ></CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Drawer v-else v-model:open="isOpen">
        <DrawerTrigger as-child>
          <Button
            variant="ghost"
            :size="isTablet ? 'lg' : 'lg'"
            class="rounded-full justify-between bg-gray-100 w-full sm:w-fit text-base sm:text-lg px-6"
          >
            {{
              selectedLanguage?.value ? selectedLanguage.label : $t("fromLabel")
            }}
            <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent class="min-h-[50vh] max-h-[70vh]">
          <DrawerHeader class="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>{{ $t("nothingFound") }}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="language in languages"
                  :key="language.value"
                  :value="language.label"
                  @select="onLanguageSelect(language)"
                  class="text-base"
                >
                  {{ language.label }}
                  <Check
                    :class="[
                      'ml-auto h-4 w-4',
                      language.value === selectedLanguage?.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    ]"
                  />
                </CommandItem> </CommandGroup
            ></CommandList>
          </Command>
        </DrawerContent>
      </Drawer>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { Check, ChevronDown } from "lucide-vue-next";

import { FormField } from "@/components/ui/form";
import { DrawerTrigger } from "@/components/ui/drawer";

interface Language {
  value: string;
  label: string;
}

const props = defineProps<{
  languages: Language[];
}>();

const emit = defineEmits(["select", "error"]);

const isDesktop = useMediaQuery("(min-width: 768px)");
const isTablet = useMediaQuery("(min-width: 640px)");
const isOpen = ref(false);
const selectedLanguage = ref<Language | null>(null);

function onLanguageSelect(lang: Language) {
  emit("select", lang);
  selectedLanguage.value = lang;
  isOpen.value = false;
}
</script>
