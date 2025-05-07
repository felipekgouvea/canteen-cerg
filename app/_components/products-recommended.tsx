import { Button } from "@/app/_components/ui/button";
import { ChevronRight } from "lucide-react";
import ProductList from "./product-list";

interface ProductsRecommendedProps {
  title: string;
}

const ProductsRecommended = ({ title }: ProductsRecommendedProps) => {
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
        <ProductList />
      </div>
    </>
  );
};

export default ProductsRecommended;
