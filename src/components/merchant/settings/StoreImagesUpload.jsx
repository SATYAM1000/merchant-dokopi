import { Button } from "@/components/ui/button";
import React from "react";

const StoreImagesUpload = () => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6 ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Images</h3>
        <p className="text-[#808080] text-sm">
          Upload captivating images for your store.
        </p>
      </div>
      <div className="mt-6">
        <div>
          <label className="w-32 h-32 flex flex-col items-center justify-center p-3 bg-white rounded border-2 border-black/[0.12] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-image-up w-10 h-10 text-gray-600"
            >
              <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
              <path d="m14 19.5 3-3 3 3" />
              <path d="M17 22v-5.5" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <span className="mt-2 text-xs text-gray-600 font-medium">
              Upload Images
            </span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-6 w-full flex items-center justify-end">
        <Button type="submit">
          Save
        </Button>
      </div>
    </section>
  );
};

export default StoreImagesUpload;
