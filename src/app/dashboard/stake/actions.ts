"use server"
import prisma from "@/lib/prisma";

export async function GetStake() {
  return await prisma.stake.findMany({
    select: {
      id: true,
      name: true,
      ward: {
        select: {
          name: true
        }
      }
    },
    orderBy: {createdAt: 'desc'}
  })
}