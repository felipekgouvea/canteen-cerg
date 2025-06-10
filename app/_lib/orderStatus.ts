import { OrderStatus } from "@prisma/client";

export const getNextOrderStatus = (status: OrderStatus): OrderStatus | null => {
  switch (status) {
    case "PENDING":
      return "PAYMENT_CONFIRMED";
    case "PAYMENT_CONFIRMED":
      return "IN_PREPARATION";
    case "IN_PREPARATION":
      return "FINISHED";
    default:
      return null;
  }
};
