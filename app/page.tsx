import Header from "./_components/header";
import Search from "./_components/search";
import BannerPromo from "./_components/banner-promo";
import ProductsRecommended from "./_components/products-recommended";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <Header />
      <Search />
      <div className="mx-5">
        <BannerPromo
          src="/promo-banner-03.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>
      <div className="px-5">
        <ProductsRecommended title="Opções boas e baratas" />
      </div>

      <BannerPromo
        src="/promo-banner-02.png"
        alt="Os melhores lanches para seu filho(a)!"
      />

      {/* <div className="px-5">
        <ProductsRecommended title="Produtos Recomendados" />
      </div> */}
    </div>
  );
};

export default HomePage;
