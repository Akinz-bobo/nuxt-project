<script setup lang="ts">
import { h, ref, onMounted } from "vue";

import type { ColumnDef } from "@tanstack/vue-table";
import DataTable from "~/components/table/data-table.vue";

const data = ref<any[]>([]);

onMounted(async () => {
  const productData = useProductsStore();
  data.value = await productData.fetchProducts();
});

console.log(data.value);
// Define the columns for the DataTable
const columns: ColumnDef<any, any>[] = [
  {
    id: "id",
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: ({ row }) => row.original.id,
  },
  {
    id: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => row.original.name,
  },
  {
    id: "price",
    header: () => h("div", { class: "text-left" }, "Price"),
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    id: "image",
    header: () => h("div", { class: "text-left" }, "Image"),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return h("img", {
        src: imageUrl,
        alt: row.original.name,
        class: "w-16 h-16 object-cover",
      });
    },
  },
  {
    id: "category",
    header: () => h("div", { class: "text-left" }, "Category"),
    cell: ({ row }) => row.original.category,
  },

  {
    id: "action",
    header: () => h("div", { class: "text-left" }, "Actions"),
  },
];
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All Products Table</p>
        <h1>Products</h1>
      </div>
    </header>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
