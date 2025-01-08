import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Trash2, Pencil } from "lucide-react";
import Header from "../_components/header";
import RegisterForm from "./_components/RegisterForm";

export default function User() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Membros da Ala" />
        <RegisterForm />
      </div>
      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ala</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="">
                <TableCell className="font-medium py-4">
                  Roberto Cabral
                </TableCell>
                <TableCell>Ala antares</TableCell>
                <TableCell>Super Admin</TableCell>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
