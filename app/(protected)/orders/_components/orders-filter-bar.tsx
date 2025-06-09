"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { DateRangeFilter } from "./order-date-range-filter";

const statusOptions = [
  { value: "ALL", label: "Todos os Status" },
  { value: "PENDING", label: "Pendente" },
  { value: "PAYMENT_CONFIRMED", label: "Pagamento confirmado" },
  { value: "IN_PREPARATION", label: "Em preparação" },
  { value: "FINISHED", label: "Entregue" },
  { value: "CANCELLED", label: "Cancelado" },
  { value: "PAYMENT_FAILED", label: "Pagamento falhou" },
];

const serieOptions = [
  { value: "ALL", label: "Todas as Turmas" },
  { value: "MATERNAL", label: "Maternal" },
  { value: "PRE_I", label: "Pré I" },
  { value: "PRE_II", label: "Pré II" },
  { value: "PRIMEIRO_ANO", label: "1º ANO" },
  { value: "SEGUNDO_ANO", label: "2º ANO" },
  { value: "TERCEIRO_ANO", label: "3º ANO" },
  { value: "QUARTO_ANO", label: "4º ANO" },
  { value: "QUINTO_ANO", label: "5º ANO" },
];

export function OrdersFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value === "ALL") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const selectedStatus = searchParams.get("status") ?? "ALL";
  const selectedSerie = searchParams.get("serie") ?? "ALL";

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        {/* Status Filter */}
        <Select
          value={selectedStatus}
          onValueChange={(value) => updateQuery("status", value)}
        >
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto rounded-md border bg-white">
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Serie Filter */}
        <Select
          value={selectedSerie}
          onValueChange={(value) => updateQuery("serie", value)}
        >
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Filtrar por série" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto rounded-md border bg-white">
            {serieOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DateRangeFilter />
    </div>
  );
}
