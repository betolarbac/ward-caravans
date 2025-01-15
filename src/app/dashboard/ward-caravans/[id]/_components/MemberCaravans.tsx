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
import { Input } from "@/components/ui/input";
import { CaravansMemberProps, CaravansMemberSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GetCaravansPage, UpsertCaravansMember } from "../action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";

interface CaravansId {
  id: string;
}

export default function MemberCaravans({ id }: CaravansId) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [caravansId, SetCaravansId] = useState("");
  const router = useRouter();

  const form = useForm<CaravansMemberProps>({
    resolver: zodResolver(CaravansMemberSchema),
    defaultValues: {
      name: "",
      ward: "",
      cpf: "",
      pay: false,
      caravansId: caravansId,
    },
  });

  useEffect(() => {
    async function fetchCaravansId() {
      try {
        const caravansId = await GetCaravansPage(id);
        if (caravansId) {
          SetCaravansId(caravansId?.id);
        }

        form.reset({
          ...form.getValues(),
          caravansId: caravansId?.id,
        });
      } catch (error) {
        console.log("erro ao buscar caravans", error);
      }
    }

    fetchCaravansId();
  }, [id]);

  async function onSubmit(data: CaravansMemberProps) {
    setLoading(true);
    try {
      await UpsertCaravansMember(data);
      router.refresh();
      form.reset();
    } catch (error) {
      console.error(error || "Error inesperado");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#167b9c] hover:bg-[#0f5b7c] transition-colors duration-300 ease-in-out">Adicionar Novo Membro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Membro da caravana</DialogTitle>
          <DialogDescription>
            Faça o cadastro de uma novo membro para essa caravana
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ala</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pay"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel>Caravana Paga ?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
