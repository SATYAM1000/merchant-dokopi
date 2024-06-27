import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ReceivedDocument from "./ReceivedDocument";


const ViewDetails = ({ RecvdDocument = [] }) => {
  return (
    <section className="mt-6 w-full h-full">
      <ScrollArea className="h-[calc(100vh-120px)] w-full rounded-md border">
        <div>
          <div className="bg-white sticky top-0 p-4 w-full z-50 border-b shadow-md">
            <h4 className="mb-0 text-[15px] font-medium leading-none">
              Received Documents
            </h4>
          </div>
          {RecvdDocument.length && RecvdDocument.map((docs) => (
            <div key={docs._id}>
              <div className="text-sm">
                <ReceivedDocument docs={docs} />
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ViewDetails;
