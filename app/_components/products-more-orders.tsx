import type { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { getMostOrderedProducts } from "@/app/_actions/get-most-ordered-products";
import ErrorMessage from "./error-message";

interface Props {
  title: string;
}

const ProductsMoreOrders = async ({ title }: Props) => {
  try {
    const products = await getMostOrderedProducts();

    return (
      <div className="mb-5 flex flex-col gap-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <ErrorMessage message="Não foi possível carregar os produtos" />
    );
  }
};

export default ProductsMoreOrders;
