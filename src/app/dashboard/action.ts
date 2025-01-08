import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession(authOptions);

  if(!session || !session.user) {
    throw new Error("user not authenticated")
  }

  return session.user
}