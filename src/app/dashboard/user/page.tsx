import { Card, CardContent } from "@/components/ui/card";
import Header from "../_components/header";
import RegisterForm from "./_components/RegisterForm";
import { GetUser } from "./actions";
import UserLoggedIn from "../_components/UserloggedIn/UserloggedIn";
import { redirect } from "next/navigation";
import { UserTable } from "./_components/UserTable";

export default async function User() {
  const { Stake, role } = await UserLoggedIn();
  const users = await GetUser(Stake?.id);

  if (role === "ward") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Membros da Estaca" />
        <RegisterForm />
      </div>
      <Card>
        <CardContent className="py-4">
          <UserTable
            data={users.map((user) => ({
              id: user.id,
              name: user.name ?? undefined,
              email: user.email,
              stakeId: user.Stake?.name ?? "",
              wardId: user.ward?.id ?? "",
              role: user.role,
              password: "",
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
