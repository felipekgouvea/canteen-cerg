"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/helpers/format-currency";
import { Card, CardContent } from "./ui/card";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`restaurant/canteen-cerg/products/${product.id}`}>
      <Card className="h-full w-full transition-transform hover:scale-[1.01]">
        <CardContent className="p-2 sm:p-4">
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 sm:h-36 sm:w-36">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-md object-contain"
              />
            </div>

            <div className="mt-2 flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-semibold sm:text-base">
                {product.name}
              </p>
              <span className="text-xs font-semibold text-primary sm:text-sm">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
