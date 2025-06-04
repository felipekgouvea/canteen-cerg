"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: number) {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Pedido não encontrado");
  }

  let nextStatus: OrderStatus | null = null;

  switch (order.status) {
    case "PENDING":
      nextStatus = OrderStatus.PAYMENT_CONFIRMED;
      break;
    case "PAYMENT_CONFIRMED":
    case "PAYMENT_FAILED":
      nextStatus = OrderStatus.IN_PREPARATION;
      break;
    case "IN_PREPARATION":
      nextStatus = OrderStatus.FINISHED;
      break;
    case "FINISHED":
      nextStatus = null; // Pedido finalizado, não atualiza mais
      break;
    default:
      throw new Error("Status desconhecido");
  }

  if (nextStatus) {
    await db.order.update({
      where: { id: orderId },
      data: { status: nextStatus },
    });

    revalidatePath("/orders");
  }

  return nextStatus;
}
