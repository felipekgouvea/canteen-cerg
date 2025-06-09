"use server";

import type { Product } from "@prisma/client";
import { db } from "@/lib/prisma";

export async function getHomeProducts(): Promise<Product[]> {
  return db.product.findMany({
    where: {
      menuCategory: {
        name: {
          in: ["Salgados", "Pizza"],
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}
