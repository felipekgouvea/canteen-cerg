import { Button } from "@/app/_components/ui/button";
import { ChevronRight } from "lucide-react";
import ProductList from "./product-list";
import { db } from "@/lib/prisma";

interface ProductsCheapGoodProps {
  title: string;
}

const ProductsCheapGood = async ({ title }: ProductsCheapGoodProps) => {
const products = await db.product.findMany({
    where: {
      price: {
        gte: 1,
        lte: 7,
      },
    },
    orderBy: {
      price: "asc",
    },
    take: 8,
  });

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

export default ProductsCheapGood;
