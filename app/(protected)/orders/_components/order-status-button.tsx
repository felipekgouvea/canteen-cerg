"use client";

import { useState, useTransition } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface OrderStatusButtonProps {
  orderId: number;
}

export function OrderStatusButton({ orderId }: OrderStatusButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    setHasSubmitted(true);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("orderId", String(orderId));

      await fetch("/api/update-order-status", {
        method: "POST",
        body: formData,
      });

      window.location.reload();
    });
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isPending || hasSubmitted}
      variant="secondary"
      className="gap-2"
    >
      {isPending || hasSubmitted ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Atualizando...
        </>
      ) : (
        <>
          <ArrowRight className="h-4 w-4" />
          Avançar Status
        </>
      )}
    </Button>
  );
}
