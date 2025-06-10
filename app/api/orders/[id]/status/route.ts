// app/api/orders/[id]/status/route.ts
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function PATCH(
  request: Request,
  context: { params: { id: string } },
) {
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
