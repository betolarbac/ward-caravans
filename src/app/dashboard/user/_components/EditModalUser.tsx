"use client";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Pencil } from "lucide-react";
import { getWards } from "../../ward/action";
import { useRouter } from "next/navigation";
import { EditUser } from "../actions";
import { GetStake } from "../../stake/actions";
interface Ward {
  id: string;
  name: string | null;
  createdAt: Date;
}

interface Stake {
  id: string;
  name: string | null;
  createdAt: Date;
}

export default function EditModalUser(user: RegisterFormData) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [wards, setWards] = useState<Ward[]>([]);
  const [stake, setStake] = useState<Stake[]>([]);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      wardId: user.wardId,
      stakeId: user.stakeId,
      password: "",
    },
  });

  useEffect(() => {
    async function fetchWards() {
      try {
        const wardsData = await getWards();
        const formattedWards = wardsData.map((ward) => ({
          id: ward.id,
          name: ward.name,
          createdAt: new Date(),
        }));
        setWards(formattedWards);
      } catch (error) {
        console.error("Erro ao buscar wards:", error);
      }
    }

    async function GetStakeWard() {
      try {
        const stakes = await GetStake();
        if (!stake) {
          throw new Error("GetStake returned null");
        }
        setStake(
          stakes.map((stake) => ({
            id: stake.id,
            name: stake.name,
            createdAt: new Date(),
          }))
        );
        return stakes;
      } catch (error) {
        console.error(error || "Erro inesperado");
        return [];
      }
    }

    GetStakeWard();
    fetchWards();
  }, []);

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);

    try {
      await EditUser(data);

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error || "Error inesperado");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Pencil className="w-4 h-5" />
          </Button>
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Estaca</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a estaca" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stake.map((stake) => (
                            <SelectItem
                              key={stake.id}
                              value={stake.id as string}
                            >
                              {stake.name}
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
                  name="wardId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ala</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a função do usuário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem key={ward.id} value={ward.id as string}>
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Função</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a função do usuário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ward">Ala</SelectItem>
                          <SelectItem value="stake">Estaca</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      "Registrar"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
