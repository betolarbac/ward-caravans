"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import formatCPF from "./formatCpf";
import { FileSpreadsheet } from "lucide-react";

type CaravansMember = {
  Member: {
    name: string | null;
    ward: string;
    cpf: string;
    pay: boolean;
    id: string;
    caravansId: string;
  }[];
  name: string | null;
  value: number | null;
  active: boolean;
} | null;

interface ExportExcelProps {
  caravansMember: CaravansMember;
}

export default function ExportExcel({ caravansMember }: ExportExcelProps) {
  const exportExcel = () => {
    if (
      !caravansMember ||
      !caravansMember.Member ||
      caravansMember.Member.length === 0
    ) {
      alert("Nenhum membro Cadastrado.");
      return;
    }

    const data = caravansMember.Member.map((member) => ({
      Nome: member.name || "Desconhecido",
      Ala: member.ward,
      CPF: formatCPF(member.cpf),
      Pagou: member.pay ? "Sim" : "Não",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 20 }, { wch: 10 }];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Membros");

    XLSX.writeFile(workbook, `${caravansMember.name || "Caravans"}.xlsx`);
  };

  return <Button onClick={exportExcel} disabled={caravansMember?.Member.length === 0}> <FileSpreadsheet /> Exporta para Excel</Button>;
}
