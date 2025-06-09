"use server";

import type { Product } from "@prisma/client";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/lib/errors";

export async function getTop10MostOrderedProductsByUser(
  userId: string,
): Promise<Product[]> {
  try {
    const result = await db.orderProduct.groupBy({
      by: ["productId"],
      where: {
        order: {
          userId,
      },
    },
    _count: {
      productId: true,
    },
    orderBy: {
      _count: {
        productId: "desc",
      },
    },
    take: 10,
  });

    const productIds = result.map((item) => item.productId);

    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));
    return productIds.map((id) => productMap.get(id)!);
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
