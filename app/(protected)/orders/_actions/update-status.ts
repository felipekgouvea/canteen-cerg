"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateOrderStatusSchema = z.object({
  orderId: z.number(),
  status: z.enum([
    "PENDING",
    "IN_PREPARATION",
    "PAYMENT_CONFIRMED",
    "PAYMENT_FAILED",
    "FINISHED",
    "CANCELLED",
  ]),
});

export async function updateOrderStatus(data: unknown) {
  const parsed = updateOrderStatusSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Dados inválidos para atualização de status.");
  }

  const { orderId, status } = parsed.data;

  await db.order.update({
    where: { id: orderId },
    data: { status },
  });

  // Opcional: Revalida o path da página atual ou da lista de pedidos
  revalidatePath("/app/orders"); // ajuste conforme sua rota

  return { success: true };
}
