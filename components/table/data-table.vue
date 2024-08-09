<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/vue-table";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { valueUpdater } from "@/lib/utils";
const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

// pagination
const INITIAL_PAGE_INDEX = 0;
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const pageSizes = [5, 10, 20, 30, 40, 50];
const pageSize = 5;

// Sorting
const sorting = ref<SortingState>([]);

// Filtering
const columnFilters = ref<ColumnFiltersState>([]);
const globalFilter = ref("");

// Visibility
const columnVisibility = ref<VisibilityState>({});

// Selection
const rowSelection = ref({});

const table = useVueTable({
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize,
    },
  },
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

  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
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
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),

  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});

function handleGoToPage(e: any) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value));
}
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :modelValue="globalFilter ?? ''"
        @update:modelValue="(value:any) => (globalFilter = String(value))"
      />

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns
            <ChevronDown class="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value);
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="border rounded-md">
      <Table>
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
              <TableCell :colspan="columns.length" class="h-24 text-center">
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
  </div>
</template>
