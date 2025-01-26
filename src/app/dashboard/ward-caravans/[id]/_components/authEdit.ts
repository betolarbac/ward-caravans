import UserLoggedIn from "@/app/dashboard/_components/UserloggedIn/UserloggedIn";
import { GetCaravansPage } from "../action";

export default async function AuthEdit(id: string) {
  const { ward, role, Stake } = await UserLoggedIn();
  const caravansMember = await GetCaravansPage(id);

  const authEdit =
    (role === "ward" && ward?.id === caravansMember?.wardId) ||
    (role === "stake" && Stake?.id === caravansMember?.ward?.stakeId);

  return { authEdit, caravansMember };
}
