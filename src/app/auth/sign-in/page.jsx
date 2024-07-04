import { auth } from "@/auth";
import DoKopiSignIn from "@/components/merchant/auth/DoKopiSignIn";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session && session.user.storeId === null) {
    redirect("/getting-started");
  }
  if (session && session.user.storeId !== null) {
    redirect("/");
  }
  return <DoKopiSignIn />;
}
