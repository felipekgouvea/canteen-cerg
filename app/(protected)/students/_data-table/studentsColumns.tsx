"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export type Student = {
  id: number;
  name: string;
  imageURL: string;
  serie: {
    name: string;
  };
};

export const studentsColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-semibold text-muted-foreground"
        >
          Nome do(a) Aluno(a)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "serie",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-semibold text-muted-foreground"
        >
          Série
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.serie.name}</div>;
    },
  },
  {
    accessorKey: "imageURL",
    header: "Imagem",
    cell: ({ row }) => {
      return (
        <div className="relative h-[80px] w-full max-w-[70px] bg-[#F2F2F2]">
          <Image
            src={row.original.imageURL}
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
