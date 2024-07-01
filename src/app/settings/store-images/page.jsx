import StoreImagesUpload from "@/components/merchant/settings/StoreImagesUpload";
import UploadedImages from "@/components/merchant/settings/UploadedImages";
import React from "react";

const StoreImagesUploadPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <StoreImagesUpload />
      <UploadedImages />
    </div>
  );
};

export default StoreImagesUploadPage;
