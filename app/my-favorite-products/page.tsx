import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/app/_lib/auth";
import ProductItem from "../_components/product-item";
import Header from "../_components/header";
import { db } from "@/app/_lib/prisma";
import { Session } from "next-auth";

const MyFavoritePage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteProducts = await db.userFavoriteProduct.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteProducts.length > 0 ? (
            userFavoriteProducts.map(({ product }) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoritePage;
