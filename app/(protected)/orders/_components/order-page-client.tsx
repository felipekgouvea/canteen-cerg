"use client";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import OrderCard from "./order-card";
import { useOrders } from "../hooks/use-orders";
import { Skeleton } from "@/app/_components/ui/skeleton";
import ErrorMessage from "@/app/_components/error-message";
import { OrdersFilterBar } from "./orders-filter-bar";

const OrdersPageClient = () => {
  const { orders, isLoading, isError } = useOrders();

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pedidos</PageTitle>
          <PageDescription>Gerencie os pedidos dos alunos</PageDescription>
          <OrdersFilterBar />
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-[200px]" />
        ) : isError ? (
          <ErrorMessage message="Não foi possível carregar os pedidos" />
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum pedido encontrado hoje.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default OrdersPageClient;
