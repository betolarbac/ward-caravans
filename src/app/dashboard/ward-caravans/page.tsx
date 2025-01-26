import { Card, CardContent } from "@/components/ui/card";
import Header from "../_components/header";
import RegisterCaravans from "./_components/RegisterCaravans";
import FilterCaravans from "./_components/filterCaravans";
import { WardTablet } from "./_components/ward-tablet";

export default async function WardCaravans() {
  const filterCaravans = await FilterCaravans();

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between">
        <Header title="Caravanas da Ala" />
        <RegisterCaravans />
      </div>
      <>
        <Card>
          <CardContent className="py-4">
            <WardTablet
              data={filterCaravans.map((caravan) => ({
                ...caravan,
                wardId: caravan.ward?.id ?? "",
                name: caravan.name ?? "",
                date: caravan.date ?? new Date(),
                vacancy: caravan.vacancy ?? 0,
                value: caravan.value ?? 0,
                active: caravan.active,
                id: caravan.id,
                Member: caravan.Member ?? [],
              }))}
            />
          </CardContent>
        </Card>
      </>
    </div>
  );
}
