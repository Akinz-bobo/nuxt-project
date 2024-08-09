<script setup lang="ts">
import { ref, onMounted } from "vue";
import { productColumnDef } from "~/components/table/columns";

import DataTable from "~/components/table/data-table.vue";

const data = ref<any[]>([]);

onMounted(async () => {
  const productData = useProductsStore();
  data.value = await productData.fetchProducts();
});
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All Products Table</p>
        <h1>Products</h1>
      </div>
    </header>
    <DataTable :columns="productColumnDef" :data="data" />
  </div>
</template>
