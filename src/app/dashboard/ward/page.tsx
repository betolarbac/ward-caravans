import Header from "../_components/header";
import { Card, CardContent } from "@/components/ui/card";
import ModalFormWard from "./_components/modalFormWard";
import { getWards } from "./action";
import UserLoggedIn from "../_components/UserloggedIn/UserloggedIn";
import { redirect } from "next/navigation";
import { WardTable } from "./_components/wardTable";

export default async function Ward() {
  const { Stake, role } = await UserLoggedIn();
  const ward = await getWards(undefined, Stake?.id);

  if (role === "ward") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Alas da Estaca" />

        <ModalFormWard />
      </div>
      <Card>
        <CardContent className="py-4">
          <WardTable
            data={ward.map((ward) => ({
              id: ward.id,
              name: ward.name ?? "",
              stakeId: ward.stake?.name ?? "",
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
