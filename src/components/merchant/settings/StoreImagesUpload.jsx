"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const StoreImagesUpload = ({ setUploadedImages, uploadedImages }) => {
  const currentUser = useCurrentUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileExtension = file?.name.split(".").pop();

    if (
      fileExtension !== "jpg" &&
      fileExtension !== "png" &&
      fileExtension !== "jpeg"
    ) {
      toast.error("Only .jpg, .png, and .jpeg files are allowed");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      if (uploadedImages.length >= 5) {
        toast.error("Maximum 5 images can be uploaded");
        setIsLoading(false);

        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${API_DOMAIN}/api/v1/merchant/store/store-images/${currentUser.storeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImage = response.data?.data;
      setUploadedImages([...uploadedImages, newImage]);

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error uploading image:", error);
    } finally {
      setPreviewImage(null);
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-white h-fit px-6 py-6">
      <div>
        <h3 className="text-[#1A181E] font-medium">Store Images</h3>
        <p className="text-[#808080] text-sm">
          Upload captivating images for your store.
        </p>
      </div>
      <div className="mt-6">
        <div>
          <label className="w-28 h-28 overflow-hidden flex flex-col items-center justify-center p-1 bg-white rounded border border-[#D9D9D9] cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="object-contain rounded overflow-hidden"
              />
            ) : (
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
            )}
            <span className="mt-4 text-xs text-gray-600 font-medium">
              {previewImage ? "Change Image" : "Upload Images"}
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="mt-6 w-full flex items-center justify-end">
        <Button size="sm" type="button" onClick={handleUpload}>
          {isLoading ? <ClipLoader color="white" size={20} /> : "Upload"}
        </Button>
      </div>
    </section>
  );
};

export default StoreImagesUpload;
