<script setup lang="ts" generic="TData extends Record<string, unknown>, TValue">
import { ref, watch } from "vue";
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/ui/input/Input.vue";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const sortBy = ref<string | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");
const pageSize = 5;
const sorting = ref<SortingState>([]);
const filter = ref<string>("");

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  enableGlobalFilter: true,
  state: {
    sorting: sorting.value,
    globalFilter: filter.value,
  },
  onSortingChange: (newSorting) => {
    sorting.value = newSorting as SortingState;
  },
});

watch([sortBy, sortDirection], ([newSortBy, newSortDirection]) => {
  if (newSortBy) {
    sorting.value = [{ id: newSortBy, desc: newSortDirection === "desc" }];
  } else {
    sorting.value = [];
  }
});

function extractHeaderText(header: any): string {
  if (typeof header === "function") {
    const vnode = header();
    return vnode.children as string;
  } else if (typeof header === "string") {
    return header;
  }
  return "";
}
</script>

<template>
  <div class="border rounded-md p-4">
    <!-- Search Input -->
    <div class="mb-4 flex items-center justify-between">
      <Input
        v-model="filter"
        type="text"
        placeholder="Search..."
        class="p-2 border rounded-md w-1/3"
      />

      <!-- Sort By Dropdown -->
      <div class="flex items-center space-x-4">
        <Select v-model="sortBy!">
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="column in props.columns"
              :key="column.id"
              :value="column.id!"
            >
              {{ extractHeaderText(column.header) }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="sortDirection">
          <SelectTrigger>
            <SelectValue placeholder="Sort Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Table -->
    <Table v-if="table">
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="props.columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div>
        Pages {{ table.getState().pagination.pageIndex + 1 }} to
        {{ table.getPageCount() }} of
        {{ table.getFilteredRowModel().rows.length }} entries
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          class="p-2 border rounded-md"
        >
          Previous
        </button>
        <button
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
          class="p-2 border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
