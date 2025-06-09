import { getFirstName } from "@/helpers/firts-name";
import { authOptions } from "@/lib/auth";

import { formatDateBRWithTime } from "@/helpers/format-date-br";
import ProductsCheapGood from "@/app/_components/products-cheap-good";
import ProductsHome from "@/app/_components/products-home";
import ProductsMoreOrders from "@/app/_components/products-more-orders";
import SkeletonProductList from "@/app/_components/skeleton-product-list";
import { Suspense } from "react";
import BannerPromo from "@/app/_components/banner-promo";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import { getServerSession } from "next-auth/next";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const dataAtual = new Date();

  const firstName = session?.user?.name
    ? getFirstName(session.user.name)
    : "Visitante";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Conteúdo principal da página */}
      <main className="flex-1 space-y-8">
        <Header />

        <div className="mx-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Olá {firstName}!</h2>
          <p className="text-sm font-semibold">
            {formatDateBRWithTime(dataAtual)}
          </p>
        </div>

        <Search />

        <div className="mx-5">
          <BannerPromo
            src="/promo-banner-03.png"
            alt="Até 30% de desconto em pizzas"
          />
        </div>

        <div className="px-5">
          <Suspense fallback={<SkeletonProductList />}>
            {userId ? (
              <ProductsCheapGood
                title="Mais pedidos por você"
                userId={userId}
              />
            ) : (
              <ProductsHome title="Salgados e Pizzas" />
            )}
          </Suspense>
        </div>

        <BannerPromo
          src="/promo-banner-02.png"
          alt="Os melhores lanches para seu filho(a)!"
        />

        <div className="px-5">
          <Suspense fallback={<SkeletonProductList />}>
            <ProductsMoreOrders title="Opções boas e baratas" />
          </Suspense>
        </div>
      </main>

      {/* Rodapé fixo na base do layout */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
