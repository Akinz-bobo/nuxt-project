<script setup lang="ts" generic="TData extends Record<string, unknown>, TValue">
import { ref, watch } from "vue";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/vue-table";
import {
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  FlexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
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

import DebouncedInput from "./DebouncedInput.vue";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const data = ref(props.data);

// pagination
const INITIAL_PAGE_INDEX = 0;
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const pageSizes = [5, 10, 20, 30, 40, 50];
const pageSize = 5;

// filtering
const columnFilters = ref<ColumnFiltersState>([]);
const globalFilter = ref("");

// sorting
const sorting = ref<SortingState>([]);
const sortBy = ref<string | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns: props.columns,
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize,
    },
  },
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
    get sorting() {
      return sorting.value;
    },
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(globalFilter.value)
        : updaterOrValue;
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },

  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  debugTable: true,
});

function handleGoToPage(e: any) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value));
}

// Filter columns to exclude certain ones from sorting (e.g., image, avatar)
const sortableColumns = computed(() =>
  props.columns.filter(
    (column) => !["image", "avatar"].includes(column.id?.toLowerCase() || "")
  )
);

const sortinChangeHandler = () => {};
</script>

<template>
  <div class="border rounded-md p-4">
    <!-- Search Input -->
    <div class="mb-4 flex items-center justify-between">
      <DebouncedInput
        :modelValue="globalFilter ?? ''"
        @update:modelValue="(value:any) => (globalFilter = String(value))"
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />

      <!-- Sort By Dropdown -->
      <div class="flex items-center space-x-4">
        <Select @update:model-value="sortinChangeHandler">
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="column in sortableColumns"
              :key="column.id"
              :value="column.id!"
            >
              <!-- {{ column. }} -->
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
      <div class="flex items-center space-x-2">
        <button
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          class="p-2 border rounded-md"
        >
          Previous
        </button>
        <button
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
          class="p-2 border rounded-md"
        >
          Next
        </button>
      </div>
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            :value="goToPageNumber"
            @change="handleGoToPage"
            class="border p-2 w-16 rounded-md"
          />
        </span>
        <select
          :value="table.getState().pagination.pageSize"
          @change="handlePageSizeChange"
          class="border p-2 w-28 rounded-md outline-none"
        >
          <option
            :key="pageSize"
            :value="pageSize"
            v-for="pageSize in pageSizes"
          >
            Show {{ pageSize }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
