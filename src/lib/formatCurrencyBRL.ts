export function formatCurrencyBRL(value: string) {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, "");

  // Converte para número e divide por 100
  const amount = Number(digits) / 100;

  // Retorna formatado como BRL (R$ 0,00)
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(amount);
}
