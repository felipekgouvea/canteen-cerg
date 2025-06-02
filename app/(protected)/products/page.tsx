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
import AddProductDialog from "./_components/add-product-dialog";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { db } from "@/lib/prisma";
const ProductsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/authentication");
  }

  const data = await db.product.findMany({
    include: {
      menuCategory: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Produtos</PageTitle>
          <PageDescription>Gerencie os produtos</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddProductDialog />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div>
          <DataTable columns={columns} data={data} pageSize={4} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default ProductsPage;
