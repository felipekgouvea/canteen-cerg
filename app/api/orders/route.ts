import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  // Define o início do dia em UTC (00:00:00.000)
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

  // Define o fim do dia em UTC (23:59:59.999)
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

  console.log("🔎 Buscando pedidos...");

  try {
    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startOfDayUTC,
          lte: endOfDayUTC,
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
        createdAt: "asc",
      },
    });

    console.log("✅ Pedidos encontrados:", orders.length);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 },
    );
  }
}
