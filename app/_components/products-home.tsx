import type { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { getHomeProducts } from "@/app/_actions/get-products-home";

interface ProductsHomeProps {
  title: string;
}

const ProductsHome = async ({ title }: ProductsHomeProps) => {
  const products = await getHomeProducts();

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

export default ProductsHome;
