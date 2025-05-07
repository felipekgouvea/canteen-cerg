import { createOrder } from "@/app/_actions/order";
import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { CartContext } from "@/app/contexts/cart";
import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";

const FinishOrderButton = () => {
  const { data } = useSession();
  const { total, clearCart, products } = useContext(CartContext);
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDrawerOpen, setIsConfirmDraweOpen] = useState(false);

  const handleFinishOrder = async () => {
    if (!data?.user) return;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        total,
        status: OrderStatus.PENDING,
        restaurant: {
          connect: { id: "1bf67991-edd3-4624-9fa8-748c94723788" },
        },
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
              price: product.price,
            })),
          },
        },
      });
      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/my-orders");
      setIsSubmitLoading(false);
      setIsConfirmDraweOpen(false);
    }
  };

  return (
    <>
      {products.length > 0 && (
        <Button
          className="rounded-full"
          onClick={() => setIsConfirmDraweOpen(true)}
        >
          Finalizar Pedido
        </Button>
      )}
      <Drawer open={isConfirmDrawerOpen} onOpenChange={setIsConfirmDraweOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Deseja finalizar o pedido?</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="px-5">
            Ao finalizar o seu pedido, você deverá realizar o pagamento e no
            horário do lanche seu(sua) filho(a) receberá os itens escolhidos.
          </DrawerDescription>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={handleFinishOrder}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && <Loader2 className="animate-spin" />}
              Sim
            </Button>
            <DrawerClose>
              <Button className="w-full" variant="destructive">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FinishOrderButton;
