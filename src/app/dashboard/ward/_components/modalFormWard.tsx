"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wardData, wardSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertWards } from "../action";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetStake } from "../../stake/actions";

interface stakeProps {
  id: string;
  name: string;
}

export default function ModalFormWard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [stake, setStake] = useState<stakeProps[]>([]);
  const router = useRouter();

  const form = useForm<wardData>({
    resolver: zodResolver(wardSchema),
    defaultValues: {
      name: "",
      stakeId: "",
    },
  });

  async function onSubmit(data: wardData) {
    setLoading(true);
    try {
      await upsertWards(data);

      router.refresh();
      form.reset();
    } catch (error) {
      console.error(error || "Error inesperado");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  useEffect(() => {
    async function GetStakeWard() {
      try {
        const stake = await GetStake();
        if (!stake) {
          throw new Error("GetStake returned null");
        }
        setStake(stake);
        return stake;
      } catch (error) {
        console.error(error || "Erro inesperado");
        return [];
      }
    }

    GetStakeWard();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#167b9c] hover:bg-[#0f5b7c] transition-colors duration-300 ease-in-out">Adicionar nova ala</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Nova Ala</DialogTitle>
          <DialogDescription>
            Faça o cadastro de uma nova ala da sua estaca
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-xs flex-1"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stakeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ala</FormLabel>
                    <Select onValueChange={field.onChange} required>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a função do usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stake.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-20 bg-[#167b9c] hover:bg-[#0f5b7c] transition-colors duration-300 ease-in-out">
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
