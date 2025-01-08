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
import { wardData, wardSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertWards } from "../action";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function ModalFormWard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<wardData>({
    resolver: zodResolver(wardSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: wardData) {
    setLoading(true);
    try {
      await upsertWards(data);
    } catch (error) {
      console.error(error || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar nova ala</Button>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-20">
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
