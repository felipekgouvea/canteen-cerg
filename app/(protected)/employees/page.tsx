import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/app/_components/ui/page-container";
import { Button } from "@/components/ui/button";

const EmployeesPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Funcionários</PageTitle>
          <PageDescription>Gerencie os funcionários</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Novo Funcionário</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <div>
          <h1>Funcionários</h1>
        </div>
      </PageContent>
    </PageContainer>
  );
};
export default EmployeesPage;
