import { formatCurrency } from "@/helpers/format-currency";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
  slug?: string;
}

const ProductItem = ({ product, slug }: ProductItemProps) => {
  return (
    <Link
      href={`/restaurant/${slug}/products/${product.id}`}
      className="flex items-center justify-between gap-10 border-b py-3"
    >
      <div>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <p className="pt-3 text-sm font-semibold">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="relative min-h-[82px] min-w-[120px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-contain"
        />
      </div>
    </Link>
  );
};

export default ProductItem;
