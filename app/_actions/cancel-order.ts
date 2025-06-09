"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus, Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/lib/errors";

export async function cancelOrder(orderId: number) {
  try {
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientRustPanicError
    ) {
      throw new Error(DATABASE_ERROR_MESSAGE);
    }
    throw error;
  }
}
