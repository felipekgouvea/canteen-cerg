"use client";

import type { Product } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { getProductsHome } from "../_actions/get-products-home";
import ProductList from "./product-list";
import { Button } from "./ui/button";

interface ProductsHomeProps {
  title: string;
}

const ProductsHome = ({ title }: ProductsHomeProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductsHome();
        setProducts(result || []);
      } catch (err) {
        console.error("Erro ao buscar produtos da home:", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) return null;

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

export default ProductsHome;
