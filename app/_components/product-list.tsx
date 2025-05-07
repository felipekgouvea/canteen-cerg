import ProductItem from "./product-item";
import { getOrderProduct } from "../_actions/get-order-product";
import { db } from "@/lib/prisma";
import Link from "next/link";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      price: {
        gte: 5,
        lte: 10,
      },
    },
    take: 5,
  });

  return (
    <div className="flex gap-4">
      {products.map((product) => (
        <Link href={`restaurant/canteen-cerg/products/${product.id}`}>
          <ProductItem key={product.id} product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
