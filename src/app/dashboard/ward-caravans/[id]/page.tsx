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
import { GetCaravansPage } from "./action";
import MemberCaravans from "./_components/MemberCaravans";

interface CaravanPageProps {
  params: {
    id: string;
  };
}

export default async function CaravansPage({ params }: CaravanPageProps) {
  const { id } = await params;

  const caravansMember = await GetCaravansPage(id);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title={caravansMember?.name as string} />
        <MemberCaravans id={id as string} />
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
                  <TableCell>{caravans.cpf}</TableCell>
                  <TableCell>{caravans.pay.toString()}</TableCell>
                  <TableCell>Deletar</TableCell>
                  <TableCell>Editar</TableCell>
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
