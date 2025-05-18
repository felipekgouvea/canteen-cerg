import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/cart";
import CartItem from "./cart-product-item";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Button } from "@/app/_components/ui/button";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[75%]">
        <SheetHeader>
          <SheetTitle className="text-left">Minha Sacola</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <div className="flex h-full flex-col">
            <ScrollArea className="flex flex-auto flex-col">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </ScrollArea>
            <div className="w-full">
              <Card className="mb-6 mt-5">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="mb-4 w-full rounded-full"
                onClick={() => setFinishOrderDialogIsOpen(true)}
              >
                Finalizar Pedido
              </Button>
              <FinishOrderDialog
                open={finishOrderDialogIsOpen}
                onOpenChange={setFinishOrderDialogIsOpen}
              />
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm font-semibold">Sua sacola está vazia</p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
