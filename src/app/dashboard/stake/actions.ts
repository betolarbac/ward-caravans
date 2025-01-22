"use server";
import prisma from "@/lib/prisma";

export async function GetStake(id?: string) {
  return await prisma.stake.findMany({
    select: {
      id: true,
      name: true,
      ward: {
        select: {
          name: true,
        },
      },
    },
    where: {
      id: id,
    },
    orderBy: { createdAt: "desc" },
  });
}
