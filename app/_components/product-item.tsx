import type { Product } from "@prisma/client";
import Image from "next/image";

import { formatCurrency } from "@/helpers/format-currency";
import { cn } from "@/lib/utils";

interface ProductOrderProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product, className }: ProductOrderProps) => {
  return (
    <div className={(cn("w-[150px] min-w-[150px] space-y-2"), className)}>
      <div className="relative h-[100px] w-full bg-[#F2F2F2]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <h3 className="font-semibold">{formatCurrency(product.price)}</h3>
      </div>
    </div>
  );
};

export default ProductItem;
