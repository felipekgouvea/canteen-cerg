"use server";

import { db } from "@/lib/prisma";

export async function getCheaperProducts() {
  const categories = ["Salgados", "Pizzas", "Bebidas"];

  const results = await Promise.all(
    categories.map(async (category) => {
      const products = await db.product.findMany({
        where: {
          price: {
            gte: 1,
            lte: 7,
          },
          menuCategory: {
            name: category,
          },
        },
        orderBy: {
          price: "asc",
        },
        take: 3,
      });

      return products;
    }),
  );

  return results.flat();
}
