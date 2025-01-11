"use server"
import prisma from "@/lib/prisma";
import { CaravansWardProps } from "@/lib/validators";

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

export async function upsertWardCaravans(data: CaravansWardProps){
  if(!data.id) {
    return await prisma.caravans.create({
      data: {
        name: data.name,
        date: data.date,
        vacancy: data.vacancy,
        active: data.active,
        wardId: data.wardId
      }
    })
  }

  return await prisma.caravans.upsert({
    where: {
      id: data.id
    },
    update: {
      name: data.name,
      date: data.date,
      vacancy: data.vacancy,
      active: data.active,
      wardId: data.wardId
    },
    create: {
      name: data.name,
      date: data.date,
      vacancy: data.vacancy,
      active: data.active,
      wardId: data.wardId
    }
  })
}

export async function DeleteCaravans(id: string) {

  await prisma.member.deleteMany({
    where: {caravansId: id}
  })


  return await prisma.caravans.delete({
    where: {id: id}
  })
}