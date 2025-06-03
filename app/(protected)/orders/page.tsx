import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import { DataTable } from "../_components/data-table";
import { ordersColumns } from "./_data-table/ordersColumns";
import { db } from "@/lib/prisma";

const data = await db.order.findMany({
  include: {
    student: {
      select: {
        name: true,
        serie: {
          select: {
            name: true,
          },
        },
      },
    },
    user: {
      select: {
        name: true,
      },
    },
    restaurant: {
      select: {
        name: true,
      },
    },
    products: {
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

const OrdersPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pedidos</PageTitle>
          <PageDescription>Gerencie os pedidos dos alunos</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <DataTable columns={ordersColumns} data={data} />
      </PageContent>
    </PageContainer>
  );
};

export default OrdersPage;
