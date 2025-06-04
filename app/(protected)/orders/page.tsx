"use client";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import OrderCard from "./_components/order-card";
import { useOrders } from "./hooks/use-orders";

const OrdersPage = () => {
  const { orders, isLoading } = useOrders();

  console.log(orders);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pedidos</PageTitle>
          <PageDescription>Gerencie os pedidos dos alunos</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        {isLoading ? (
          <p>Carregando pedidos...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default OrdersPage;
