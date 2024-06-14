import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NotificationMessage from "./NotificationMessage";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const NotificationContainer = () => {
  return (
    <ScrollArea className="h-full w-full my-4 md:my-6 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag, index) => (
          <div key={tag + index}>
            <NotificationMessage />
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationContainer;
