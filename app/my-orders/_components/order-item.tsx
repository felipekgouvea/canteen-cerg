"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import type { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "Pagamento Pendente";
    case "FINISHED":
      return "Entregue";
    case "PAYMENT_CONFIRMED":
      return "Pagamento Confirmado";
    case "PAYMENT_FAILED":
      return "Pagamento falhou";
  }
};

const getOrderStatusLabelColors = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-[#FFB101]";
    case "FINISHED":
      return "bg-green-500";
    case "PAYMENT_CONFIRMED":
      return "bg-green-500";
    case "PAYMENT_FAILED":
      return "bg-red-500";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full ${getOrderStatusLabelColors(order.status)} px-2 py-1 text-muted-foreground text-white`}
        >
          <span>{getOrderStatusLabel(order.status)}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
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
        <div className="py-3">
          <Separator orientation="horizontal" />
        </div>
        <div className="space-y-3">
          {order.products.map((productOrder) => (
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
        <div className="py-3">
          <Separator orientation="horizontal" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.total))}</p>
          <Button
            variant="link"
            className={`text-primary ${order.status != "FINISHED" ? "hover:cursor-pointer" : ""}`}
            disabled={order.status != "FINISHED"}
          >
            Adicionar a sacola.
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
