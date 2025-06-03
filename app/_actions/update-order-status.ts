"use server";

import { db } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const statusFlow: Record<OrderStatus, OrderStatus | null> = {
  PENDING: "IN_PREPARATION",
  IN_PREPARATION: "PAYMENT_CONFIRMED",
  PAYMENT_CONFIRMED: "FINISHED",
  PAYMENT_FAILED: null,
  FINISHED: null,
};

export async function updateOrderStatus(orderId: number) {
  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Pedido não encontrado");

  const nextStatus = statusFlow[order.status];
  if (!nextStatus) return;

  await db.order.update({
    where: { id: orderId },
    data: { status: nextStatus },
  });

  revalidatePath("/orders");
}
