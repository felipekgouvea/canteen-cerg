export function formatDateBR(date = new Date()) {
  const d = date;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // mês começa do zero
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
