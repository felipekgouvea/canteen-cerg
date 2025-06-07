"use client";

import useSWR from "swr";
import { ordersSchema, type Order } from "@/lib/schemas/order";
import { useSearchParams } from "next/navigation";

const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return ordersSchema.parse(data);
};

export const useOrders = () => {
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const serie = searchParams.get("serie");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const query = new URLSearchParams();

  if (status && status !== "ALL") query.set("status", status);
  if (serie && serie !== "ALL") query.set("serie", serie);
  if (startDate) query.set("startDate", startDate);
  if (endDate) query.set("endDate", endDate);

  const url = `/api/orders?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
  });

  return {
    orders: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
};
