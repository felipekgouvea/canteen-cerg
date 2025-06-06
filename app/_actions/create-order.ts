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
  const { restaurantId, studentId, userId, products } = input;

  // 1. Verifica se o restaurante existe
  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!restaurant) {
    throw new Error("Restaurante não encontrado.");
  }

  // 2. Busca os produtos e monta um Map para acesso rápido
  const dbProducts = await db.product.findMany({
    where: {
      id: {
        in: products.map((p) => p.id),
      },
    },
  });

  const priceMap = new Map(dbProducts.map((p) => [p.id, p.price]));

  // 3. Monta os dados com quantidade e preço
  const orderItems = products.map(({ id, quantity }) => {
    const price = priceMap.get(id);
    if (price === undefined) {
      throw new Error(`Produto com id ${id} não encontrado.`);
    }
    return {
      productId: id,
      quantity,
      price,
    };
  });

  // 4. Calcula total
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 5. Cria o pedido
  const order = await db.order.create({
    data: {
      status: "PENDING",
      restaurantId,
      studentId,
      userId,
      total, // em centavos
      products: {
        createMany: {
          data: orderItems,
        },
      },
    },
  });

  // 6. Revalida cache da página do cliente
  revalidatePath("/my-orders");

  return order;
};
