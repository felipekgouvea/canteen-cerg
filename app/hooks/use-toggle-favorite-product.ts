import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { UserFavoriteProduct } from "@prisma/client";
import { toggleFavoriteProduct } from "../_actions/products";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteProducts?: UserFavoriteProduct[];
  productId: string;
  productIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  productId,
  productIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteProduct(userId, productId);

      toast(
        productIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Erro ao favoritar restaurante.");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
