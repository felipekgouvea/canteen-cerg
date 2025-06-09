// app/api/orders/[id]/status/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validação do corpo
const patchStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "PAYMENT_CONFIRMED",
    "IN_PREPARATION",
    "FINISHED",
    "CANCELLED",
    "PAYMENT_FAILED",
  ]),
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function PATCH(request: Request, context: any) {
  const { id } = context.params;

  const body = await request.json();

  const parsed = patchStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const updatedOrder = await db.order.update({
    where: { id: Number(id) },
    data: {
      status: parsed.data.status,
    },
  });

  return NextResponse.json(updatedOrder);
}
