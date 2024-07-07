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
import StoreSetUpComponent from "./StoreSetUpComponent";

const OrdersComponent = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const [showLoader, setShowLoader] = useState(true);
  const [isStoreSetupCompleted, setIsStoreSetupCompleted] = useState(
    currentUser?.isStoreSetUpCompleted
  );

  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [storeSetUpActiveStep, setStoreSetUpActiveStep] = useState(null);
  const [date, setDate] = useState(null);

  const fetchOrdersForXeroxStore = async (loader = true) => {
    try {
      setShowLoader(loader);
      const token = await fetchAccessToken();

      let url = `${API_DOMAIN}/api/v1/merchant/orders/${currentUser?.storeId}`;
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
        setActiveOrders(data?.data);
      } else {
        setActiveOrders([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setActiveOrders([]);
      } else if (
        error.response?.status === 400 &&
        error.response?.data?.code === "SETUP_INCOMPLETE"
      ) {
        const res = error?.response?.data?.storeSetUpProgress;
        let active = 0;
        if (!res.step1) {
          active = 0;
        } else if (!res.step2) {
          active = 1;
        } else if (!res.step3) {
          active = 2;
        } else if (!res.step4) {
          active = 3;
        }
        setStoreSetUpActiveStep(active);
      } else {
        toast.error(
          error.response?.data?.msg || error.message || "Something went wrong"
        );
      }
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchOrdersForXeroxStore();
  }, [date]);

  useEffect(() => {
    const initializeSocket = () => {
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
              icon: "/vercel.svg",
            });

            const audio = new Audio("/audio/notification.mp3");
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
        toast.error(
          "Unable to reconnect to the server. Please check your internet connection."
        );
      });

      socket.on("error", (error) => {
        console.error("Socket.IO error:", error);
        toast.error(
          "A connection error occurred. Please check your internet connection."
        );
      });

      return () => {
        socket.off("paymentSuccess");
        socket.disconnect();
      };
    };

    initializeSocket();
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

        // Update active orders to mark the order as viewed
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
    <div className="w-full h-full bg-[#f5f5f5] text-black/[0.90] overflow-hidden flex">
      {isStoreSetupCompleted ? (
        <>
          {/* Left Side */}
          <div className="w-full md:w-1/2 lg:w-2/6 xl:w-1/4 h-full">
            <div className="w-full  h-full flex flex-col gap-0 relative bg-white border-r">
              <Header
                date={date}
                setDate={setDate}
                setSelectedOrder={setSelectedOrder}
              />
              {showLoader ? (
                <OrderCardSkelton /> // Show skeleton loader while loading
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

          {/* Right Side */}
          {!selectedOrder ? (
            <div className="hidden md:w-1/2 lg:w-4/6 xl:w-3/4 h-full bg-gray-100 bg-contain bg-center md:flex flex-col"></div>
          ) : (
            <div className="hidden md:w-1/2 lg:w-4/6 xl:w-3/4 h-full w-full bg-custom-image bg-contain bg-center md:flex flex-col">
              <UserInfoHeader order={selectedOrder} />

              {/* Documents */}
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
        </>
      ) : (
        <section className="w-full h-full flex items-center justify-center">
          <StoreSetUpComponent storeSetUpActiveStep={storeSetUpActiveStep} />
        </section>
      )}
    </div>
  );
};

export default OrdersComponent;
