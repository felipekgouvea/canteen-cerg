import {
  PageActions,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import { PageDescription } from "@/app/_components/ui/page-container";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Produtos</PageTitle>
          <PageDescription>Gerencie os produtos</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Novo Produto</Button>
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
