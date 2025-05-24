import BannerPromo from "./_components/banner-promo";
import Footer from "./_components/footer";
import Header from "./_components/header";
import ProductsCheapGood from "./_components/products-cheap-good";
import ProductsMoreOrders from "./_components/products-more-orders";
import Search from "./_components/search";

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
        <ProductsMoreOrders title="Produtos mais pedidos por você" />
      </div>
     
      <BannerPromo
        src="/promo-banner-02.png"
        alt="Os melhores lanches para seu filho(a)!"
      />

      <div className="px-5">
        <ProductsCheapGood title="Opções boas e baratas" />
      </div>

      <Footer/>
       
    </div>
  );
};

export default HomePage;
