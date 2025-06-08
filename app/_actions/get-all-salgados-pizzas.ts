"use server";

import { db } from "@/lib/prisma";

export async function getAllSalgadosAndPizzas() {
  const products = await db.product.findMany({
    where: {
      menuCategory: {
        name: {
          in: ["Salgados", "Pizza"],
        },
      },
    },
    include: {
      menuCategory: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return products;
}
