"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

const UploadedImages = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchXeroxStoreImages = async () => {
      try {
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

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  const handleDeleteImage = (index) => {
    console.log(`Deleting image at index ${index}`);
  };

  return (
    <section className="w-full bg-white h-fit px-6 py-6">
      <div>
        <h3 className="text-[#1A181E] font-medium">Uploaded Images</h3>
        <p className="text-[#808080] text-sm">
          Your uploaded images will be displayed on your store.
        </p>
      </div>
      {isLoading ? (
        <>
          <div className="w-full mt-6 h-28 flex items-center justify-center ">
            <ClipLoader color="blue" loading={isLoading} size={30} />
          </div>
        </>
      ) : (
        <div className="w-full mt-6 flex items-center gap-12">
          {uploadedImages?.map((image, index) => (
            <div
              key={index}
              className="relative w-28 h-28 rounded-md overflow-hidden"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                alt="uploaded image"
                className="w-28 h-28 object-cover rounded-md "
              />

              {hoveredImageIndex === index && (
                <div className="absolute top-0 right-0 p-1.5 w-full h-full bg-black/[0.3] text-white  flex ">
                  <div
                    className="cursor-pointer h-5 w-5 flex items-center justify-center p-0.5 rounded-full bg-white text-gray-800"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UploadedImages;
