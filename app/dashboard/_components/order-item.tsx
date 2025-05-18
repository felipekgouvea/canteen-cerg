import { Button } from "@/app/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

interface OrderItemProps {
  studentImageURL: string;
  name: string;
  serie: string;
}

const OrderItem = ({ name, studentImageURL, serie }: OrderItemProps) => {
  return (
    <article className="flex items-center justify-between gap-2 border-b py-2">
      <div className="flex items-center justify-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={studentImageURL} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold sm:text-base">{name}</p>
          <span className="text-xs text-gray-400 sm:text-sm">{serie}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight width={15} height={15} />
      </Button>
    </article>
  );
};

export default OrderItem;
