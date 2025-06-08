"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import type { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/app/_components/ui/badge";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const statusMap: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "success" | "destructive" | "warning";
  }
> = {
  PENDING: { label: "Aguardando Pagamento", variant: "warning" },
  PAYMENT_CONFIRMED: { label: "Pagamento Confirmado", variant: "success" },
  IN_PREPARATION: { label: "Em Preparação", variant: "secondary" },
  FINISHED: { label: "Entregue", variant: "success" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
  PAYMENT_FAILED: { label: "Pagamento Falhou", variant: "destructive" },
};

const OrderItem = ({ order }: OrderItemProps) => {
  const status = statusMap[order.status];

  return (
    <Card>
      <CardContent className="p-5">
        {/* Status */}
        <Badge
          variant={status.variant}
          className="mb-3 w-fit text-[10px] md:text-sm"
        >
          <ClockIcon className="mr-1 h-3 w-3" />
          {status.label}
        </Badge>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.avatarImageUrl} />
            </Avatar>
            <span className="text-xs font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5" asChild>
            <Link href={`/restaurant/canteen-cerg`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <Separator />

        {/* Produtos */}
        <div className="my-3 space-y-3">
          {order.orderProducts.map((productOrder) => (
            <div key={productOrder.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {productOrder.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {productOrder.product.name}
              </span>
            </div>
          ))}
        </div>

        <Separator className="mb-4" />

        {/* Total e botão */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatCurrency(Number(order.total))}
          </p>
          <Button
            variant="link"
            className="text-primary"
            disabled={order.status !== "FINISHED"}
          >
            Adicionar à sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
