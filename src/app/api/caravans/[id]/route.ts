import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CaravansProps {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: CaravansProps
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const caravans = await prisma.caravans.findMany({
      where: {
        id: id,
        active: true,
      },
      include: {
        Member: true,
      },
    });

    return NextResponse.json(caravans);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message);
    }
    return NextResponse.json(
      { error: "Erro ao buscar caravans" },
      { status: 500 }
    );
  }
}
