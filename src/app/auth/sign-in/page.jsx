import { auth } from "@/auth";
import DoKopiSignIn from "@/components/merchant/auth/DoKopiSignIn";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return <DoKopiSignIn />;
}
