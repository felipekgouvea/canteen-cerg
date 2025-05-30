"use client";

import type { Product } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { getTop10MostOrderedProductsByUser } from "../_actions/get-most-ordered-products-by-user";
import ProductList from "./product-list";
import { Button } from "./ui/button";

interface ProductsCheapGoodProps {
  title: string;
  userId: string;
}

const ProductsCheapGood = ({ title, userId }: ProductsCheapGoodProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTop10MostOrderedProductsByUser(userId);
      setProducts(result);
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <Button className="text-[#EA1D2C]" size="sm" variant="link">
          Ver todos
          <ChevronRight />
        </Button>
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default ProductsCheapGood;
