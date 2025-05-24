"use client";

import { useSession } from "next-auth/react";

import BannerPromo from "./_components/banner-promo";
import Footer from "./_components/footer";
import Header from "./_components/header";
import ProductsCheapGood from "./_components/products-cheap-good";
import ProductsHome from "./_components/products-home";
import ProductsMoreOrders from "./_components/products-more-orders";
import Search from "./_components/search";

const HomePage = () => {
  const { data } = useSession();
  const userId = data?.user?.id;

  return (
    <div className="h-screen space-y-8">
      <Header />
      <Search />

      <div className="mx-5">
        <BannerPromo
          src="/promo-banner-03.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>

      <div className="px-5">
        {/* Renderiza apenas se `userId` estiver disponível */}
        {userId ? (
          <ProductsCheapGood title="Mais pedidos por você" userId={userId} />
        ) : (
          <ProductsHome title="Salgados e Pizzas" />
        )}
      </div>

      <BannerPromo
        src="/promo-banner-02.png"
        alt="Os melhores lanches para seu filho(a)!"
      />

      <div className="px-5">
        <ProductsMoreOrders title="Opções boas e baratas" />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
