import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { notFound } from "next/navigation";

import RestaurantHeader from "./_components/header";
import RestaurantCategories from "./_components/restaurant-categories";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantMenuPage = async ({ params }: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound;
  }

  return (
    <div className="h-screen">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
