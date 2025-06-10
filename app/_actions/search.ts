"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/app/_lib/errors";

export const searchForProducts = async (search: string) => {
  try {
    const products = await db.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return products;
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
