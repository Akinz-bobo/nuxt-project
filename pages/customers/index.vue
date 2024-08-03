<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import EditButton from "~/components/EditButton.vue";

const data = ref<any[]>([]);

onMounted(async () => {
  const userStore = useUserStore();
  await userStore.fetchCustomers();
  data.value = userStore.customers;
});

console.log(data.value);
const columns: ColumnDef<any, any>[] = [
  {
    id: "id",
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: ({ row }) => row.original.id,
  },
  {
    id: "firstName",
    header: () => h("div", { class: "text-left" }, "First Name"),
    cell: ({ row }) => row.original.firstName,
  },
  {
    id: "lastName",
    header: () => h("div", { class: "text-left" }, "Last Name"),
    cell: ({ row }) => row.original.lastName,
  },
  {
    id: "age",
    header: () => h("div", { class: "text-left" }, "Age"),
    cell: ({ row }) => `${row.original.age}`,
  },
  {
    id: "image",
    header: () => h("div", { class: "text-left" }, "Image"),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return h("img", {
        src: imageUrl,
        alt: row.original.email,
        class: "w-16 h-16 object-cover",
      });
    },
  },
  {
    id: "gender",
    header: () => h("div", { class: "text-left" }, "Gender"),
    cell: ({ row }) => row.original.gender,
  },
  {
    id: "email",
    header: () => h("div", { class: "text-left" }, "Email"),
    cell: ({ row }) => row.original.email,
  },
  {
    id: "phone",
    header: () => h("div", { class: "text-left" }, "Phone"),
    cell: ({ row }) => row.original.phone,
  },
];
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All Customers Table</p>
        <h1>Customers</h1>
      </div>
    </header>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
