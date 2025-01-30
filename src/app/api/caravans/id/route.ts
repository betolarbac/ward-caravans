import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const {
      nextUrl: { searchParams },
    } = _req;

    const caravan = await prisma.caravans.findUnique({
      where: {
        id: searchParams.get("id") ?? "",
      },
      include: {
        Member: true,
      },
    });

    return NextResponse.json(caravan);
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
