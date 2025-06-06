export async function updateOrderStatus(orderId: number, status: string) {
  const response = await fetch(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar status do pedido");
  }

  return response.json();
}
