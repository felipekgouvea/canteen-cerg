import { updateOrderStatus } from "@/app/_actions/update-order-status";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const orderId = parseInt(formData.get("orderId") as string);

  if (!orderId) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await updateOrderStatus(orderId);

    const referer = req.headers.get("referer") || "/";
    const url = new URL("/orders", referer);

    return NextResponse.redirect(url);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 },
    );
  }
}
