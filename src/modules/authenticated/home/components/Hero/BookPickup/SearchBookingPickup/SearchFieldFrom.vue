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
              class="rounded-full hover:bg-transparent text-base sm:text-lg"
              :class="[
                ' justify-between',
                !field.value && 'text-muted-foreground',
              ]"
            >
              <span class=" flex flex-row justify-center text-2xl items-center gap-2 " v-if="selectedCategory?.name" >
            <component :size="28" :stroke-width="1.5" :is="selectedCategory.icon" />
            {{ $t(selectedCategory.name) }}
           </span>
           <span v-else >
            {{ $t("fromLabel") }}
           </span>
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="p-0">
          <Command class="max-h-[50vh]">
            <CommandInput :aria-hidden="false" placeholder="Search language..." />
            <CommandEmpty>Nothing found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="cat in categories"
                  :key="cat.name"
                  :value="cat.name"
                  @select="onCategorySelect(cat)"
                >
                  {{ cat.name }}
                  <Check
                    :class="[
                      'ml-auto h-4 w-4',
                      cat.name === selectedCategory?.name
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
            size="xl"
            class="rounded-full justify-between bg-gray-100 w-full sm:w-fit text-base sm:text-lg px-6"
          >
           <span class=" flex flex-row items-center gap-2 " v-if="selectedCategory?.name" >
            <component :size="20" :stroke-width="1.5" :is="selectedCategory.icon" />
            {{ $t(selectedCategory.name) }}
           </span>
           <span v-else >
            {{ $t("fromLabel") }}
           </span>
            <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent class="h-[90vh]">
          <DrawerHeader class="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div class=" grid grid-cols-2 grid-rows-4 h-full gap-2 pt-4 p-2 ">
            <!-- the categories -->
             <div 
              :class ="{ ' text-white  bg-primary-600': cat.name === selectedCategory?.name }"
             @click="onCategorySelect(cat)" class=" flex flex-col justify-around items-center w-full h-full p-3 border-[2px] rounded-lg  " v-for="cat in categories" >
              <component
              :size="40" :stroke-width="1.5" :is="cat.icon" />
               <span class=" select-none text-sm text-center w-full font-bold " >{{ $t(cat.name) }}
                </span>
             
             </div>
          </div>
        </DrawerContent>
      </Drawer>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMediaQuery } from "@vueuse/core";
import { ChevronDown , Check } from "lucide-vue-next";

import { FormField } from "@/components/ui/form";
import { DrawerTrigger } from "@/components/ui/drawer";


const isTablet = useMediaQuery("(min-width: 640px)");
const isOpen = ref(false);
const { t } = useI18n();



defineProps<{
  categories: Category[];
}>();

const emit = defineEmits(["select", "error"]);


function onCategorySelect(cat: Category) {
  emit("select", cat);
  selectedCategory.value = cat;
  isOpen.value = false;
}

interface Category {
  name: string;
  icon: any;
}

const selectedCategory = ref<Category | null>(null);



</script>
