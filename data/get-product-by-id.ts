"use server";

import { db } from "@/lib/prisma";

export const getProductById = async (productId: string) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  return product;
};
