import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreTiming = () => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6 ">
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
                <Label htmlFor="open" className="text-[13px] font-medium text-gray-500">
                  Open
                </Label>
              </div>
              <div className="flex items-center gap-3 ml-6 text-[#4D4D4D] ">
                <Select>
                  <SelectTrigger className="w-[120px] font-medium text-[13px] appearance-none text-gray-700 border border-gray-300 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <SelectValue placeholder="10:00 AM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                      <SelectItem value="00:30">12:30 AM</SelectItem>
                      <SelectItem value="01:00">01:00 AM</SelectItem>
                      <SelectItem value="01:30">01:30 AM</SelectItem>
                      <SelectItem value="02:00">02:00 AM</SelectItem>
                      <SelectItem value="02:30">02:30 AM</SelectItem>
                      <SelectItem value="03:00">03:00 AM</SelectItem>
                      <SelectItem value="03:30">03:30 AM</SelectItem>
                      <SelectItem value="04:00">04:00 AM</SelectItem>
                      <SelectItem value="04:30">04:30 AM</SelectItem>
                      <SelectItem value="05:00">05:00 AM</SelectItem>
                      <SelectItem value="05:30">05:30 AM</SelectItem>
                      <SelectItem value="06:00">06:00 AM</SelectItem>
                      <SelectItem value="06:30">06:30 AM</SelectItem>
                      <SelectItem value="07:00">07:00 AM</SelectItem>
                      <SelectItem value="07:30">07:30 AM</SelectItem>
                      <SelectItem value="08:00">08:00 AM</SelectItem>
                      <SelectItem value="08:30">08:30 AM</SelectItem>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="09:30">09:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="11:30">11:30 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="12:30">12:30 PM</SelectItem>
                      <SelectItem value="13:00">01:00 PM</SelectItem>
                      <SelectItem value="13:30">01:30 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="14:30">02:30 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="15:30">03:30 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="16:30">04:30 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                      <SelectItem value="17:30">05:30 PM</SelectItem>
                      <SelectItem value="18:00">06:00 PM</SelectItem>
                      <SelectItem value="18:30">06:30 PM</SelectItem>
                      <SelectItem value="19:00">07:00 PM</SelectItem>
                      <SelectItem value="19:30">07:30 PM</SelectItem>
                      <SelectItem value="20:00">08:00 PM</SelectItem>
                      <SelectItem value="20:30">08:30 PM</SelectItem>
                      <SelectItem value="21:00">09:00 PM</SelectItem>
                      <SelectItem value="21:30">09:30 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="22:30">10:30 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                      <SelectItem value="23:30">11:30 PM</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <p>-</p>

                <Select>
                  <SelectTrigger className="w-[120px] font-medium text-[13px] appearance-none text-gray-700 border border-gray-300 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <SelectValue placeholder="10:00 AM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                      <SelectItem value="00:30">12:30 AM</SelectItem>
                      <SelectItem value="01:00">01:00 AM</SelectItem>
                      <SelectItem value="01:30">01:30 AM</SelectItem>
                      <SelectItem value="02:00">02:00 AM</SelectItem>
                      <SelectItem value="02:30">02:30 AM</SelectItem>
                      <SelectItem value="03:00">03:00 AM</SelectItem>
                      <SelectItem value="03:30">03:30 AM</SelectItem>
                      <SelectItem value="04:00">04:00 AM</SelectItem>
                      <SelectItem value="04:30">04:30 AM</SelectItem>
                      <SelectItem value="05:00">05:00 AM</SelectItem>
                      <SelectItem value="05:30">05:30 AM</SelectItem>
                      <SelectItem value="06:00">06:00 AM</SelectItem>
                      <SelectItem value="06:30">06:30 AM</SelectItem>
                      <SelectItem value="07:00">07:00 AM</SelectItem>
                      <SelectItem value="07:30">07:30 AM</SelectItem>
                      <SelectItem value="08:00">08:00 AM</SelectItem>
                      <SelectItem value="08:30">08:30 AM</SelectItem>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="09:30">09:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="11:30">11:30 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="12:30">12:30 PM</SelectItem>
                      <SelectItem value="13:00">01:00 PM</SelectItem>
                      <SelectItem value="13:30">01:30 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="14:30">02:30 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="15:30">03:30 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="16:30">04:30 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                      <SelectItem value="17:30">05:30 PM</SelectItem>
                      <SelectItem value="18:00">06:00 PM</SelectItem>
                      <SelectItem value="18:30">06:30 PM</SelectItem>
                      <SelectItem value="19:00">07:00 PM</SelectItem>
                      <SelectItem value="19:30">07:30 PM</SelectItem>
                      <SelectItem value="20:00">08:00 PM</SelectItem>
                      <SelectItem value="20:30">08:30 PM</SelectItem>
                      <SelectItem value="21:00">09:00 PM</SelectItem>
                      <SelectItem value="21:30">09:30 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="22:30">10:30 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                      <SelectItem value="23:30">11:30 PM</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
