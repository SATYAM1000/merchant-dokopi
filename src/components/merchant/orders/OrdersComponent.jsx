"use client";
import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "./Header";
import OrdersContainer from "./OrderContainer";
import UserInfoHeader from "./UserInfoHeader";
import DocumentInfo from "./DocumentInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { API_DOMAIN, SOCKET_URL } from "@/lib/constants";
import axios from "axios";
import io from "socket.io-client";
import OrderCardSkelton from "./OrderCardSkelton";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const StoreSetUpComponent = lazy(() => import("./StoreSetUpComponent"));

const OrdersComponent = () => {
  const currentUser = useCurrentUser();
  const { update } = useSession();

  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [storeSetUpActiveStep, setStoreSetUpActiveStep] = useState(null);
  const [date, setDate] = useState(null);

  const {
    data: activeOrders = [],
    isLoading: showLoader,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", currentUser, date],
    queryFn: fetchOrders,
    enabled: !!currentUser,
    refetchOnWindowFocus: false, 
    retry: 3, 
  });

  useEffect(() => {
    if (currentUser) {
      update();
    }
  }, []);

  useEffect(() => {
    if (isError) {
      console.error("Error while fetching orders:", error);
      if (error?.response?.data?.code === "SETUP_INCOMPLETE") {
        const progress = error?.response?.data?.inCompleteStep;
        setStoreSetUpActiveStep(progress);
      } else {
        console.error(
          "Error while fetching orders:",
          error?.response?.data?.msg
        );
      }
    }
  }, [isError, error]);

  useEffect(() => {
    const initializeSocket = () => {
      const socket = io(SOCKET_URL, {
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
          queryClient.invalidateQueries(["orders", currentUser, date]);

          if (Notification.permission === "granted") {
            const notification = new Notification("New Order", {
              body: `You have a new order.`,
              icon: "/vercel.svg",
            });

            const audio = new Audio("/audio/notification.mp3");
            audio.play();
          } else {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                const notification = new Notification("New Order", {
                  body: `You have a new order.`,
                  icon: "/vercel.svg",
                });

                const audio = new Audio("/audio/notification.mp3");
                audio.play();
              }
            });
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

    const socketCleanup = initializeSocket();
    return socketCleanup;
  }, [currentUser, queryClient, date]);

  const handleOrderClick = async (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order._id);

    if (!order?.isOrderViewedByMerchant) {
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

        queryClient.setQueryData(["orders", currentUser, date], (oldData) => {
          if (Array.isArray(oldData)) {
            return oldData.map((ord) =>
              ord._id === order._id
                ? { ...ord, isOrderViewedByMerchant: true }
                : ord
            );
          } else {
            console.warn("Old data is not an array:", oldData);
            return [];
          }
        });
      } catch (error) {
        console.error("Error marking order as viewed:", error);
        toast.error("Failed to mark the order as viewed. Please try again.");
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    queryClient.setQueryData(["orders", currentUser, date], (oldData) => {
      if (Array.isArray(oldData)) {
        return oldData.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        );
      } else {
        console.warn("Old data is not an array:", oldData);
        return [];
      }
    });

    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder((prevOrder) => ({
        ...prevOrder,
        orderStatus: newStatus,
      }));
    }
  };

  if (!currentUser) return null;

  if (currentUser?.isStoreSetUpCompleted === false) {
    return (
      <Suspense fallback={<ClipLoader />}>
        <StoreSetUpComponent
          storeSetUpActiveStep={parseInt(currentUser?.inCompleteStep)}
        />
      </Suspense>
    );
  }

  return (
    <div className="w-full h-full bg-[#f5f5f5] text-black/[0.90] overflow-hidden flex">
      <>
        {/* Left Side */}
        <div className="w-full md:w-1/2 lg:w-2/6 xl:w-1/4 h-full">
          <div className="w-full h-full flex flex-col gap-0 relative bg-white border-r">
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

        {/* Right Side */}
        {!selectedOrder ? (
          <div className="hidden md:w-1/2 lg:w-4/6 xl:w-3/4 h-full bg-gray-100 bg-contain bg-center md:flex flex-col"></div>
        ) : (
          <div className="hidden md:w-1/2 lg:w-4/6 xl:w-3/4 h-full w-full bg-custom-image bg-contain bg-center md:flex flex-col">
            <UserInfoHeader
              order={selectedOrder}
              updateOrderStatus={updateOrderStatus}
            />

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
    </div>
  );
};

export default OrdersComponent;

const fetchOrders = async ({ queryKey }) => {
  const [_, currentUser, date] = queryKey;
  try {
    const token = await fetchAccessToken();
    let url = `${API_DOMAIN}/api/v1/merchant/orders/${currentUser?.storeId}`;

    const currentDate = date || new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    url += `?date=${encodeURIComponent(formattedDate)}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data);
    throw error;
  }
};
