"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

interface CreateOrderInput {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  restaurantId: string;
  studentId: number;
  userId: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: input.restaurantId,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));
  const order = await db.order.create({
    data: {
      status: "PENDING",
      products: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      restaurantId: restaurant.id,
      userId: input.userId,
      studentId: input.studentId,
    },
  });
  revalidatePath("/my-orders");

  return order;
};
