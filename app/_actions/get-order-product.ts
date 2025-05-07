"use server";

import { db } from "@/lib/prisma";

export const getOrderProduct = async (userId: string) => {
  const orderProducts = await db.orderProduct.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
    include: {
      product: true,
    },
    take: 10,
  });

  return orderProducts;
};
