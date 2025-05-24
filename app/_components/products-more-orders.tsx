import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import ProductList from "./product-list";
import { getTop10MostOrderedProductsByUser } from "../_actions/get-Top10-Most-Ordered-Products-By-User";

interface ProductsMoreOrdersProps {
  title: string;
}

const ProductsMoreOrders = async ({title}:ProductsMoreOrdersProps) => {

    const products = await getTop10MostOrderedProductsByUser('cma1k0prw0000hf2wo7o0m8cc')

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <Button className="text-[#EA1D2C]" size="sm" variant="link">
          Ver todos
          <ChevronRight />
        </Button>
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0">
        <ProductList products={products}/>
      </div>
    </>
  );
};

 
export default ProductsMoreOrders;