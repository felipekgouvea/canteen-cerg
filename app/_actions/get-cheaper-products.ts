"use server";

import type { Product } from "@prisma/client";
import { db } from "@/lib/prisma";

export async function getCheaperProducts(): Promise<Product[]> {
  return db.product.findMany({
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
}
