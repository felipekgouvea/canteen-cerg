// hooks/use-orders.ts
import useSWR from "swr";
import { ordersSchema, type Order } from "@/lib/schemas/order";

const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return ordersSchema.parse(data);
};

export const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/orders", fetcher, {
    refreshInterval: 3000, // Atualiza a cada 3 segundos
  });

  return {
    orders: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
};
