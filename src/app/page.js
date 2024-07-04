import OrdersComponent from "@/components/merchant/orders/OrdersComponent";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrdersPageForMerchant() {
  const session = await auth();
  return (
    <>
      <OrdersComponent />
    </>
  );
}
