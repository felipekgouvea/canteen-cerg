import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../../contexts/cart";
import CartItem from "./cart-product-item";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import FinishOrderButton from "./finish-ordem-button";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Minha Sacola</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <div className="flex h-full flex-col py-5">
            <div className="flex-auto">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(total)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <FinishOrderButton />
          </div>
        ) : (
          <p className="mt-5 text-sm font-semibold">Sua sacola está vazia</p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
