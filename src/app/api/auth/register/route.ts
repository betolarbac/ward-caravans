import  bcrypt  from 'bcrypt';
import prisma from "@/lib/prisma"
import { registerSchema } from "@/lib/validators"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      return NextResponse.json(
        {error: 'usuário ja existe'},
        {status: 400}
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
        wardId: data.wardId
      }
    })

    return NextResponse.json({user})

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Erro ao registrar' },
        { status: 400 }
      );
    }
  }
}