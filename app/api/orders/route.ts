import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date("2025-06-04T00:00:00.000Z"),
        lte: new Date("2025-06-06T00:00:00.000Z"),
      },
    },
    include: {
      user: { select: { name: true } },
      student: {
        select: {
          name: true,
          imageURL: true,
          serie: { select: { name: true } },
        },
      },
      orderProducts: {
        select: {
          quantity: true,
          product: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(orders);
}
