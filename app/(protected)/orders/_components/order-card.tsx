"use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/app/_components/ui/alert-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { formatDateBR } from "@/helpers/format-date-br";
import { formatName } from "@/helpers/format-name";
import type { OrderStatus } from "@prisma/client";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

interface OrderCardProps {
  order: {
    id: number;
    total: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    studentId: number;
    userId: string;
    restaurantId: string;

    user: {
      name: string | null;
      image: string | null;
    };
    student: {
      name: string;
      imageURL: string;
      serie: {
        name: string;
      };
    };
    products: {
      product: {
        name: string;
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
              {order.student.serie.name}
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
        </Dialog>
        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <TrashIcon />
              Deletar médico
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar esse médico?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser revertida. Isso irá deletar o médico e
                todas as consultas agendadas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDoctorClick}>
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
