import { createColumnHelper } from "@tanstack/vue-table";
import DropdownAction from "@/components/table/table-dropdown.vue";
import { ArrowUpDown, ChevronDown, Trash } from "lucide-vue-next";
import { h } from "vue";
import { Product, type ITransaction, type User } from "~/types";
import Button from "../ui/button/Button.vue";
import { Checkbox } from "@/components/ui/checkbox";

const userColumnHelper = createColumnHelper<User>();
export const customerColumnDef = [
  userColumnHelper.display({
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

  userColumnHelper.accessor("id", {
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.accessor("name", {
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
  userColumnHelper.accessor("age", {
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
  userColumnHelper.accessor("avatar", {
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
  userColumnHelper.accessor("gender", {
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
  userColumnHelper.accessor("email", {
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
  userColumnHelper.accessor("phone", {
    header: () => h("div", { class: "text-left" }, "Phone Number"),
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, { user, onExpand: row.toggleExpanded })
      );
    },
  }),
];

const transactionColumnHelper = createColumnHelper<ITransaction>();
export const transactionColumnDef = [
  transactionColumnHelper.display({
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
  transactionColumnHelper.accessor("email", {
    header: () => h("div", { class: "text-left" }, "Email"),
    cell: (info) => info.getValue(),
  }),
  transactionColumnHelper.accessor("status", {
    header: () => h("div", { class: "text-left" }, "Status"),
    cell: (info) => info.getValue(),
  }),
  transactionColumnHelper.accessor("amount", {
    header: () => h("div", { class: "text-left" }, "Amount"),
    cell: ({ row }) => {
      const amount = row.original.amount;
      return h("div", { class: "text-left font-medium" }, `$${amount}`);
    },
  }),
  transactionColumnHelper.accessor("id", {
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: (info) => info.getValue(),
  }),
  transactionColumnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        Button,
        {
          variant: "destructive",
        },
        () => ["Delete", h(Trash, { class: "ml-2 h-4 w-4" })]
      );
    },
  }),
];

const productColumnHelper = createColumnHelper<Product>();

export const productColumnDef = [
  productColumnHelper.display({
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

  productColumnHelper.accessor("id", {
    header: () => h("div", { class: "text-left" }, "ID"),
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor("name", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Product Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor("image", {
    header: () => h("div", { class: "text-left" }, "Image"),
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return h("img", {
        src: imageUrl,
        alt: row.original.id,
        class: "w-16 h-16 object-cover",
      });
    },
  }),
  productColumnHelper.accessor("category", {
    header: () => h("div", { class: "text-left" }, "Category"),
    cell: (info) => info.getValue(),
  }),
  productColumnHelper.accessor("price", {
    header: () => h("div", { class: "text-left" }, "Price"),
    cell: ({ row }) => {
      const price = row.original.price;
      return h("div", { class: "text-left font-medium" }, `$${price}`);
    },
  }),
  productColumnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, { user, onExpand: row.toggleExpanded })
      );
    },
  }),
];
