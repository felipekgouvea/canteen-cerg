"use client";

import { searchForProducts } from "@/app/_actions/search";
import Header from "@/app/_components/header";
import type { Product } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "./_components/product-item";

const Products = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchFor) return;
      const foundProducts = await searchForProducts(searchFor);
      setProducts(foundProducts);
    };

    fetchProducts();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Produtos Encontrados</h2>
        {products.length > 0 ? (
          <div className="flex w-full flex-col gap-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <h1 className="text-center text-sm">
            Nenhum produto encontrado para a busca -{" "}
            <strong className="font-semibold">{searchFor}</strong>
          </h1>
        )}
      </div>
    </>
  );
};

export default Products;
