import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  const startOfDayUTC = new Date(now);
  startOfDayUTC.setUTCHours(0, 0, 0, 0);

  const endOfDayUTC = new Date(now);
  endOfDayUTC.setUTCHours(23, 59, 59, 999);

  console.log({ startOfDayUTC, endOfDayUTC }); // Opcional: debug

  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      student: {
        select: {
          id: true,
          name: true,
          imageURL: true,
          serie: {
            select: {
              name: true,
            },
          },
        },
      },
      orderProducts: {
        select: {
          id: true,
          quantity: true,
          price: true,
          product: {
            select: {
              id: true,
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
