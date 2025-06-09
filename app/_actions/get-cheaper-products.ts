"use server";

import type { Product } from "@prisma/client";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/lib/errors";

export async function getCheaperProducts(): Promise<Product[]> {
  try {
    return await db.product.findMany({
      where: {
        price: {
          gte: 3000, // R$30
          lte: 10000, // R$100
        },
      },
      orderBy: {
        price: "asc",
      },
    });
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
