"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const StoreBankDetailsForm = () => {
  const currentUser = useCurrentUser();
  const [initialLoader, setInitialLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    branchAddress: "",
    ifscCode: "",
  });

  const [initialFormData, setInitialFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    branchAddress: "",
    ifscCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.accountHolderName = formData.accountHolderName
      ? ""
      : "Account Holder Name is required.";
    tempErrors.bankName = formData.bankName ? "" : "Bank Name is required.";
    tempErrors.accountNumber = formData.accountNumber
      ? ""
      : "Account Number is required.";
    tempErrors.branchAddress = formData.branchAddress
      ? ""
      : "Branch Address is required.";
    tempErrors.ifscCode = formData.ifscCode ? "" : "IFSC Code is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    setIsChanged(
      Object.keys(formData).some(
        (key) => formData[key] !== initialFormData[key]
      )
    );
  };

  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validate()) {
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/merchant/store/store-bank-details/${currentUser?.storeId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );

        toast.success(res.data?.msg || "Bank Details updated successfully");
      } else {
        console.log("Form validation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchBankDetails = async () => {
    try {
      setInitialLoader(true);
      const response = await axios.get(
        `${API_DOMAIN}/api/v1/merchant/store/store-bank-details/${currentUser?.storeId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );
      const data = response.data?.data;
      setFormData(data);
      setInitialFormData(data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    } finally {
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchBankDetails();
    }
  }, [currentUser]);

  return (
    <>
      {initialLoader ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <ClipLoader color="#1A181E" size={40} />
        </div>
      ) : (
        <form className="w-full mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full grid grid-cols-3">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="accountHolderName"
                >
                  Account Holder Name
                </label>
                <input
                  name="accountHolderName"
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  type="text"
                  autoComplete="off"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                />
                {errors.accountHolderName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.accountHolderName}
                  </p>
                )}
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="bankName"
                >
                  Bank Name
                </label>
                <input
                  name="bankName"
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  type="text"
                  autoComplete="off"
                  value={formData.bankName}
                  onChange={handleChange}
                />
                {errors.bankName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.bankName}
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="accountNumber"
                >
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  type="text"
                  autoComplete="off"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-xs italic">
                    {errors.accountNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full grid grid-cols-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="branchAddress"
                >
                  Branch Address
                </label>
                <input
                  name="branchAddress"
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  type="text"
                  autoComplete="off"
                  value={formData.branchAddress}
                  onChange={handleChange}
                />
                {errors.branchAddress && (
                  <p className="text-red-500 text-xs italic">
                    {errors.branchAddress}
                  </p>
                )}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="ifscCode"
                >
                  IFSC Code
                </label>
                <input
                  name="ifscCode"
                  className="appearance-none block w-full text-gray-700 border border-[#D9D9D9] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  type="text"
                  autoComplete="off"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
                {errors.ifscCode && (
                  <p className="text-red-500 text-xs italic">
                    {errors.ifscCode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <Button variant="default" type="submit" disabled={!hasChanges}>
              {loading ? <ClipLoader color="white" size={16} /> : "Save"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default StoreBankDetailsForm;
