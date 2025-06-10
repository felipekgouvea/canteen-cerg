"use server";

import { db } from "@/app/_lib/prisma";
import { upsertProductSchema, type UpsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { DATABASE_ERROR_MESSAGE } from "@/app/_lib/errors";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  try {
    await db.product.upsert({
      where: { id: data.id! },
      create: {
        id: data.id,
        name: data.name,
        price: data.priceInCents,
        description: data.description,
        imageUrl: data.imageUrl,
        menuCategory: {
          connect: { id: data.menuCategoryId },
        },
        restaurant: {
          connect: { id: data.restaurantId }, // atualizado aqui
        },
      },
      update: {
        name: data.name,
        price: data.priceInCents,
        description: data.description,
        imageUrl: data.imageUrl,
        menuCategory: {
          connect: { id: data.menuCategoryId },
        },
        restaurant: {
          connect: { id: data.restaurantId }, // e aqui
        },
      },
    });
    revalidatePath("/products");
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
