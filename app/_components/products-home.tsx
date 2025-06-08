"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { getHomeProducts } from "@/app/_actions/get-products-home";

interface ProductsHomeProps {
  title: string;
}

const ProductsHome = ({ title }: ProductsHomeProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getHomeProducts();
      setProducts(data);
    }

    load();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsHome;
