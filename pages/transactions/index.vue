<script setup lang="ts">
const loading = ref(false);
import { h, onMounted, ref } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

interface ITransaction {
  id: string;
  amount: number;
  status: string;
  email: string;
}
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

const columns: ColumnDef<any, any>[] = [
  {
    id: "email",
    header: () => h("div", { class: "text-left" }, "Email"),
    cell: ({ row }) => {
      const email = row.original.email;
      return h("div", { class: "text-left font-medium" }, email);
    },
  },
  {
    id: "status",
    header: () => h("div", { class: "text-left" }, "Status"),
    cell: ({ row }) => {
      const status = row.original.status;
      return h("div", { class: "text-left font-medium" }, status);
    },
  },
  {
    id: "amount",
    header: () => h("div", { class: "text-left" }, "Amount"),
    cell: ({ row }) => {
      const amount = row.original.amount;
      return h("div", { class: "text-left font-medium" }, `$${amount}`);
    },
  },
  {
    id: "id",
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h("div", { class: "text-left font-medium" }, id);
    },
  },
];
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>All your transactions</p>
        <h1>Transactions</h1>
      </div>
    </header>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
