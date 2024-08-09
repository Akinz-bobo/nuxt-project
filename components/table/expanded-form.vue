<script setup lang="ts">
import { watchEffect } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "vue-sonner";
import type { User } from "~/types";

const props = defineProps<{ user: User }>();
defineEmits<{
  (e: "expand"): void;
}>();

const user = props.user;

// Define the validation schema using zod
const formSchema = toTypedSchema(
  z.object({
    fullname: z.string().min(2).max(50),
    email: z.string().email(),
    age: z.number().min(18).max(100),
  })
);

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullname: user.name,
    email: user.email,
    age: user.age,
  },
});

const { updateCustomer } = useUserStore();

const onSubmit = handleSubmit((formValues) => {
  updateCustomer(user.id, formValues);

  toast.success("User information updated successfully!");
});
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="fullname">
      <FormItem>
        <FormLabel>Full Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="John Doe" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="age">
      <FormItem>
        <FormLabel>Age</FormLabel>
        <FormControl>
          <Input type="number" placeholder="12" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="example@example.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" @click="$emit('expand')">Update</Button>
  </form>
</template>
