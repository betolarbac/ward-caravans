import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const stakes = await prisma.stake.findMany({
      include: {
        ward: true
      }
    })


    return NextResponse.json(stakes)

  } catch(error) {
    if (error instanceof Error) {
      console.log("Erro:", error.message)
    }

    return NextResponse.json(
      {error: "Erro ao buscar stake"},
      {status: 500}
    )
  }
}