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
import { GetStake } from "./actions";

export default async function Stake() {
  const stakes = await GetStake();

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Estacas" />
      </div>
      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estaca</TableHead>
                <TableHead>Alas</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stakes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhuma Ala cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                stakes.map((stake) => (
                  <TableRow className="" key={stake.id}>
                    <TableCell className="font-medium py-4">
                      {stake.name}
                    </TableCell>
                    <TableCell>{stake.ward?.length}</TableCell>
                    <TableCell>deletar</TableCell>
                    <TableCell>editar</TableCell>
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
