import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
    </div>
  );
};

export default DashboardPage;
