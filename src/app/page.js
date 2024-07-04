import OrdersComponent from "@/components/merchant/orders/OrdersComponent";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrdersPageForMerchant() {
  const session = await auth();
  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session && session.user?.storeId === null) {
    redirect("/getting-started");
  }
  return (
    <>
      <OrdersComponent />
    </>
  );
}
