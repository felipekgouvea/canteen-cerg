"use server";

import { db } from "@/lib/prisma";

export const getMenuCategories = async () => {
  const categories = await db.menuCategory.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
};
