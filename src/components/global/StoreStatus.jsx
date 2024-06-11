"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { fetchAccessToken } from "@/actions/access-token";
import { toast } from "sonner";

const StoreStatus = () => {
  const currentUser = useCurrentUser();
  if(!currentUser) return null;
  const [active, setActive] = React.useState(
    currentUser.storeStatus === "open"
  );
  const handleStoreStatus = async () => {
    setActive(!active);
    try {
      const { data } = await axios.put(
        `${API_DOMAIN}/api/v1/merchant/store/change-store-status/${
          currentUser.storeId
        }/${!active === true ? "open" : "closed"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      toast.success(data?.msg || "Store status changed successfully");
    } catch (error) {
      console.log("Error while changing store status ", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="store-status"
        checked={active}
        onCheckedChange={handleStoreStatus}
        className="bg-blue-600"
      />

      <Label htmlFor="store-status">{active ? "Open" : "Close"}</Label>
    </div>
  );
};

export default StoreStatus;
