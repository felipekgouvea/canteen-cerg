"use client";

import { Button } from "@/app/_components/ui/button";
import type { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import logoAvatar from "@/public/logo-avatar.png";
import CartBanner from "./cart-banner";
import { CartContext } from "@/app/contexts/cart";
import ProductsDetails from "@/app/restaurant/[slug]/products/_components/products-details";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
  const handleCategorieClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVarient = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  const [restaurantIsOpen] = useState(true);

  const { products } = useContext(CartContext);

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-4">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={logoAvatar}
              alt={restaurant.name}
              height={45}
              width={45}
            />
            <div>
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
          </div>
          <div
            className={`mt-3 flex items-center gap-1 text-xs font-semibold ${restaurantIsOpen ? "text-green-500" : "text-red-500"}`}
          >
            <ClockIcon size={12} />
            <p>{restaurantIsOpen ? "Aberto" : "Fechado"}</p>
          </div>
        </div>
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0">
          <div className="flex w-max space-x-4 pt-0">
            {restaurant.menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={getCategoryButtonVarient(category)}
                size="sm"
                className="rounded-full"
                onClick={() => handleCategorieClick(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <h3 className="pt-5 font-semibold">{selectedCategory.name}</h3>
      {restaurantIsOpen ? (
        <ProductsDetails products={selectedCategory.products} />
      ) : (
        <div className="flex h-auto w-full flex-col items-center justify-center space-y-4 p-6">
          <span className="text-center text-sm">
            A cantina está fechada para pedidos no momento!
          </span>
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Horário para realizar os pedidos</p>
            <p className="font-bold">Segunda à Sexta</p>
            <p className="font-bold">08:00 às 13:00 horas</p>
          </div>
        </div>
      )}
      {products.length > 0 && <CartBanner />}
    </div>
  );
};

export default RestaurantCategories;
