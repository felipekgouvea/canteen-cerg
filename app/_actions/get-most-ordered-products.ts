"use server";

import { db } from "@/lib/prisma";

export async function getMostOrderedProducts() {
  return db.product.findMany({
    orderBy: {
      orderProducts: {
        _count: "desc",
      },
    },
    take: 10,
  });
}
