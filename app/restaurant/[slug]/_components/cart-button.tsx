import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext, type CartProduct } from "../../../contexts/cart";

interface CartButtonProps {
  quantity: number;
  product: CartProduct;
}

const CartButton = ({ quantity, product }: CartButtonProps) => {
  const { decreaseProductQuantity, increaseProductQuantity } =
    useContext(CartContext);
  return (
    <div className="flex items-center gap-3 text-center">
      <Button
        variant="outline"
        className="h-8 w-8 rounded-xl"
        onClick={() => decreaseProductQuantity(product.id)}
      >
        <ChevronLeftIcon />
      </Button>
      <p className="w-4">{quantity}</p>
      <Button
        onClick={() => increaseProductQuantity(product.id)}
        variant="destructive"
        className="h-8 w-8 rounded-xl"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default CartButton;
