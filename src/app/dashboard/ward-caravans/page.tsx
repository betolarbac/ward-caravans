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


export default async function WardCaravans() {

  const caravansWard = await getWardCaravans()

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {caravansWard.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhuma caravana cadastrada.
                  </TableCell>
                </TableRow>
              ): (

                caravansWard.map((caravans) => (
                  <TableRow key={caravans.id}>
                    <TableCell className="font-medium py-4">
                      <Link href={`/dashboard/ward-caravans/${caravans.id}`}>{caravans.name}</Link>
                    </TableCell>
                    <TableCell>{caravans.ward?.name}</TableCell>
                    <TableCell>
                      {caravans.date?.toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{caravans.Member.length}/{caravans.vacancy}</TableCell>
                    <TableCell>{caravans.active.toString()}</TableCell>
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
