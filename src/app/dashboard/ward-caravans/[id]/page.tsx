import { Card, CardContent } from "@/components/ui/card";
import Header from "../../_components/header";
import MemberCaravans from "./_components/MemberCaravans";
import UserLoggedIn from "../../_components/UserloggedIn/UserloggedIn";
import AuthEdit from "./_components/authEdit";
import ExportExcel from "./_components/exportExcel";
import { WardTableUser } from "./_components/wardTableUser";

interface CaravanPageProps {
  params: {
    id: string;
  };
}

export default async function CaravansPage({ params }: CaravanPageProps) {
  const { id } = await params;
  const { ward } = await UserLoggedIn();

  const { authEdit, caravansMember } = await AuthEdit(id);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title={caravansMember?.name as string} />

        <div className="flex gap-2">
          {authEdit ? <ExportExcel caravansMember={caravansMember} /> : null}
          {!caravansMember?.active && ward?.id === caravansMember?.wardId ? (
            <MemberCaravans id={id as string} />
          ) : (
            caravansMember?.active && <MemberCaravans id={id as string} />
          )}
        </div>
      </div>

      <Card>
        <CardContent className="py-4">
          <WardTableUser
            data={
              caravansMember?.Member.map((member) => ({
                ...member,
                name: member.name ?? "",
                cpf: member.cpf,
                ward: member.ward,
                pay: member.pay,
                caravansId: member.caravansId,
                id: member.id || "",
              })) || []
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
