import type { Product } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductsProps {
  products: Product[];
  slug: string;
}

const Products = ({ products, slug }: ProductsProps) => {
  return (
    <div className="mt-3 space-y-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} slug={slug} />
      ))}
    </div>
  );
};

export default Products;
