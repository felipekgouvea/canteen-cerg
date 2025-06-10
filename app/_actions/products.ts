"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/app/_lib/errors";

export const toggleFavoriteProduct = async (
  userId: string,
  productId: string,
) => {
  try {
    const isFavorite = await db.userFavoriteProduct.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (isFavorite) {
      await db.userFavoriteProduct.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      revalidatePath("/");
      return;
    }

    await db.userFavoriteProduct.create({
      data: {
        userId,
        productId,
      },
    });

    revalidatePath("/");
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
