"use server";

import { db } from "@/lib/prisma";

export async function getFavoriteProducts(userId: string) {
  const products = await db.product.findMany({
    where: {
      usersWhoFavorited: {
        some: {
          userId,
        },
      },
    },
  });

  return products;
}
