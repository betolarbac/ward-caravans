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
import { UpsertCaravansMember } from "../action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Loader, Pencil } from "lucide-react";


export default function EditMemberCaravans(memberCaravans: CaravansMemberProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CaravansMemberProps>({
    resolver: zodResolver(CaravansMemberSchema),
    defaultValues: {
      id:  memberCaravans.id,
      name: memberCaravans.name,
      ward: memberCaravans.ward,
      cpf: memberCaravans.cpf,
      pay: memberCaravans.pay,
      caravansId: memberCaravans.caravansId,
    },
  });


  async function onSubmit(data: CaravansMemberProps) {
    setLoading(true);
    try {
      await UpsertCaravansMember(data);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error || "Error inesperado");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  useEffect(()=> {
    form.reset({
      id:  memberCaravans.id,
      name: memberCaravans.name,
      ward: memberCaravans.ward,
      cpf: memberCaravans.cpf,
      pay: memberCaravans.pay,
      caravansId: memberCaravans.caravansId,
    })
  },[form, memberCaravans])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost"><Pencil className="w-4 h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Editar membro da caravana</DialogTitle>
          <DialogDescription>
            Edite as informações do membro da caravana
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
