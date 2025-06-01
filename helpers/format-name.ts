export function formatName(nomeCompleto: string): string {
  if (!nomeCompleto) return "";

  const partes = nomeCompleto.trim().split(" ");

  if (partes.length === 0) return "";

  const primeiraLetraMaiuscula = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const primeiroNome = primeiraLetraMaiuscula(partes[0]);
  const sobrenome =
    partes.length > 1 ? primeiraLetraMaiuscula(partes[partes.length - 1]) : "";

  return `${primeiroNome} ${sobrenome}`.trim();
}
