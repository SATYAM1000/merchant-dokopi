"use client";
import React, { useEffect, useState } from "react";
import StoreImagesUpload from "./StoreImagesUpload";
import UploadedImages from "./UploadedImages";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

const StoreImageComponent = ({ cloudFrontURL }) => {
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchXeroxStoreImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_DOMAIN}/api/v1/merchant/store/store-images/${currentUser.storeId}`,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );
        const data = response.data?.data;
        setUploadedImages(data);
      } catch (error) {
        console.error("Error fetching xerox store images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchXeroxStoreImages();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <StoreImagesUpload
        setUploadedImages={setUploadedImages}
        uploadedImages={uploadedImages}
      />
      {!isLoading ? (
        <UploadedImages
          cloudFrontURL={cloudFrontURL}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      ) : (
        <div className="w-full bg-white h-48 px-6 py-6 flex items-center justify-center">
          <ClipLoader color="#1A181E" size={40} />
        </div>
      )}
    </div>
  );
};

export default StoreImageComponent;
