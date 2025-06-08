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
import {
  CalendarIcon,
  ChefHat,
  EyeIcon,
  Loader2,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { formatName } from "@/helpers/format-name";
import Image from "next/image";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { useOrders } from "../hooks/use-orders";
import { updateOrderStatus } from "@/app/_actions/order";
import { toast } from "sonner";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Badge } from "@/app/_components/ui/badge";
import { formatDateBRWithTime } from "@/helpers/format-date-br";

interface OrderDetailsDialogProps {
  order: {
    id: number;
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

const serieMap: Record<string, { label: string }> = {
  MATERNAL: { label: "Maternal" },
  PRE_I: { label: "Pré I" },
  PRE_II: { label: "Pré II" },
  PRIMEIRO_ANO: { label: "1º ANO" },
  SEGUNDO_ANO: { label: "2º ANO" },
  TERCEIRO_ANO: { label: "3º ANO" },
  QUARTO_ANO: { label: "4º ANO" },
  QUINTO_ANO: { label: "5º ANO" },
};

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "outline"
  | "ghost"
  | "link";

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
  FINISHED: { label: "Entregar", variant: "success" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
};

const getAvailableStatusOptions = (currentStatus: OrderStatus) => {
  const options: {
    status: OrderStatus;
    label: string;
    variant: ButtonVariant;
    icon: React.ReactNode;
  }[] = [];

  if (currentStatus === "PENDING" || currentStatus === "PAYMENT_CONFIRMED") {
    options.push({
      status: "IN_PREPARATION",
      label: "Em preparação",
      variant: "secondary",
      icon: <ChefHat className="mr-1 h-4 w-4" />,
    });
  }

  if (currentStatus === "IN_PREPARATION") {
    options.push({
      status: "FINISHED",
      label: "Entregue",
      variant: "success",
      icon: <ThumbsUp className="mr-1 h-4 w-4" />,
    });
  }

  if (
    currentStatus === "PENDING" ||
    currentStatus === "IN_PREPARATION" ||
    currentStatus === "PAYMENT_CONFIRMED" ||
    currentStatus === "PAYMENT_FAILED"
  ) {
    options.push({
      status: "CANCELLED",
      label: "Cancelar",
      variant: "destructive",
      icon: <XCircle className="mr-1 h-4 w-4" />,
    });
  }

  return options;
};

export default function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  const { mutate } = useOrders();
  const [loadingStatus, setLoadingStatus] = useState<OrderStatus | null>(null);

  const handleChangeStatus = async (status: OrderStatus) => {
    setLoadingStatus(status);
    try {
      await updateOrderStatus(order.id, status);
      mutate();
      toast.success("Status atualizado!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar status");
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">
          <EyeIcon className="mr-2 h-4 w-4" />
          Ver detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[600px] max-w-2xl">
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
                  {serieMap[order.student.serie.name]?.label ?? "Não definida"}
                </p>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="w-fit">
                <CalendarIcon className="mr-1" size={12} />
                {formatDateBRWithTime(order.createdAt)}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">STATUS DO PEDIDO</p>

            {getAvailableStatusOptions(order.status).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {getAvailableStatusOptions(order.status).map((status) => (
                  <Button
                    key={status.status}
                    onClick={() => handleChangeStatus(status.status)}
                    variant={statusMap[status.status].variant}
                    disabled={loadingStatus !== null}
                  >
                    {loadingStatus === status.status && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {status.icon}
                    <span className="text-sm">
                      {statusMap[status.status].label}
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <Badge
                variant={statusMap[order.status].variant}
                className="w-fit"
              >
                {statusMap[order.status].label}
              </Badge>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">PRODUTOS DO PEDIDO</p>
            <ScrollArea className="max-h-[100px] rounded-md border">
              <div className="flex flex-col gap-2 p-2">
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
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
