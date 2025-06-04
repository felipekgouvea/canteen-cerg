"use server";

import { db } from "@/lib/prisma";

export async function getCheaperProducts() {
  const categories = ["Combos", "Lanches", "Bebidas", "Fritas"];

  const results = await Promise.all(
    categories.map((category) =>
      db.product.findMany({
        where: {
          price: {
            gte: 30,
            lte: 50,
          },
          menuCategory: {
            name: category,
          },
        },
        include: {
          menuCategory: true,
        },
        orderBy: {
          price: "asc",
        },
        take: 10,
      }),
    ),
  );

  return results.flat(); // lista única com todos os produtos
}
