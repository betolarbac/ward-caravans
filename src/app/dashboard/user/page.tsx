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
import RegisterForm from "./_components/RegisterForm";
import { GetUser } from "./actions";
import DeleteModalUser from "./_components/DeleteModalUser";
import EditModalUser from "./_components/EditModalUser";

export default async function User() {
  const users = await GetUser();

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title={`Membros da ${users[0]?.ward?.name || "Ala"}`} />
        <RegisterForm />
      </div>
      <Card>
        <CardContent className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estaca</TableHead>
                <TableHead>Ala</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Deletar</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum membro Cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow className="" key={user.id}>
                    <TableCell className="font-medium py-4">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.Stake?.name}</TableCell>
                    <TableCell>{user.ward?.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                     <DeleteModalUser idUser={user.id} name={user.name ?? ""} />
                    </TableCell>
                    <TableCell>
                    <EditModalUser name={user.name ?? ""} email={user.email} role={user.role} password="" wardId="" stakeId="" />
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
