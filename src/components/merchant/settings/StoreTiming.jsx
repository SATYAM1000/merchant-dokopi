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

import { days, timeOptions } from "@/lib/constants";
import { ClipLoader } from "react-spinners";

const StoreTiming = () => {
  const currentUser = useCurrentUser();
  const [initialLoader, setInitialLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [storeHours, setStoreHours] = useState({});
  const [originalStoreHours, setOriginalStoreHours] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchStoreHours = useCallback(async () => {
    try {
      setInitialLoader(true);
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
      setOriginalStoreHours(parsedStoreHours);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoader(false);
    }
  }, [currentUser.storeId]);

  useEffect(() => {
    if (currentUser.storeId) {
      fetchStoreHours();
    }
  }, [currentUser.storeId, fetchStoreHours]);

  const handleSwitchChange = (day) => {
    setStoreHours((prev) => {
      const updatedStoreHours = {
        ...prev,
        [day]: { ...prev[day], isOpen: !prev[day].isOpen },
      };
      validateStoreHours(updatedStoreHours);
      return updatedStoreHours;
    });
  };

  const handleTimeChange = (day, type, value) => {
    setStoreHours((prev) => {
      const updatedStoreHours = {
        ...prev,
        [day]: { ...prev[day], [type]: value },
      };
      validateStoreHours(updatedStoreHours);
      return updatedStoreHours;
    });
  };

  const validateStoreHours = (hours) => {
    let isValid = true;
    const errors = {};

    for (const day of days) {
      if (hours[day].isOpen) {
        const openTime = hours[day].open;
        const closeTime = hours[day].close;
        if (!openTime || !closeTime) {
          errors[day] = "Open and close times must be selected.";
          isValid = false;
        } else if (openTime === closeTime) {
          errors[day] = "Open and close times cannot be the same.";
          isValid = false;
        } else if (openTime > closeTime) {
          errors[day] = "Open time cannot be later than close time.";
          isValid = false;
        }
      }
    }

    setIsValid(isValid);
    setValidationErrors(errors);
    setIsUpdated(JSON.stringify(hours) !== JSON.stringify(originalStoreHours));
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!isValid) {
        toast.error("Please fix the validation errors before submitting.");
        return;
      }
      try {
        setIsLoading(true);
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
          setOriginalStoreHours(storeHours);
          setIsUpdated(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      finally {
        setIsLoading(false);
      }
    },
    [storeHours, currentUser.storeId, isValid]
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
      {initialLoader ? (
        <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
          <ClipLoader color="#1A181E" size={40} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex items-center gap-10 text-[#1A181E]"
            >
              <p className="text-sm font-medium w-[70px]">{day}</p>
              <div className="flex gap-8 items-center">
                <div className="flex items-center space-x-4">
                  <Switch
                    id={`open-${day}`}
                    checked={storeHours[day]?.isOpen}
                    onCheckedChange={() => handleSwitchChange(day)}
                  />
                  <Label
                    htmlFor={`open-${day}`}
                    className="text-[13px] w-12 font-medium text-gray-500"
                  >
                    {storeHours[day]?.isOpen ? "Open" : "Closed"}
                  </Label>
                </div>

                <div className="flex flex-col items-start gap-2 ml-6 text-[#4D4D4D]">
                  <div className="flex items-center gap-3">
                    <Select
                      disabled={!storeHours[day]?.isOpen}
                      onValueChange={(value) =>
                        handleTimeChange(day, "open", value)
                      }
                      value={storeHours[day]?.open}
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
                      disabled={!storeHours[day]?.isOpen}
                      onValueChange={(value) =>
                        handleTimeChange(day, "close", value)
                      }
                      value={storeHours[day]?.close}
                    >
                      <SelectTrigger className="w-[120px] font-medium text-[13px] appearance-none text-gray-700 border border-gray-300 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <SelectValue placeholder="Close Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>{memoizedTimeOptions}</SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {validationErrors[day] && (
                    <p className="text-red-500 text-xs">
                      {validationErrors[day]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 w-full flex items-center justify-end">
            <Button type="submit" disabled={!isUpdated || !isValid || isLoading}>
              {
                isLoading ? <ClipLoader color="#fff" size={16} /> : "Save"
              }
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default StoreTiming;
