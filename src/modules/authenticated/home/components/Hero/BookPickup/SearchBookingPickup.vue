<script setup lang="ts">
import { useForm } from "vee-validate";
import { useMediaQuery } from "@vueuse/core";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { toast } from "@/components/ui/toast";
import SearchFieldFrom from "./SearchBookingPickup/SearchFieldFrom.vue";

const isTablet = useMediaQuery("(min-width: 640px)");

interface Language {
  value: string;
  label: string;
}

const languages: Language[] = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const formSchema = toTypedSchema(
  z.object({
    language: z.string({
      required_error: "Please select a language.",
    }),
  })
);

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  toast({
    title: "Success",
    description: "Your trip has been booked.",
    variant: "success",
  });
});
</script>

<template>
  <form
    class="flex flex-col sm:flex-row justify-start items-center p-2 w-full lg:w-[60vw] max-w-6xl bg-white gap-2 rounded-2xl sm:rounded-full"
    @submit="onSubmit"
  >
    <div class="w-full sm:w-1/3">
      <SearchFieldFrom
        @select="(lang) => setFieldValue('language', lang.value)"
        :languages="languages"
      />
    </div>

    <div
      class="flex flex-row justify-between items-center gap-1 sm:gap-0 w-full sm:w-2/3"
    >
      <SearchFieldFrom
        @select="(lang) => setFieldValue('language', lang.value)"
        :languages="languages"
      />
      <SearchFieldFrom
        @select="(lang) => setFieldValue('language', lang.value)"
        :languages="languages"
      />
    </div>

    <Button
      :size="isTablet ? 'lg' : 'xl'"
      class="rounded-full w-full sm:w-fit text-xl sm:text-lg px-6 sm:mt-0 mt-3"
      type="submit"
    >
      {{ $t("bookTrip") }}
    </Button>
  </form>
</template>
