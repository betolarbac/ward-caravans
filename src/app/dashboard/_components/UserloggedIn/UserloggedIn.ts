import prisma from "@/lib/prisma";
import { getSession } from "../../action";

export default async function UserLoggedIn() {
  const session = await getSession()
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      ward: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {id: session.id}
  })

  return user[0]
}