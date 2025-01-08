"use server"
import prisma from "@/lib/prisma";

export async function GetUser() {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      ward: {
        select: {
          name: true
        }
      }
    },
    orderBy: {name: 'asc'}
  })

  return user
}