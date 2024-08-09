<script setup lang="ts">
definePageMeta({
  layout: false,
  // middleware: ["auth-already"],
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const SignupSchema = toTypedSchema(
  z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
);

const form = useForm({
  validationSchema: SignupSchema,
});

const { login } = useAuthStore();

const onSubmit = form.handleSubmit(async (values) => {
  login(values);
  await navigateTo("/", { replace: true });
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-6">Sign In</h1>
      <form @submit="onSubmit" class="space-y-6">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>UserName</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="shadcn"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button
          type="submit"
          class="w-full py-3 bg-green-300 text-white rounded-lg font-medium hover:bg-green-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </Button>

        <p class="text-center text-sm text-gray-600">
          Dont have an account?
          <NuxtLink to="/auth/signup" class="text-blue-600">Sign Up</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
