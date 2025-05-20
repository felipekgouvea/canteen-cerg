import { Button } from "@/app/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTimeBR } from "@/helpers/format-date";
import { ChevronRight } from "lucide-react";

interface OrderItemProps {
  studentImageURL: string;
  name: string;
  serie: string;
  dateOrder: Date;
}

const OrderItem = ({
  name,
  studentImageURL,
  serie,
  dateOrder,
}: OrderItemProps) => {
  return (
    <article className="flex items-center justify-between gap-2 border-b py-2">
      <div className="flex w-full items-center justify-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={studentImageURL} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <p className="text-sm font-semibold sm:text-base">{name}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 sm:text-sm">{serie}</span>
            <span className="text-xs font-bold text-gray-400 sm:text-sm">
              {formatDateTimeBR(dateOrder)}
            </span>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight width={15} height={15} />
      </Button>
    </article>
  );
};

export default OrderItem;
