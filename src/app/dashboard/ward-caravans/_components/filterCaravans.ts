import UserLoggedIn from "../../_components/UserloggedIn/UserloggedIn";
import { getWardCaravans } from "../actions";

export default async function FilterCaravans() {
  const { Stake, role, ward } = await UserLoggedIn();
  const caravansWard = await getWardCaravans(Stake?.id || "");

  const filterCaravans =
    role === "ward"
      ? caravansWard.filter((caravan) => caravan.ward?.id === ward?.id)
      : caravansWard;

  return filterCaravans;
}
