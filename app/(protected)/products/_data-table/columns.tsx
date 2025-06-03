"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/helpers/format-currency";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export type Product = {
  id: string;
  name: string;
  price: number;
  menuCategory: {
    name: string;
  };
  description: string;
  imageUrl: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-semibold text-muted-foreground"
        >
          Nome do Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-semibold text-muted-foreground"
        >
          Preço do Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatCurrency(row.original.price)}</div>;
    },
  },
  {
    accessorKey: "menuCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-semibold text-muted-foreground"
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.menuCategory.name}</div>;
    },
  },

  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => {
      return (
        <div className="relative h-[65px] w-full bg-[#F2F2F2]">
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </div>
      );
    },
  },
];
