// app/api/orders/[id]/status/route.ts
import { db } from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const bodySchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PREPARATION",
    "PAYMENT_CONFIRMED",
    "PAYMENT_FAILED",
    "FINISHED",
    "CANCELLED",
  ]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const orderId = Number(params.id);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const updated = await db.order.update({
    where: { id: orderId },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(updated);
}
