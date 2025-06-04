"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import type { OrderStatus } from "@prisma/client";
import { formatCurrency } from "@/helpers/format-currency";
import { formatName } from "@/helpers/format-name";
import { formatDateTimeBR } from "@/helpers/format-date";
import { Badge } from "@/app/_components/ui/badge";
import { OrderStatusButton } from "../_components/order-status-button";
import { CancelOrderButton } from "../_components/order-cancel-button";

export type Order = {
  id: number;
  total: number;
  status: OrderStatus;
  student: {
    name: string;
    serie: { name: string };
  };
  user: { name: string };
  restaurant: { name: string };
  products: {
    product: { name: string };
  }[];
  createdAt: Date;
};

const statusMap: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "success" | "destructive" | "warning";
  }
> = {
  PENDING: { label: "Aguardando Pagamento", variant: "warning" },
  IN_PREPARATION: { label: "Em Preparação", variant: "secondary" },
  PAYMENT_CONFIRMED: { label: "Pagamento Confirmado", variant: "success" },
  PAYMENT_FAILED: { label: "Pagamento Falhou", variant: "destructive" },
  FINISHED: { label: "Finalizado", variant: "default" },
};

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "student.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm font-semibold text-muted-foreground"
      >
        Aluno(a)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.student.name}</div>,
  },
  {
    accessorKey: "student.serie.name",
    header: "Série",
    cell: ({ row }) => <div>{row.original.student.serie.name}</div>,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm font-semibold text-muted-foreground"
      >
        Responsável
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {formatName(row.original.user.name)}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <div>{formatCurrency(row.original.total)}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statusMap[row.original.status];
      return <Badge variant={status.variant}>{status.label}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data do pedido",
    cell: ({ row }) => (
      <div className="text-[12px] text-muted-foreground">
        {formatDateTimeBR(row.original.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Atualizar Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <OrderStatusButton orderId={row.original.id} />
          <CancelOrderButton
            orderId={row.original.id}
            currentStatus={row.original.status}
          />
        </div>
      );
    },
  },
];
