<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { User } from "~/types";

const props = defineProps<{
  user: User;
}>();

defineEmits<{
  (e: "expand"): void;
}>();

const { deleteCustomer, verifyCustomer } = useUserStore();
const handleDeleteCustomer = () => {
  deleteCustomer(props.user.id);
  toast.error("Customer deleted successfully!", {
    style: {
      background: "red",
      color: "white",
    },
  });
};
const handleVerifyCustomer = () => {
  const verified = verifyCustomer(props.user.id);
  if (verified) {
    toast.error("Customer verified successfully!", {
      style: {
        background: "#6ee7b7",
      },
    });
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel class="text-center">Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        <Button
          variant="destructive"
          class="w-full"
          @click="handleDeleteCustomer"
          >Delete</Button
        >
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="$emit('expand')">
        <Button
          class="w-full bg-yellow-400 text-white hover:bg-yellow-400/75"
          @click="handleUpdateCustomer"
        >
          Update
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Button class="w-full bg-green-500 text-white hover:bg-green-500/75">
          Vefified
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
