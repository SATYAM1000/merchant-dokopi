"use client";
import React, { useState, useEffect, startTransition } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const GettingStartedComponent = () => {
  const [showLoader, setShowLoader] = useState(false);
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);
  const [formData, setFormData] = useState({
    storeName: "",
    phoneNumber: "",
    storeEmail: currentUser?.email,
    userId: currentUser?.id,
  });

  const [errors, setErrors] = useState({
    storeName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (formData.storeName.trim() === "") {
      errors.storeName = "Store Name is required";
    }
    if (
      formData.phoneNumber.trim() === "" ||
      formData.phoneNumber.length < 10 ||
      formData.phoneNumber.length > 10 ||
      isNaN(formData.phoneNumber)
    ) {
      errors.phoneNumber = "Phone Number is required";
    }
    setErrors(errors);
    try {
      if (Object.keys(errors).length === 0) {
        console.log(formData);
        setLoading(true);
        const res = await axios.post(
          `${API_DOMAIN}/api/v1/merchant/store/get-started`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${await fetchAccessToken()}`,
            },
          }
        );

        if (!res.data.success) {
          toast.error(res.data.msg);
          return;
        }

        setLoading(false);
        setShowConfetti(true);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setRedirectTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success]);

  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleSignOut = () => {
    startTransition(() => {
      setShowLoader(true);
      signOut({
        callbackUrl: "/auth/sign-in",
      }).finally(() => {
        setShowLoader(false);
      });
    });
  };

  return (
    <section className="w-full overflow-hidden h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[448px] max-h-[512px] bg-white rounded-3xl p-12 shadow-lg"
      >
        {success ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-green-500 text-6xl mb-4">✔</div>
            <h1 className="text-2xl font-semibold mb-2 text-gray-800">
              Congratulations!
            </h1>
            <p className="text-gray-500 mb-4">Store created successfully.</p>
            <p className="text-gray-500 ">
              Redirecting to dashboard in {redirectTimer} seconds...
            </p>
          </div>
        ) : (
          <div>
            <div>
              <h1 className="text-[28px] font-semibold text-gray-800">
                Dokopi
              </h1>
              <p className="text-gray-500">Enter your business details</p>
            </div>
            <div className="mt-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                    htmlFor="storeName"
                  >
                    Store Name
                  </label>
                  <input
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    className={`appearance-none block w-full text-gray-700 border ${
                      errors.storeName ? "border-red-500" : "border-black/[0.4]"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3`}
                    type="text"
                    autoComplete="off"
                  />
                  {errors.storeName && (
                    <p className="text-red-500 text-xs italic mb-2">
                      {errors.storeName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`appearance-none block w-full text-gray-700 border ${
                      errors.phoneNumber
                        ? "border-red-500"
                        : "border-black/[0.4]"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3`}
                    type="text"
                    autoComplete="off"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs italic mb-2">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-500 mt-5 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <p className="text-white font-medium text-[14px]">
                    {loading ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      "Complete"
                    )}
                  </p>
                </button>
              </form>

              <p className="text-gray-500 text-xs mt-4">
                Use a different email?{" "}
                <button
                  className="text-indigo-500 underline underline-offset-2"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </p>
            </div>
          </div>
        )}
      </motion.div>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width }
          height={windowDimensions.height }
          recycle={false}
        />
      )}
    </section>
  );
};

export default GettingStartedComponent;
