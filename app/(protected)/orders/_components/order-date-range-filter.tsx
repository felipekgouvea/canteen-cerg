// app/_components/orders/date-range-filter.tsx
"use client";

import { CalendarIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Calendar } from "@/app/_components/ui/calendar";

export function DateRangeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromParam = searchParams.get("startDate");
  const toParam = searchParams.get("endDate");

  const date = useMemo(() => {
    return {
      from: fromParam ? parseISO(fromParam) : undefined,
      to: toParam ? parseISO(toParam) : undefined,
    };
  }, [fromParam, toParam]);

  const updateQuery = useCallback(
    (from?: Date, to?: Date) => {
      const params = new URLSearchParams(searchParams);

      if (from) {
        params.set("startDate", format(from, "yyyy-MM-dd"));
      } else {
        params.delete("startDate");
      }

      if (to) {
        params.set("endDate", format(to, "yyyy-MM-dd"));
      } else {
        params.delete("endDate");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-auto justify-start gap-2 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-200"
        >
          <CalendarIcon className="h-4 w-4 text-red-600" />
          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy", { locale: ptBR })}
                <span className="mx-1 text-gray-500">→</span>
                {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy", { locale: ptBR })
            )
          ) : (
            <span className="text-gray-400">Selecione o período</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          numberOfMonths={2}
          locale={ptBR}
          selected={date}
          onSelect={(range) => updateQuery(range?.from, range?.to)}
        />
      </PopoverContent>
    </Popover>
  );
}
