<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormField } from "@/components/ui/form";
import { toast } from "@/components/ui/toast/use-toast";
import { type RegisterCredentials } from "@/types/authTypes";
import { useAuthRegister } from "@/modules/anonymous/auth/composables/useAuthRegister";
import { useAuthGetUser } from "@/modules/anonymous/auth/composables/useAuthGetUser";
import { Button } from "@/components/ui/button";
import { transformValidationErrors } from "@/utils/auth/formErrorHandler";

const { execute: register, onError, onSuccess, isLoading } = useAuthRegister();
const {
  execute: getUser,
  onSuccess: onUserSuccess,
  onError: onUserError,
} = useAuthGetUser();

const router = useRouter();

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
    title: "Registration successful",
    description: "You have been registered successfully.",
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
      title: "Registration failed",
      description: error.message || "An error occurred while registering.",
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
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Register </CardTitle>
        <CardDescription>
          Enter your details below to create an account
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
                <FormLabel>Name</FormLabel>
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
          </div>
          <FormField
            v-slot="{ componentField }"
            name="password"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  v-bind="componentField"
                  autocomplete="new-password"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </Button>
          <Button variant="outline" class="w-full">
            Register with Google
          </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          Already have an account?
          <router-link class="underline text-primary" :to="{ name: 'Login' }">
            Login
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
