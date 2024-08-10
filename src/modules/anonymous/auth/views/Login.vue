<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
              <FormLabel>Email</FormLabel>
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
                  <Label for="password">Password</Label>
                  <a href="#" class="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </a>
                </div>
              </FormLabel>
              <FormControl>
                <div class="w-full flex flex-row relative">
                  <Input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter your password"
                    v-bind="componentField"
                    autocomplete="current-password"
                  />
                  <Button
                    @click.prevent="togglePasswordVisibility"
                    size="icon"
                    variant="ghost"
                    type="button"
                  >
                    <i-app-eye v-if="showPassword" />
                    <i-app-eye-off v-else />
                  </Button>
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </Button>
          <Button variant="outline" class="w-full"> Login with Google </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <router-link
            class="underline text-primary"
            :to="{ name: 'Register' }"
          >
            Register
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

const router = useRouter();

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
      title: "Login successful",
      description: "You have been logged in successfully.",
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
        title: "Login failed",
        description: "An error occurred while logging in.",
        variant: "destructive",
      });
    }
  } finally {
  }
});

const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
