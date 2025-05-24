"use server";

import { db } from "@/lib/prisma";

export async function getCheaperProducts() {
  const products = await db.product.findMany({
    where: {
      price: {
        gte: 1,
        lte: 7,
      },
    },
    orderBy: {
      price: "asc",
    },
    take: 8,
  });

  return products;
}
