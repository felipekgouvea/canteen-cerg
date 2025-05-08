"use client";

import { Button } from "@/app/_components/ui/button";
import type { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyOrdersButton from "@/app/_components/my-orders-button";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[250px] w-full">
      <Button
        onClick={handleBackClick}
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <MyOrdersButton />
    </div>
  );
};

export default RestaurantHeader;
