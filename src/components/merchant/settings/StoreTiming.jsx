"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeOptions = [
  { value: "00:00", label: "12:00 AM" },
  { value: "00:30", label: "12:30 AM" },
  { value: "01:00", label: "01:00 AM" },
  { value: "01:30", label: "01:30 AM" },
  { value: "02:00", label: "02:00 AM" },
  { value: "02:30", label: "02:30 AM" },
  { value: "03:00", label: "03:00 AM" },
  { value: "03:30", label: "03:30 AM" },
  { value: "04:00", label: "04:00 AM" },
  { value: "04:30", label: "04:30 AM" },
  { value: "05:00", label: "05:00 AM" },
  { value: "05:30", label: "05:30 AM" },
  { value: "06:00", label: "06:00 AM" },
  { value: "06:30", label: "06:30 AM" },
  { value: "07:00", label: "07:00 AM" },
  { value: "07:30", label: "07:30 AM" },
  { value: "08:00", label: "08:00 AM" },
  { value: "08:30", label: "08:30 AM" },
  { value: "09:00", label: "09:00 AM" },
  { value: "09:30", label: "09:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "13:30", label: "01:30 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "14:30", label: "02:30 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "15:30", label: "03:30 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "16:30", label: "04:30 PM" },
  { value: "17:00", label: "05:00 PM" },
  { value: "17:30", label: "05:30 PM" },
  { value: "18:00", label: "06:00 PM" },
  { value: "18:30", label: "06:30 PM" },
  { value: "19:00", label: "07:00 PM" },
  { value: "19:30", label: "07:30 PM" },
  { value: "20:00", label: "08:00 PM" },
  { value: "20:30", label: "08:30 PM" },
  { value: "21:00", label: "09:00 PM" },
  { value: "21:30", label: "09:30 PM" },
  { value: "22:00", label: "10:00 PM" },
  { value: "22:30", label: "10:30 PM" },
  { value: "23:00", label: "11:00 PM" },
  { value: "23:30", label: "11:30 PM" },
];

const StoreTiming = () => {
  const currentUser = useCurrentUser();
  const [storeHours, setStoreHours] = useState(
    days.reduce((acc, day) => {
      acc[day] = { open: "", close: "", isOpen: false };
      return acc;
    }, {})
  );

  const fetchStoreHours = async () => {
    try {
      const res = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/store/store-opening-closing-hours/${currentUser.storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      const fetchedData = res.data.data;
      const parsedStoreHours = days.reduce((acc, day) => {
        acc[day] = {
          open: fetchedData[day]?.open || "",
          close: fetchedData[day]?.close || "",
          isOpen: fetchedData[day]?.isOpen || false,
        };
        return acc;
      }, {});
      setStoreHours(parsedStoreHours);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.storeId) {
      fetchStoreHours();
    }
  }, [currentUser.storeId]);

  const handleSwitchChange = useCallback(
    (day) => {
      setStoreHours((prev) => ({
        ...prev,
        [day]: { ...prev[day], isOpen: !prev[day].isOpen },
      }));
    },
    []
  );

  const handleTimeChange = useCallback((day, type, value) => {
    setStoreHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/merchant/store/store-opening-closing-hours/${currentUser.storeId}`,
          storeHours,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );

        if (res.status === 200) {
          toast.success("Store timings updated successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
    [storeHours, currentUser.storeId]
  );

  const memoizedTimeOptions = useMemo(
    () =>
      timeOptions.map((time) => (
        <SelectItem key={time.value} value={time.value}>
          {time.label}
        </SelectItem>
      )),
    []
  );

  return (
    <section className="w-full bg-white h-fit px-6 py-6">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store timings</h3>
        <p className="text-[#808080] text-sm">
          Your store will be automatically switched online/offline based on the
          hours you choose.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {days.map((day, index) => (
          <div key={index} className="flex items-center gap-10 text-[#1A181E]">
            <p className="text-sm font-medium w-[70px]">{day}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-4">
                <Switch
                  id={`open-${day}`}
                  checked={storeHours[day]?.isOpen}
                  onChange={() => handleSwitchChange(day)}
                />
                <Label
                  htmlFor={`open-${day}`}
                  className="text-[13px] font-medium text-gray-500"
                >
                  Open
                </Label>
              </div>
              {storeHours[day].isOpen && (
                <div className="flex items-center gap-3 ml-6 text-[#4D4D4D]">
                  <Select
                    onValueChange={(value) =>
                      handleTimeChange(day, "open", value)
                    }
                    value={storeHours[day].open}
                  >
                    <SelectTrigger className="w-[120px] font-medium text-[13px] appearance-none text-gray-700 border border-gray-300 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <SelectValue placeholder="Open Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>{memoizedTimeOptions}</SelectGroup>
                    </SelectContent>
                  </Select>

                  <p>-</p>

                  <Select
                    onValueChange={(value) =>
                      handleTimeChange(day, "close", value)
                    }
                    value={storeHours[day].close}
                  >
                    <SelectTrigger className="w-[120px] font-medium text-[13px] appearance-none text-gray-700 border border-gray-300 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <SelectValue placeholder="Close Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>{memoizedTimeOptions}</SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="mt-6 w-full flex items-center justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </section>
  );
};

export default StoreTiming;
