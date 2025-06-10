"use server";

import { db } from "@/app/_lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        orderBy: {
          createdAt: "asc",
        },
        include: { products: true },
      },
    },
  });

  return restaurant;
};
