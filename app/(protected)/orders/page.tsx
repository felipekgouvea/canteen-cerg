import { Suspense } from "react";
import OrdersPageClient from "./_components/order-page-client";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Carregando pedidos...</div>}>
      <OrdersPageClient />
    </Suspense>
  );
}
