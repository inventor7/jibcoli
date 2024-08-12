<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/toast/use-toast";
import { type RegisterCredentials } from "@/types/authTypes";
import { useAuthRegister } from "@/modules/anonymous/auth/composables/useAuthRegister";
import { useAuthGetUser } from "@/modules/anonymous/auth/composables/useAuthGetUser";
import { transformValidationErrors } from "@/utils/auth/formErrorHandler";
import { useI18n } from "vue-i18n";

const { execute: register, onError, onSuccess, isLoading } = useAuthRegister();
const {
  execute: getUser,
  onSuccess: onUserSuccess,
  onError: onUserError,
} = useAuthGetUser();

const router = useRouter();
const { t } = useI18n();

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      password_confirmation: z.string().min(8),
    })
    .refine(
      (values) => {
        return values.password === values.password_confirmation;
      },
      {
        message: "Passwords must match!",
        path: ["password_confirmation"],
      }
    )
);

const { isFieldDirty, handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: RegisterCredentials) => {
  await register(values);
});

onSuccess((res) => {
  toast({
    title: t("register.status.success"),
    description: t("register.status.successDescription"),
    variant: "success",
  });
  getUser();
});

onError((error) => {
  if (error.errors) {
    const transformedErrors = transformValidationErrors(error.errors);
    setErrors(transformedErrors);
  } else {
    toast({
      title: t("register.status.error"),
      description: error.message || t("register.status.errorDescription"),
      variant: "destructive",
    });
  }
});

onUserSuccess((res) => {
  console.log(res);
  router.push({ name: "Home" });
});

onUserError((error) => {
  toast({
    title: "User fetch failed",
    description: error.message || "An error occurred while fetching user.",
    variant: "destructive",
  });
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center overflow-y-scroll h-screen w-full"
  >
    <Card class="mx-auto sm:border-none max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          {{ $t("register.register") }}
        </CardTitle>
        <CardDescription>
          {{ $t("register.description") }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="w-full space-y-4" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-4">
            <FormField
              v-slot="{ componentField }"
              name="name"
              :validate-on-blur="!isFieldDirty"
            >
              <FormItem>
                <FormLabel>
                  {{ $t("register.name") }}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    v-bind="componentField"
                    autocomplete="name"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField }"
              name="email"
              :validate-on-blur="!isFieldDirty"
            >
              <FormItem>
                <FormLabel>
                  {{ $t("register.email") }}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ayb@gmail.com"
                    v-bind="componentField"
                    autocomplete="email"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField
            v-slot="{ componentField }"
            name="password"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>
                {{ $t("register.password") }}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  :placeholder="$t('register.placeholder.password')"
                  v-bind="componentField"
                  autocomplete="new-password"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="password_confirmation"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>
                {{ $t("register.confirmPassword") }}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  :placeholder="$t('register.placeholder.confirmPassword')"
                  v-bind="componentField"
                  autocomplete="new-password"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? $t("register.loading") : $t("register.register") }}
          </Button>
          <Button variant="outline" class="w-full">
            {{ $t("register.registerWithGoogle") }}
          </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          {{ $t("register.alreadyHaveAccount") }}
          <router-link class="underline text-primary" :to="{ name: 'Login' }">
            {{ $t("register.login") }}
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
