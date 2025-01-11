"use server"
import prisma from "@/lib/prisma";
import { CaravansMemberProps } from "@/lib/validators";

export async function GetCaravansPage(id: string) {
  return await prisma.caravans.findUnique({
    where: {
      id: id,
    },
    include: {
      Member: true,
    },
  });
}

export async function UpsertCaravansMember(data: CaravansMemberProps) {
  if(!data.id) {
    return await prisma.member.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        ward: data.ward,
        pay: data.pay,
        caravansId: data.caravansId
      }
    })
  }


  return await prisma.member.upsert({
    where: {
      id: data.id
    },
    update: {
      name: data.name,
      cpf: data.cpf,
      ward: data.ward,
      pay: data.pay,
      caravansId: data.caravansId
    },
    create: {
      name: data.name,
      cpf: data.cpf,
      ward: data.ward,
      pay: data.pay,
      caravansId: data.caravansId
    }
  })
}

export async function DeleteCaravansMember(id: string) {

  return await prisma.member.delete({
    where: {id: id}
  })
}