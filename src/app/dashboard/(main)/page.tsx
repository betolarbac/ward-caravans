import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../_components/header";
import Link from "next/link";
import { Calendar, School, User } from "lucide-react";

const caravans = [
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
    members: [
      {
        id: "1",
        name: "roberto",
      },
      {
        id: "2",
        name: "roberto 1",
      },
    ],
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
  {
    name: "Caravana ala antares",
    data: "2024-03-20",
    vagas: 45,
    ward: {
      id: "1",
      name: "Ala Antares",
    },
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Header title="Caravanas da Estaca 2025" />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4">
        {caravans.map((card, index) => (
          <Link href={"/"} key={index}>
            <Card>
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <School className="w-4 h-4 mr-1" />
                    {card.ward.name}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(card.data).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Vagas: <span className="text-primary ml-1">{card.vagas}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
