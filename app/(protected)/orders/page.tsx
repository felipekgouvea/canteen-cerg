import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import OrderCard from "./_components/order-card";
// import { DataTable } from "../_components/data-table";
// import { ordersColumns } from "./_data-table/ordersColumns";
import { db } from "@/lib/prisma";

// const data = await db.order.findMany({
//   include: {
//     student: {
//       select: {
//         name: true,
//         serie: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     },
//     user: {
//       select: {
//         name: true,
//       },
//     },
//     restaurant: {
//       select: {
//         name: true,
//       },
//     },
//     products: {
//       include: {
//         product: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     },
//   },
//   orderBy: {
//     createdAt: "desc",
//   },
// });

const orders = await db.order.findMany({
  include: {
    user: {
      select: {
        name: true, // <- só use se tiver certeza de que nunca será null
        image: true,
      },
    },
    student: {
      select: {
        name: true,
        imageURL: true,
        serie: {
          select: {
            name: true,
          },
        },
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
        {/* <DataTable columns={ordersColumns} data={data} /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default OrdersPage;
