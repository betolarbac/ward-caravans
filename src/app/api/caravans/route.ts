import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const caravans = await prisma.caravans.findMany({
      where: {
        active: true
      },
      include: {
        Member: true
      }
    });

    return NextResponse.json(caravans)

  } catch(error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message);
    }
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}