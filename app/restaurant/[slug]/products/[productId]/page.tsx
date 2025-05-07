import { getProductById } from "@/data/get-product-by-id";
import { notFound } from "next/navigation";
import ProductHeader from "../_components/product-header";
import ProductDetails from "../_components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return notFound;
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
