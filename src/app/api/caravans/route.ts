import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const {
      nextUrl: { searchParams },
    } = req;

    const caravans = await prisma.caravans.findMany({
      where: {
        active: true,

        ward: {
          stakeId: searchParams.get("stakeId") ?? "",
        },
      },
      include: {
        Member: true,
        ward: true,
      },
    });

    return NextResponse.json(caravans);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message);
    }
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
