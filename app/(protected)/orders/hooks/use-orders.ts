// hooks/use-orders.ts
import useSWR from "swr";
import { ordersSchema, type Order } from "@/lib/schemas/order";

const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);
  const data = await response.json();

  try {
    const parsed = ordersSchema.parse(data);
    console.log("✅ Dados validados com sucesso:", parsed.length);
    return parsed;
  } catch (err) {
    console.error("❌ Erro ao validar com Zod:", err);
    console.log("📦 Dados recebidos:", data);
    return [];
  }
};

export const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/orders", fetcher, {
    refreshInterval: 10000, // Atualiza a cada 10 segundos
    revalidateOnFocus: false,
  });

  return {
    orders: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
};
