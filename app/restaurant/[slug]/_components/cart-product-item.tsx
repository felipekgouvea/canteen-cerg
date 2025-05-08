import Image from "next/image";
import { CartContext, type CartProduct } from "../../../contexts/cart";
import { Button } from "@/app/_components/ui/button";
import { Trash } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import CartButton from "./cart-button";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { removeProduct } = useContext(CartContext);
  return (
    <div className="mt-6 flex w-full items-center justify-between gap-2 overflow-hidden">
      <div className="relative min-h-[77px] min-w-[77px] rounded-lg bg-[#EBEBEB]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xs font-medium">{product.name}</h3>
          <p className="text-sm font-bold">{formatCurrency(product.price)}</p>
          <CartButton quantity={product.quantity} product={product} />
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeProduct(product.id)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
