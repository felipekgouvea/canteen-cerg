// app/api/pedidos/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Pega a data de hoje no horário local
  const now = new Date();

  // Define o início do dia em UTC (meia-noite UTC de hoje)
  const startOfDayUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );

  // Define o fim do dia em UTC (23:59:59.999 UTC)
  const endOfDayUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      student: {
        select: {
          name: true,
          imageURL: true,
          serie: {
            select: {
              name: true,
            },
          },
        },
      },
      products: {
        include: {
          product: {
            select: {
              name: true,
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
