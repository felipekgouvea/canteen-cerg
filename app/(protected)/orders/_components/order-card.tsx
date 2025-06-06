"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { formatDateBR } from "@/helpers/format-date-br";
import { formatName } from "@/helpers/format-name";
import type { OrderStatus } from "@prisma/client";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import OrderDetailsDialog from "./order-details-dialog";

interface OrderCardProps {
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

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={order.student.imageURL} />
            <AvatarFallback>FG</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">
              {formatName(order.student.name).toLocaleUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {serieMap[order.student.serie.name].label}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2 flex flex-col gap-3">
        <Badge variant={statusMap[order.status].variant} className="w-fit">
          <ClockIcon className="mr-1" size={12} />
          {statusMap[order.status].label}
        </Badge>
        <Badge variant="outline" className="w-fit">
          <CalendarIcon className="mr-1" size={12} />
          {formatDateBR(order.createdAt)}
        </Badge>
        <Badge variant="outline" className="w-fit">
          <DollarSignIcon className="mr-1" size={12} />
          {formatCurrency(order.total)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <OrderDetailsDialog order={order} />
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
