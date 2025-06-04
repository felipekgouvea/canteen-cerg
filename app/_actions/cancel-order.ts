"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function cancelOrder(orderId: number) {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Pedido não encontrado");
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new Error("Somente pedidos pendentes podem ser cancelados.");
  }

  await db.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.PAYMENT_FAILED,
    },
  });

  revalidatePath("/orders");
}
