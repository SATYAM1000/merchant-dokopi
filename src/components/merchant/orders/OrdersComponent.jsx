"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import OrdersContainer from "./OrderContainer";
import UserInfoHeader from "./UserInfoHeader";
import DocumentInfo from "./DocumentInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { API_DOMAIN } from "@/lib/constants";
import axios from "axios";

const OrdersComponent = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  console.log("current user is ", currentUser);

  const [showLoader, setShowLoader] = useState(false);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 

  useEffect(() => {
    const fetchOrdersForXeroxStore = async () => {
      try {
        const token = await fetchAccessToken();

        console.log("token is ", token);

        const { data } = await axios.get(
          `${API_DOMAIN}/api/v1/merchant/orders/active/${currentUser.storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.data?.length > 0) {
          setHasActiveOrders(true);
          setActiveOrders(data?.data);
        } else {
          setHasActiveOrders(false);
          setActiveOrders([]);
        }
      } catch (error) {
        console.log("Error while fetching orders ", error);
      }
    };

    fetchOrdersForXeroxStore();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="w-full h-auto md:h-[calc(100vh-64px)] bg-gray-300 text-black/[0.90] overflow-hidden flex ">
      {/* ----------left-side----------------- */}
      <div className="w-full md:w-1/2  lg:w-1/4  h-full ">
        <div className="w-full h-full flex flex-col gap-4 px-6 py-4 bg-white border-r border-black/[0.30]">
          <Header />
          <OrdersContainer
            activeOrders={activeOrders}
            onOrderClick={handleOrderClick}
          />
        </div>
      </div>

      {/* ----------right-side-------------------------- */}
      <div className="hidden md:1/2 lg:w-3/4 h-full bg-custom-image bg-contain bg-center md:flex flex-col">
        <UserInfoHeader />

        {/* --------------------documents-------------------- */}
        <div className="w-full h-full">
          <ScrollArea className="h-[calc(100vh-150px)] w-full rounded-md border bg-transparent text-black">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
              {selectedOrder && (
                <DocumentInfo cartItems={selectedOrder.cartItems} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;
