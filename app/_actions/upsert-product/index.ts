"use server";

import { db } from "@/lib/prisma";
import { upsertProductSchema, type UpsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);

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
};
