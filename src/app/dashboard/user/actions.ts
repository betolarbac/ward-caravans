"use server";
import prisma from "@/lib/prisma";
import { RegisterFormData } from "@/lib/validators";

export async function GetUser() {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      ward: {
        select: {
          name: true,
        },
      },
      Stake: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: { name: "asc" },
  });

  return user;
}

export async function EditUser(data: RegisterFormData) {
  return await prisma.user.upsert({
    where: {
      email: data.email,
    },
    update: {
      name: data.name,
      email: data.email,
      wardId: data.wardId,
      role: data.role,
      password: data.password,
    },
    create: {
      name: data.name,
      email: data.email,
      wardId: data.wardId,
      role: data.role,
      password: data.password,
    },
  });
}

export async function DeleteUser(id: string) {
  return await prisma.user.delete({
    where: { id: id },
  });
}
