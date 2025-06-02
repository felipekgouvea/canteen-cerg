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

const StudentsPage = () => {
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
          <h1>Alunos</h1>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default StudentsPage;
