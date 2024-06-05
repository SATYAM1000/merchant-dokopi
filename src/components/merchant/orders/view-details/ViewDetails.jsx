import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ReceivedDocument from "./ReceivedDocument";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const ViewDetails = () => {
  return (
    <section className="mt-6 w-full h-full">
      <ScrollArea className="h-[calc(100vh-120px)] w-full rounded-md border">
        <div>
          <div className="bg-white sticky top-0 p-4">
            <h4 className="mb-0 text-[15px] font-medium leading-none sticky ">
              Received Documents
            </h4>
          </div>
          {tags.map((tag) => (
            <>
              <div key={tag} className="text-sm p-4">
                <ReceivedDocument />
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ViewDetails;
