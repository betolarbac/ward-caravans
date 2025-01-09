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
import { GetUser } from "./actions";

export default async function User() {
  const users = await GetUser();


  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title={`Membros da ${users[0].ward?.name}`} />
        <RegisterForm />
      </div>
      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ala</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow className="" key={user.id}>
                  <TableCell className="font-medium py-4">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.ward?.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
