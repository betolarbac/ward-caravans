import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../_components/header";
import Link from "next/link";
import { Calendar, House, School, User } from "lucide-react";
import { getWardCaravans } from "../ward-caravans/actions";


export default async function Dashboard() {

  const caravans = await getWardCaravans()

  return (
    <div className="max-w-[1200px] mx-auto">
      <Header title="Caravanas da Estaca 2025" />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4">
        {caravans.map((caravans ) => (
          <Link href={`/dashboard/ward-caravans/${caravans.id}`} key={caravans.id}>
            <Card>
              <CardHeader>
                <CardTitle>{caravans.name}</CardTitle>
              </CardHeader>

              <CardContent>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <School className="w-4 h-4 mr-1" />
                    {caravans.ward?.stake.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <House className="w-4 h-4 mr-1" />
                    {caravans.ward?.name}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {caravans.date?.toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <p className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Vagas: <span className="text-primary ml-1">{caravans.Member.length}/{caravans.vacancy}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
