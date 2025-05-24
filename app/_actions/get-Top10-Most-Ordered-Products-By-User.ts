import { db } from "@/lib/prisma";
import type { Product } from "@prisma/client";

export async function getTop10MostOrderedProductsByUser(
  userId: string
): Promise<Product[]> {
  const result = await db.orderProduct.groupBy({
    by: ["productId"],
    where: {
      order: {
        userId,
      },
    },
    _count: {
      productId: true,
    },
    orderBy: {
      _count: {
        productId: "desc",
      },
    },
    take: 10,
  });

  const productIds = result.map((item) => item.productId);

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Garantir a ordem correta (porque `findMany` pode vir fora de ordem)
  const productMap = new Map(products.map(p => [p.id, p]));
  return productIds.map(id => productMap.get(id)!);
}
