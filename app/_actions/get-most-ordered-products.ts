"use server";

import type { Product } from "@prisma/client";
import { db } from "@/lib/prisma";

export async function getMostOrderedProducts(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: {
      orderProducts: {
        _count: "desc",
      },
    },
    take: 10,
  });
}
