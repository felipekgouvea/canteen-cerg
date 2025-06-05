import { getFirstName } from "@/helpers/firts-name";
import { formatDateBR } from "@/helpers/format-date-br";

import BannerPromo from "./_components/banner-promo";
import Footer from "./_components/footer";
import Header from "./_components/header";
import ProductsCheapGood from "./_components/products-cheap-good";
import ProductsHome from "./_components/products-home";
import ProductsMoreOrders from "./_components/products-more-orders";
import Search from "./_components/search";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const dataAtual = new Date();

  const firstName = session?.user?.name
    ? getFirstName(session.user.name)
    : "Visitante";

  return (
    <div className="h-screen space-y-8">
      <Header />

      <div className="mx-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Olá {firstName}!</h2>
        <p className="text-sm font-semibold">{formatDateBR(dataAtual)}</p>
      </div>

      <Search />

      <div className="mx-5">
        <BannerPromo
          src="/promo-banner-03.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>

      <div className="px-5">
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

      <Footer />
    </div>
  );
};

export default HomePage;
