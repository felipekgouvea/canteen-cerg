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
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
  studentId: z.number(),
  userId: z.string(),
  restaurantId: z.string(),
  user: z.object({
    name: z.string().nullable(),
    image: z.string().nullable(),
  }),
  student: z.object({
    name: z.string(),
    imageURL: z.string(),
    serie: z.object({
      name: z.string(),
    }),
  }),
  products: z.array(
    z.object({
      product: z.object({
        name: z.string(),
      }),
    }),
  ),
});

export const ordersSchema = z.array(orderSchema);

export type Order = z.infer<typeof orderSchema>;
