import prisma from "@/lib/prisma";

export async function getWardCaravans(){
  const wardCaravans = await prisma.caravans.findMany({
    select: {
      id: true,
      name: true,
      date: true,
      vacancy: true,
      active: true,
      ward: {
        select: {
          id: true,
          name: true
        }
      },
      Member: {
        select: {
          id: true,
          name: true
        }
      },
    }
  })

  return wardCaravans
}