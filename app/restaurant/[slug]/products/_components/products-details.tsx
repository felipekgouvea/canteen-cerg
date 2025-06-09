import ProductItemDetails from "./product-item-details";
import type { Product } from "@prisma/client";

interface ProductsProps {
  products: Product[];
}

const ProductsDetails = ({ products }: ProductsProps) => {
  return (
    <div className="mt-3 space-y-3">
      {products.map((product) => (
        <ProductItemDetails key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsDetails;
