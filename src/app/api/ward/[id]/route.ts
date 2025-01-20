import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface WardProps {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: WardProps) {
  const id = await params.id;

  try {
    const ward = await prisma.ward.findMany({
      where: {
        stakeId: id,
      },
      include: {
        Caravans: true
      }
    });

    return NextResponse.json(ward);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message);
    }

    return NextResponse.json(
      { error: "Erro ao buscar stake" },
      { status: 500 }
    );
  }
}
