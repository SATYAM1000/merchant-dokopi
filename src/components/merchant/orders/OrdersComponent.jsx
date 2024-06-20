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
import io from "socket.io-client";
import OrderCardSkelton from "./OrderCardSkelton";
import { formatDate } from "@/lib/format-date";
import { toast } from "sonner";

const OrdersComponent = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const [showLoader, setShowLoader] = useState(true);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [date, setDate] = useState(null);

  const fetchOrdersForXeroxStore = async (loader = true) => {
    try {
      setShowLoader(loader);
      const token = await fetchAccessToken();

      let url = `${API_DOMAIN}/api/v1/merchant/orders/${currentUser.storeId}`;
      if (date) {
        const formattedDate = formatDate(date);
        url += `?date=${encodeURIComponent(formattedDate)}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.data?.length > 0) {
        setHasActiveOrders(true);
        setActiveOrders(data?.data);
      } else {
        setHasActiveOrders(false);
        setActiveOrders([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setHasActiveOrders(false);
        setActiveOrders([]);
        return;
      }
      toast.error(
        error.response?.data?.msg || error.message || "Something went wrong"
      );
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchOrdersForXeroxStore();
  }, [date]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }

    const socket = io("https://api.dokopi.com", {
      reconnectionAttempts: 5, 
      reconnectionDelay: 3000,
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      if (currentUser) {
        socket.emit("userConnect", { userId: currentUser.id });
      }
    });

    socket.on("paymentSuccess", (data) => {
      if (data.storeId === currentUser.storeId) {
        fetchOrdersForXeroxStore(false);
        
        if (Notification.permission === "granted") {
          const notification = new Notification("New Order", {
            body: `You have a new order.`,
            icon: '/vercel.svg', 
          });

          
          const audio = new Audio('/audio/notification.mp3'); 
          audio.play();
        }
      }
    });

    socket.on("disconnect", () => {
      console.warn("Disconnected from Socket.IO server");
    });

    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect to Socket.IO server");
    });

    socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect to Socket.IO server");
      toast.error("Unable to reconnect to the server. Please check your internet connection.");
    });

    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
      toast.error("A connection error occurred. Please check your internet connection.");
    });

    return () => {
      socket.off("paymentSuccess");
      socket.disconnect();
    };
  }, [currentUser]);

  const handleOrderClick = async (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order._id);
    if (!order.isViewed) {
      try {
        const token = await fetchAccessToken();
        await axios.put(
          `${API_DOMAIN}/api/v1/merchant/orders/is-viewed/${order._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setActiveOrders((prevOrders) =>
          prevOrders.map((ord) =>
            ord._id === order._id ? { ...ord, isViewed: true } : ord
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-auto md:h-[calc(100vh-64px)] bg-gray-300 text-black/[0.90] overflow-hidden flex ">
      {/* ----------left-side----------------- */}
      <div className="w-full md:w-1/2 lg:w-1/4  h-full ">
        <div className="w-full h-full flex flex-col gap-4 px-6 py-4 bg-white border-r ">
          <Header
            date={date}
            setDate={setDate}
            setSelectedOrder={setSelectedOrder}
          />
          {showLoader ? (
            <OrderCardSkelton />
          ) : (
            <OrdersContainer
              activeOrders={activeOrders}
              onOrderClick={handleOrderClick}
              selectedOrderId={selectedOrderId}
              date={date}
            />
          )}
        </div>
      </div>

      {/* ----------right-side-------------------------- */}
      {!selectedOrder ? (
        <div className="hidden md:w-1/2 lg:w-3/4 h-full bg-gray-100 bg-contain bg-center  md:flex flex-col"></div>
      ) : (
        <div className="hidden md:w-1/2 lg:w-3/4 h-full w-full bg-custom-image bg-contain bg-center md:flex flex-col">
          <UserInfoHeader order={selectedOrder} />

          {/* --------------------documents-------------------- */}
          <div className="w-full h-full">
            <ScrollArea className="h-[calc(100vh-150px)] w-full rounded-md bg-transparent text-black">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {selectedOrder && (
                  <DocumentInfo cartItems={selectedOrder.cartItems} />
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersComponent;
