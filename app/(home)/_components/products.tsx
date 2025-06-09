import ProductItem from "@/app/_components/product-item";
import type { Product } from "@prisma/client";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="mt-3 space-y-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
