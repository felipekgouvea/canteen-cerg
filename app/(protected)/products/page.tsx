import {
  PageActions,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import { PageDescription } from "@/app/_components/ui/page-container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddProductProduct from "./_components/add-product-product";

const ProductsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Produtos</PageTitle>
          <PageDescription>Gerencie os produtos</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddProductProduct />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div>
          <h1>Produtos</h1>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default ProductsPage;
