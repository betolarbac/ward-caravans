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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaravansWardSchema, CaravansWardProps } from "@/lib/validators";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { upsertWardCaravans } from "../actions";
import { useRouter } from "next/navigation";
import { getWards } from "../../ward/action";

interface ward {
  id: string;
  name: string;
}

export default function EditCaravans(caravans: CaravansWardProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [ward, setWards] = useState<ward[]>([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CaravansWardSchema),
    defaultValues: {
      id: caravans.id,
      name: caravans.name,
      date: caravans.date,
      vacancy: caravans.vacancy,
      active: caravans.active,
      wardId: caravans.wardId,
    },
  });

  async function onSubmit(data: CaravansWardProps) {
    setLoading(true);

    try {
      await upsertWardCaravans(data);
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
    form.reset({
      id: caravans.id,
      name: caravans.name,
      date: caravans.date,
      vacancy: caravans.vacancy,
      active: caravans.active,
      wardId: caravans.wardId,
    });

    async function fetchWard() {
      const ward = await getWards(caravans.wardId);

      setWards(ward as ward[]);
    }

    fetchWard();
  }, [form, caravans]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="w-4 h-4" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Caravana</DialogTitle>
          <DialogDescription>
            Faça o cadastro de uma nova Caravana
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
                name="vacancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vagas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value?.toString() || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ala</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a ala da caravana" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ward.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel>Ativado para cadastro?</FormLabel>
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
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da caravana</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
