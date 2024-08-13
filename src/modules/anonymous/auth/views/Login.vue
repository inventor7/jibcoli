<template>
  <div
    dir="auto"
    class="flex flex-col justify-center items-center h-screen overflow-y-scroll w-full"
  >
    <Card class="mx-auto sm:border-none max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">{{ $t("login.login") }}</CardTitle>
        <CardDescription>
          {{ $t("login.description") }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="w-full space-y-6" @submit="onSubmit">
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>{{ $t("login.email") }}</FormLabel>
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

          <FormField
            v-slot="{ componentField }"
            name="password"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>
                <div class="flex items-center">
                  <Label for="password">
                    {{ $t("login.password") }}
                  </Label>
                  <a href="#" class="ml-auto inline-block text-sm underline">
                    {{ $t("login.forgotPassword") }}
                  </a>
                </div>
              </FormLabel>
              <FormControl>
                <div class="w-full flex flex-row relative">
                  <Input
                    type="password"
                    :placeholder="$t('login.placeholder.password')"
                    v-bind="componentField"
                    autocomplete="current-password"
                  />
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? $t("login.loading") : $t("login.login") }}
          </Button>
          <Button variant="outline" class="w-full">
            {{ $t("login.loginWithGoogle") }}
          </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          {{ $t("login.noAccount") }}
          <router-link
            class="underline text-primary"
            :to="{ name: 'Register' }"
          >
            {{ $t("login.register") }}
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/toast/use-toast";
import { type LoginCredentials } from "@/types/authTypes";
import { useAuthLogin } from "@/modules/anonymous/auth/composables/useAuthLogin";
import { transformValidationErrors } from "@/utils/auth/formErrorHandler";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
);

const { isFieldDirty, handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
});

const { execute: login, validationErrors, isLoading } = useAuthLogin();

const onSubmit = handleSubmit(async (values: LoginCredentials) => {
  try {
    await login(values);
    toast({
      //using i18n

      title: t("login.status.success"),
      description: t("login.status.successDescription"),
      variant: "success",
    });
    router.push({ name: "Home" });
  } catch (error) {
    if (validationErrors.value) {
      const transformedErrors = transformValidationErrors(
        validationErrors.value
      );
      setErrors(transformedErrors);
    } else {
      toast({
        title: t("login.status.error"),
        description: t("login.status.errorDescription"),
        variant: "destructive",
      });
    }
  } finally {
  }
});
</script>
