import { useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { SOCKET_URL } from '@/lib/constants';

const useSocket = (currentUser, queryClient, date) => {
  useEffect(() => {
    if (!currentUser) return;

    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    const handlePaymentSuccess = (data) => {
      if (data.storeId === currentUser.storeId) {
        toast.success("New order received");
        const currentDate = format(new Date(), "yyyy-MM-dd");
        queryClient.invalidateQueries(["orders", currentUser, currentDate]);

        if (Notification.permission === "granted") {
          new Notification("New Order", { body: `You have a new order.`, icon: "/vercel.svg" });
          const audio = new Audio("/audio/notification.mp3");
          audio.play();
        } else {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("New Order", { body: `You have a new order.`, icon: "/vercel.svg" });
              const audio = new Audio("/audio/notification.mp3");
              audio.play();
            }
          });
        }
      }
    };

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socket.emit("userConnect", { userId: currentUser.id });
    });

    socket.on("paymentSuccess", handlePaymentSuccess);

    socket.on("disconnect", () => console.warn("Disconnected from Socket.IO server"));
    socket.on("reconnect_attempt", () => console.log("Attempting to reconnect to Socket.IO server"));
    socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect to Socket.IO server");
      toast.error("Unable to reconnect to the server. Please check your internet connection.");
    });
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
      toast.error("A connection error occurred. Please check your internet connection.");
    });

    return () => {
      socket.off("paymentSuccess", handlePaymentSuccess);
      socket.disconnect();
    };
  }, [currentUser, queryClient, date]);
};

export default useSocket;
