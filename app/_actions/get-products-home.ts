"use server";

import { db } from "@/lib/prisma";

export async function getProductsHome() {
  const products = await db.product.findMany({
    where: {
      menuCategory: {
        name: {
          in: ["Salgados", "Pizzas"],
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    take: 8,
  });

  return products;
}
