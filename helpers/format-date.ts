export function formatDateTimeBR(date: string | Date): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const dateFormatted = parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatted = parsedDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormatted} às ${timeFormatted}`;
}
