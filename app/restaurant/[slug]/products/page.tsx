"use client";

import { searchForProducts } from "@/app/_actions/search";
import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import Footer from "@/app/_components/footer";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { Product } from "@prisma/client";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
    {Array.from({ length: 8 }).map((_, idx) => (
      <Skeleton key={idx} className="h-48 w-full rounded-md" />
    ))}
  </div>
);

const Products = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchFor = searchParams.get("search") ?? "";

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchFor) return;
      const foundProducts = await searchForProducts(searchFor);
      setProducts(foundProducts);
    };
    setProducts(null); // ativa loading
    fetchProducts();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  const handleClickProduct = (productId: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("search");
    router.push(`/product/${productId}?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Produtos Encontrados</h2>

        {products === null ? (
          <SkeletonGrid />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleClickProduct(product.id)}
                className="cursor-pointer"
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-center text-sm">
            Nenhum produto encontrado para a busca{" "}
            <p className="mt-4 truncate font-semibold">{searchFor}</p>
          </h3>
        )}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Products;
