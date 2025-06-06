"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import type { OrderStatus } from "@prisma/client";
import { EyeIcon } from "lucide-react";
import { formatName } from "@/helpers/format-name";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderDetailsDialogProps {
  order: {
    status: OrderStatus;
    createdAt: Date;
    total: number;
    user: {
      name: string | null;
    };
    student: {
      name: string;
      imageURL: string;
      serie: {
        name: string;
      };
    };
    orderProducts: {
      quantity: number;
      product: {
        name: string;
        id: string;
      };
    }[];
  };
}

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
  FINISHED: { label: "Entregue", variant: "success" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
};

const serieMap: Record<
  string,
  {
    label: string;
  }
> = {
  MATERNAL: { label: "Maternal" },
  PRE_I: { label: "Pré I" },
  PRE_II: { label: "Pré II" },
  PRIMEIRO_ANO: { label: "1º ANO" },
  SEGUNDO_ANO: { label: "2º ANO" },
  TERCEIRO_ANO: { label: "3º ANO" },
  QUARTO_ANO: { label: "4º ANO" },
  QUINTO_ANO: { label: "5º ANO" },
};

export default function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">
          <EyeIcon />
          Ver detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do pedido</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-around gap-4">
            <div className="relative h-32 w-24">
              <Image
                src={order.student.imageURL}
                alt={order.student.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-auto flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-sm font-medium">Responsável:</p>
                <p className="text-sm">
                  {formatName(order.user.name!).toUpperCase()}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm font-medium">Aluno:</p>
                <p className="text-sm">{order.student.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm font-medium">Série:</p>
                <p className="text-sm">
                  {serieMap[order.student.serie.name].label}
                </p>
              </div>
            </div>
            <div>
              <Badge variant={statusMap[order.status].variant}>
                {statusMap[order.status].label}
              </Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">MUDAR STATUS DO PEDIDO</p>
            <div className="flex gap-2">
              <Button variant="warning">
                <p className="text-sm">Em Preparação</p>
              </Button>
              <Button variant="success">
                <p className="text-sm">Entregue</p>
              </Button>
              <Button variant="danger">
                <p className="text-sm">Cancelar</p>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">PRODUTOS DO PEDIDO</p>
            <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-2">
              {order.orderProducts.map((orderProduct) => (
                <div
                  key={orderProduct.product.id}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                    <span className="block text-xs text-white">
                      {orderProduct.quantity}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {orderProduct.product.name}
                  </span>
                </div>
              ))}
              <Separator orientation="horizontal" />
              <div className="flex justify-between py-2">
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(Number(order.total))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
