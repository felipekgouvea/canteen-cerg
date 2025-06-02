"use server";

import { db } from "@/lib/prisma";
import { upsertProductSchema, type UpsertProductSchema } from "./schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);

  const restaurantId = "1bf67991-edd3-4624-9fa8-748c94723788";

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
        connect: { id: restaurantId },
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
        connect: { id: restaurantId },
      },
    },
  });
};
