"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/app/_lib/errors";

export const getOrderProduct = async (userId: string) => {
  try {
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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientRustPanicError
    ) {
      throw new Error(DATABASE_ERROR_MESSAGE);
    }
    throw error;
  }
};
