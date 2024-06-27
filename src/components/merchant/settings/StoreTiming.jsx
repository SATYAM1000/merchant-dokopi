import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreTiming = () => {
  return (
    <section className="w-full  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store timings</h3>
        <p className="text-[#808080] text-sm">
          Your store will be automatically switched online/offline based on the
          hours you choose.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {days.map((day, index) => (
          <div key={index} className="flex items-center gap-10 text-[#1A181E]">
            <p className="text-sm font-medium w-[70px]">{day}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-4">
                <Switch id="open" />
                <Label htmlFor="open" className="text-[#808080] font-normal">
                  Open
                </Label>
              </div>
              <div className="flex items-center gap-3 ml-6 text-[#4D4D4D] ">
                <Button variant="outline" size="sm" className="font-medium">
                  10:00 AM
                </Button>

                <p>-</p>
                <Button variant="outline" size="sm" className="font-medium">
                  10:00 PM
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 w-full flex items-center justify-end">
        <Button type="submit">Save</Button>
      </div>
    </section>
  );
};

export default StoreTiming;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
