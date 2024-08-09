<script setup lang="ts">
const loading = ref(false);
import { onMounted, ref } from "vue";

import DataTable from "~/components/table/data-table.vue";
import type { ITransaction } from "~/types";
import { transactionColumnDef } from "~/components/table/columns";
const data = ref<ITransaction[]>([]);

function generateRandomData(numObjects: number) {
  const statuses = ["pending", "processing", "completed"];
  const emails = [
    "example@gmail.com",
    "m@example.com",
    "test@example.com",
    "user@example.com",
  ];

  const randomData: ITransaction[] = [];

  for (let i = 0; i < numObjects; i++) {
    const id = Math.random().toString(36).substr(2, 8);
    const amount = Math.floor(Math.random() * 500) + 50;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const email = emails[Math.floor(Math.random() * emails.length)];

    randomData.push({ id, amount, status, email });
  }

  data.value = randomData;
}

onMounted(async () => {
  generateRandomData(100);
});
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All your transactions</p>
        <h1>Transactions</h1>
      </div>
    </header>
    <DataTable :columns="transactionColumnDef" :data="data" />
  </div>
</template>
