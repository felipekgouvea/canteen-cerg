"use client";

import { Button } from "@/app/_components/ui/button";
import { CartContext } from "@/app/contexts/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { useContext } from "react";
import CartSheet from "./cart-sheet";

const CartBanner = () => {
  const { products, total, totalQuantity, toggleCart } =
    useContext(CartContext);

  return (
    <>
      {products.length > 0 ? (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
          <div className="flex items-center justify-between">
            {/* PREÇO */}
            <div>
              <span className="text-xs text-muted-foreground">
                Total do pedido
              </span>
              <h3 className="font-semibold">
                {formatCurrency(total)}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                </span>
              </h3>
            </div>
            {/* BOTÃO */}
            <Button onClick={toggleCart}>Ver sacola</Button>
            <CartSheet />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CartBanner;
