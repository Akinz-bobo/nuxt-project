<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DeleteButton from "./delete-button.vue";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { User } from "~/types";

const props = defineProps<{
  user: User;
}>();
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
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="destructive" class="w-full">Delete</Button>
          </DialogTrigger>
          <DeleteButton :user="user" />
        </Dialog>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Button class="w-full bg-yellow-400 text-white hover:bg-yellow-400/75">
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
