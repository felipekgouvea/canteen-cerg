export function formatDateBRWithTime(date: Date = new Date()): string {
  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );

  const day = String(localDate.getDate()).padStart(2, "0");
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const year = localDate.getFullYear();

  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
