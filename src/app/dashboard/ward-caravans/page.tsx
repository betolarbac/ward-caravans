import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Header from "../_components/header";
import Link from "next/link";
import { getWardCaravans } from "./actions";
import RegisterCaravans from "./_components/RegisterCaravans";

import CaravansDelete from "./_components/DeleteCaravans";
import EditCaravans from "./_components/EditCaravans";
import UserLoggedIn from "../_components/UserloggedIn/UserloggedIn";

export default async function WardCaravans() {
  const caravansWard = await getWardCaravans();
  const users = await UserLoggedIn();

  const filterCaravans =
    users.role === "admin"
      ? caravansWard.filter(
          (caravan) => caravan.ward?.id === users?.ward?.id
        )
      : caravansWard;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Caravanas da Ala" />
        <RegisterCaravans />
      </div>

      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caravana</TableHead>
                <TableHead>Ala</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Vagas</TableHead>
                <TableHead>Ativar/Desativar</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterCaravans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhuma caravana cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                filterCaravans.map((caravans) => (
                  <TableRow key={caravans.id}>
                    <TableCell className="font-medium py-4">
                      <Link href={`/dashboard/ward-caravans/${caravans.id}`}>
                        {caravans.name}
                      </Link>
                    </TableCell>
                    <TableCell>{caravans.ward?.name}</TableCell>
                    <TableCell>
                      {caravans.date?.toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      {caravans.Member.length}/{caravans.vacancy}
                    </TableCell>
                    <TableCell>
                      {caravans.active === true ? "Ativa" : "Desativada"}
                    </TableCell>
                    <TableCell>
                      <CaravansDelete
                        idCaravans={caravans.id}
                        name={caravans.name ?? ""}
                      />
                    </TableCell>
                    <TableCell>
                      <EditCaravans
                        name={caravans.name ?? ""}
                        date={caravans.date ?? new Date()}
                        vacancy={caravans.vacancy ?? 0}
                        active={caravans.active}
                        wardId={caravans.ward?.id ?? ""}
                        id={caravans.id}
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
