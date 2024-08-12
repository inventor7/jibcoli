<script setup lang="ts">
import { useForm } from "vee-validate";
import { useMediaQuery } from "@vueuse/core";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Shirt , Heart , Smartphone , Armchair , Book  , Paintbrush , Coffee , Package } from "lucide-vue-next";
import { toast } from "@/components/ui/toast";
import SearchFieldFrom from "./SearchBookingPickup/SearchFieldFrom.vue";

const isTablet = useMediaQuery("(min-width: 640px)");

interface Category {
  name: string;
  icon: any;
}

const categories: Category[] = [
  {
    name: "electronics",
    icon: Smartphone,
  },
  {
    name: "medecines",
    icon: Heart,
  },
  {
    name: "clothing",
    icon: Shirt,
  },
  {
    name: "furniture",
    icon: Armchair,
  },
  {
    name: "books",
    icon: Book,
  },
  {
    name: "cosmetics",
    icon: Paintbrush,
  },
  {
    name: "food",
    icon: Coffee,
  },
  {
    name: "others",
    icon: Package,
  }
];

const formSchema = toTypedSchema(
  z.object({
    category : z.string({
      required_error: "Please select a category.",
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
    <div class="w-full">
      <SearchFieldFrom
        @select="(category) => setFieldValue('category', category.name)"
        :categories="categories"
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
