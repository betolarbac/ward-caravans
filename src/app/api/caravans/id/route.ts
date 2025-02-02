import prisma from "@/lib/prisma";
import { CaravansMemberSchema } from "@/lib/validators";
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = CaravansMemberSchema.parse(body);

    const memberCaravan = await prisma.member.create({
      data: validatedData,
    });

    return NextResponse.json(memberCaravan);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message);
    }

    return NextResponse.json(
      { error: "Erro ao cadastrar usuário" },
      { status: 400 }
    );
  }
}
