import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageActions,
} from "@/app/_components/ui/page-container";
import { Button } from "@/app/_components/ui/button";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { DataTable } from "../_components/data-table";
import { studentsColumns } from "./_data-table/studentsColumns";

const StudentsPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/authentication");
  }

  const data = await db.student.findMany({
    include: {
      serie: {
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
          <PageTitle>Alunos</PageTitle>
          <PageDescription>Gerencie os alunos</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Novo Aluno</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <div>
          <DataTable columns={studentsColumns} data={data} pageSize={4} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default StudentsPage;
