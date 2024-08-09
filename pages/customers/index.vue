<script setup lang="ts">
import { onMounted } from "vue";

import DataTable from "~/components/table/data-table.vue";
import { customerColumnDef } from "~/components/table/columns";

const { customers } = storeToRefs(useUserStore());

const { fetchCustomers } = useUserStore();

onMounted(() => {
  fetchCustomers(100);
});
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All Customers Table</p>
        <h1>Customers</h1>
      </div>
    </header>
    <DataTable :data="customers" :columns="customerColumnDef" />
  </div>
</template>
