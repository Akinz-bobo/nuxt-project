<script setup lang="ts">
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "~/types";

const props = defineProps<{ user: User }>();
const { deleteCustomer } = useUserStore();
const handleDeleteCustomer = () => {
  deleteCustomer(props.user.id);
};
</script>

<template>
  <DialogContent
    class="sm:max-w-md"
    @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
      }"
  >
    <DialogHeader>
      <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
      <DialogDescription>This action cannot be undone! </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4">
      <Button size="sm" class="px-3" @click="handleDeleteCustomer">
        Delete
      </Button>
    </div>
  </DialogContent>
</template>
