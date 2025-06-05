// lib/schemas/order.ts
import { z } from "zod";

export const orderSchema = z.object({
  id: z.number(),
  total: z.number(),
  status: z.enum([
    "PENDING",
    "IN_PREPARATION",
    "PAYMENT_CONFIRMED",
    "PAYMENT_FAILED",
    "FINISHED",
    "CANCELLED",
  ]),
  user: z.object({
    name: z.string().nullable(),
  }),
  createdAt: z.string().transform((val) => new Date(val)),
  student: z.object({
    name: z.string(),
    imageURL: z.string(),
    serie: z.object({
      name: z.string(),
    }),
  }),
  orderProducts: z.array(
    z.object({
      quantity: z.number(),
      product: z.object({
        name: z.string(),
        id: z.number(),
      }),
    }),
  ),
});

export const ordersSchema = z.array(orderSchema);

export type Order = z.infer<typeof orderSchema>;
