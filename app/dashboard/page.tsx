import { BadgeDollarSign, DollarSign, ShoppingBag } from "lucide-react";
import CardDashboard from "./_components/card-dashboard";
import MenuSheetDashboard from "./_components/menu-sheet-dashboard";
import SideBar from "./_components/sidebar";
import OrderItem from "./_components/order-item";
import { db } from "@/lib/prisma";
import { startOfDay, startOfMonth } from "date-fns";

const Dashboard = async () => {
  const now = new Date();
  const start = startOfDay(now);

  const startOfToday = startOfDay(now);

  const latestOrders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const totalOrdersThisMonth = await db.order.count({
    where: {
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: new Date(),
      },
    },
  });

  const totalAmountThisMonth = await db.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: new Date(),
      },
    },
  });

  const totalSales = await db.order.count({
    where: {
      createdAt: {
        gte: startOfToday,
        lte: now,
      },
    },
  });

  const totalAmount = await db.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: start,
        lte: now,
      },
    },
  });

  return (
    <main className="sm:ml-14">
      <SideBar />
      <MenuSheetDashboard />

      <section className="mt-4 grid grid-cols-2 gap-4 px-4 lg:grid-cols-3">
        <CardDashboard
          title="Total Pedidos (Mês)"
          description="Total de pedidos no mês"
          icon={<DollarSign className="ml-auto h-4 w-4" />}
          content={totalOrdersThisMonth.toString()}
        />
        <CardDashboard
          title="Valor dos Pedidos"
          description="Valor dos pedidos do mês"
          icon={<BadgeDollarSign className="ml-auto h-4 w-4" />}
          content={`R$ ${totalAmountThisMonth._sum.total?.toFixed(2) ?? "0,00"}`}
        />
        <CardDashboard
          title="Total Pedidos (Hoje)"
          description="Total de pedidos hoje"
          icon={<ShoppingBag className="ml-auto h-4 w-4" />}
          content={totalSales.toString()}
        />
        <CardDashboard
          title="Valor do Pedidos"
          description="Valor em pedidos hoje"
          icon={<DollarSign className="ml-auto h-4 w-4" />}
          content={`R$ ${totalAmount._sum.total?.toFixed(2) ?? "0,00"}`}
        />
      </section>

      <section className="mt-4 flex flex-col gap-4 px-4 md:flex-row">
        <CardDashboard
          title="Últimos pedidos"
          description="Pedidos nas últimas 24 horas"
          icon={<DollarSign className="ml-auto h-4 w-4" />}
          item={latestOrders.map((order) => (
            <OrderItem
              key={order.id}
              name={order.studentName}
              serie={order.studentSerie}
              studentImageURL={order.studentName}
            />
          ))}
        />
      </section>
    </main>
  );
};

export default Dashboard;
