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
import RegisterCaravans from "./_components/RegisterCaravans";
import CaravansDelete from "./_components/DeleteCaravans";
import EditCaravans from "./_components/EditCaravans";
import FilterCaravans from "./_components/filterCaravans";

export default async function WardCaravans() {
  const filterCaravans = await FilterCaravans();

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
                <TableHead>Valor</TableHead>
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
                    <TableCell>R$ {caravans.value?.toFixed(2)}</TableCell>
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
                        value={
                          typeof caravans.value === "number"
                            ? caravans.value
                            : 0
                        }
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
