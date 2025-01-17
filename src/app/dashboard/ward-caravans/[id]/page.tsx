import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Header from "../../_components/header";
import MemberCaravans from "./_components/MemberCaravans";
import formatCPF from "./_components/formatCpf";
import CaravansMemberDelete from "./_components/deleteMemberCaravans";
import EditMemberCaravans from "./_components/EditMemberCaravans";
import UserLoggedIn from "../../_components/UserloggedIn/UserloggedIn";
import AuthEdit from "./_components/authEdit";
import ExportExcel from "./_components/exportExcel";

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ala</TableHead>
                <TableHead>Cpf</TableHead>
                <TableHead>Pagou</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caravansMember?.Member.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum membro Cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                caravansMember?.Member.map((caravans) => (
                  <TableRow key={caravans.id}>
                    <TableCell className="font-medium py-4">
                      {caravans.name}
                    </TableCell>
                    <TableCell>{caravans.ward}</TableCell>
                    <TableCell>{formatCPF(caravans.cpf)}</TableCell>
                    <TableCell>
                      {caravans.pay === true ? (
                        <span className="text-green-500">Pago</span>
                      ) : (
                        <span className="text-red-500">Não</span>
                      )}
                    </TableCell>
                    {authEdit ? (
                      <>
                        <TableCell>
                          <CaravansMemberDelete
                            idMemberCaravans={caravans.id}
                            name={caravans.name || ""}
                          />
                        </TableCell>
                        <TableCell>
                          <EditMemberCaravans
                            id={caravans.id}
                            caravansId={id}
                            name={caravans.name ?? ""}
                            ward={caravans.ward}
                            cpf={caravans.cpf}
                            pay={caravans.pay}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
