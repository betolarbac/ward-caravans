"use server"
import prisma from "@/lib/prisma";
import { wardData } from "@/lib/validators";

export async function getWards() {
  const wards = await prisma.ward.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return wards
}

export async function upsertWards(data: wardData) {
 
  if(!data.id) {
    return await prisma.ward.create({
      data: {
        name: data.name
      }
    })
  }
 
 
  return await prisma.ward.upsert({
    where: {
      id: data.id
    },
    update: {
      name: data.name
    },
    create: {
      name: data.name
    }
  })

 
}