import type { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { getCheaperProducts } from "@/app/_actions/get-cheaper-products";
import { getTop10MostOrderedProductsByUser } from "@/app/_actions/get-most-ordered-products-by-user";

interface Props {
  title: string;
  userId?: string | null;
}

const ProductsCheapGood = async ({ title, userId }: Props) => {
  const products = userId
    ? await getTop10MostOrderedProductsByUser(userId)
    : await getCheaperProducts();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCheapGood;
