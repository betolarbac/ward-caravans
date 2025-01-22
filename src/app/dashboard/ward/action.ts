"use server";
import prisma from "@/lib/prisma";
import { wardData } from "@/lib/validators";

export async function getWards(id?: string, idStake?: string) {
  const wards = await prisma.ward.findMany({
    select: {
      id: true,
      name: true,
      stake: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      id: id,
      stake: {
        id: idStake,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return wards;
}

export async function upsertWards(data: wardData) {
  if (!data.id) {
    return await prisma.ward.create({
      data: {
        name: data.name,
        stakeId: data.stakeId,
      },
    });
  }

  return await prisma.ward.upsert({
    where: {
      id: data.id,
    },
    update: {
      name: data.name,
    },
    create: {
      name: data.name,
      stakeId: data.stakeId,
    },
  });
}

export async function DeleteWards(id: string) {
  return await prisma.ward.delete({
    where: { id: id },
  });
}
