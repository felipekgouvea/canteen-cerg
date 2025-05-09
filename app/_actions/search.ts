"use server";

import { db } from "@/lib/prisma";

export const searchForProducts = async (search: string) => {
  const products = db.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return products;
};
