"use client";

import { cancelOrder } from "@/app/_actions/cancel-order";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import { useTransition } from "react";

interface CancelButtonProps {
  orderId: number;
  currentStatus: string;
}

export function CancelOrderButton({
  orderId,
  currentStatus,
}: CancelButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (currentStatus !== "PENDING") return null;

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await cancelOrder(orderId);
            toast.success("Pedido cancelado com sucesso!");
          } catch (error) {
            toast.error("Não foi possível cancelar o pedido.");
            console.error(error);
          }
        });
      }}
    >
      {isPending ? "Cancelando..." : "Cancelar Pedido"}
    </Button>
  );
}
