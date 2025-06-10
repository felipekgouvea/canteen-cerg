import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(orders);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-4 font-semibold">Meus Pedidos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
