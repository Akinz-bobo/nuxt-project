import { createColumnHelper } from "@tanstack/vue-table";
import DropdownAction from "@/components/table/table-dropdown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { h } from "vue";
import type { User } from "~/types";
import Button from "../ui/button/Button.vue";
import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper<User>();
export const customerColumnDef = [
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("id", {
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Full Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Age", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("avatar", {
    header: () => h("div", { class: "text-left" }, "Image"),
    cell: ({ row }) => {
      const imageUrl = row.original.avatar;
      return h("img", {
        src: imageUrl,
        alt: row.original.id,
        class: "w-16 h-16 object-cover",
      });
    },
  }),
  columnHelper.accessor("gender", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Gender", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Phone", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: () => h("div", { class: "text-left" }, "Phone Number"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h("div", { class: "relative" }, h(DropdownAction, { user }));
    },
  }),
];
