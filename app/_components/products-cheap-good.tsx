"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { getCheaperProducts } from "@/app/_actions/get-cheaper-products";

interface Props {
  title: string;
  userId: string;
}

const ProductsCheapGood = ({ title, userId }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getCheaperProducts();
      setProducts(data);
    }

    load();
  }, [userId]);

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

export default ProductsCheapGood;
