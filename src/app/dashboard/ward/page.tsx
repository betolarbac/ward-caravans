import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "../_components/header";
import { Card, CardContent } from "@/components/ui/card";
import ModalFormWard from "./_components/modalFormWard";
import { getWards } from "./action";
import DeleteModalWard from "./_components/deleteModalWard";
import EditModalWard from "./_components/editModalWard";
import UserLoggedIn from "../_components/UserloggedIn/UserloggedIn";
import { redirect } from "next/navigation";

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ala</TableHead>
                <TableHead>Estaca</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ward.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhuma Ala cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                ward.map((ward) => (
                  <TableRow className="" key={ward.id}>
                    <TableCell className="font-medium py-4">
                      {ward.name}
                    </TableCell>
                    <TableCell>{ward.stake?.name}</TableCell>
                    <TableCell>
                      <DeleteModalWard
                        idWards={ward.id}
                        name={ward.name ?? ""}
                      />
                    </TableCell>
                    <TableCell>
                      <EditModalWard
                        name={ward.name ?? ""}
                        id={ward.id}
                        stakeId=""
                      />
                    </TableCell>
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
