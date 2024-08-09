<script setup lang="ts">
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import DialogClose from "./ui/dialog/DialogClose.vue";
import { toast } from "vue-sonner";

const { addCustomer } = useUserStore();

const formSchema = toTypedSchema(
  z.object({
    fullname: z.string().min(2).max(50),
    age: z.number().min(20).max(100),
    gender: z.string().min(4),
    email: z.string().email(),
    phone: z.string().min(8),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  addCustomer(values);
  toast.success("Customer added successfully!", {
    style: {
      background: "#6ee7b7",
    },
  });
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Add Customer</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Customer</DialogTitle>
      </DialogHeader>

      <form id="dialogForm" class="w-full space-y-6" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="fullname">
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="John Smith"
                v-bind="componentField"
              />
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

        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="000-000-000-00"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="gender">
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Input type="text" placeholder="male" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="age">
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="submit" form="dialogForm">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
