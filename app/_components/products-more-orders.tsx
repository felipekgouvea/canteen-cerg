"use client";

import type { Product } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { getCheaperProducts } from "../_actions/get-cheaper-products";
import ProductList from "./product-list";
import { Button } from "./ui/button";

interface ProductsMoreOrdersProps {
  title: string;
}

const ProductsMoreOrders = ({ title }: ProductsMoreOrdersProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCheaperProducts();
        setProducts(result || []);
      } catch (err) {
        console.error("Erro ao buscar produtos baratos:", err);
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

export default ProductsMoreOrders;
