"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DeleteUser } from "../actions";


interface idWardProps {
  name: string;
  idUser: string;
}

export default function DeleteModalUser({name, idUser}: idWardProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await DeleteUser(id);
      router.refresh();
    } catch (error) {
      console.error(error || "Error inesperado");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deletar {name}</DialogTitle>
          <DialogDescription className="text-sm">
            Tem a certeza de que deseja deletar esse usuário? Isso irá apagar
            todos os registros associados a ele.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDelete(idUser)}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}