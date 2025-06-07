export function formatDateBR(date: Date = new Date()): string {
  const utcDay = date.getUTCDate();
  const utcMonth = date.getUTCMonth() + 1; // mês começa do zero
  const utcYear = date.getUTCFullYear();

  const day = String(utcDay).padStart(2, "0");
  const month = String(utcMonth).padStart(2, "0");

  return `${day}/${month}/${utcYear}`;
}
