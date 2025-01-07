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
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Ward() {
  const ward = await getWards();

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
              {ward.map((ward) => (
                <TableRow className="" key={ward.id}>
                  <TableCell className="font-medium py-4">
                    {ward.name}
                  </TableCell>
                  <TableCell>Estaca 1</TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
