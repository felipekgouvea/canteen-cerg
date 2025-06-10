import { DATABASE_ERROR_MESSAGE } from "@/app/_lib/errors";
import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const serie = searchParams.get("serie");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const now = new Date();

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

  const startDate = startDateParam
    ? new Date(`${startDateParam}T00:00:00.000Z`)
    : startOfDayUTC;
  const endDate = endDateParam
    ? new Date(`${endDateParam}T23:59:59.999Z`)
    : endOfDayUTC;

  const whereClause: Prisma.OrderWhereInput = {
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  };

  if (status && status !== "ALL") {
    whereClause.status = status as OrderStatus;
  }

  if (serie && serie !== "ALL") {
    whereClause.student = {
      serie: {
        name: serie,
      },
    };
  }

  try {
    const orders = await db.order.findMany({
      where: whereClause,
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientRustPanicError
    ) {
      return NextResponse.json(
        { error: DATABASE_ERROR_MESSAGE },
        { status: 500 },
      );
    }
    throw error;
  }
}
