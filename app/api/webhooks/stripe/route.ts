import { db } from "@/lib/prisma";
// import { buffer } from "micro";
import Stripe from "stripe";
import { NextResponse } from "next/server";

// Inicializa o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Desativa o bodyParser do Next para usar o raw body do Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = Buffer.from(await req.arrayBuffer()); // conversão necessária
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    return new NextResponse("Webhook inválido", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  // 🎯 Verifica o tipo do evento e atualiza o status
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await db.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "PAYMENT_CONFIRMED" },
      });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await db.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "PAYMENT_FAILED" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
