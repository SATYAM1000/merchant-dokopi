import { redirect } from "next/navigation";
import { fetchAccessToken } from "@/actions/access-token";
export default async function Home() {
  const token = await fetchAccessToken();
  if (!token) {
    redirect("/auth/sign-in");
  } else {
    redirect("/orders");
  }
}
