import { ScrollTextIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const MyOrdersButton = () => {
  return (
    <Link href="/my-orders">
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </Link>
  );
};

export default MyOrdersButton;
