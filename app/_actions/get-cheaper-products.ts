"use server";

import { db } from "@/lib/prisma";

export async function getCheaperProducts() {
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
