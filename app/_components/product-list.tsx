import { Product } from "@prisma/client";
import Link from "next/link";

import ProductItem from "./product-item";

interface ProductListProps{
  products: Product[]
}


const ProductList = ({products}:ProductListProps) => {
  
  return (
    <div className="flex gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`restaurant/canteen-cerg/products/${product.id}`}
        >
          <ProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
