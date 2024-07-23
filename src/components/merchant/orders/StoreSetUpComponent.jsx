"use client";
import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
const steps = [
  {
    label: "Step 1: Basic Information",
    description: "Provide basic information about your store.",
    route: "/settings/store-details",
  },
  {
    label: "Step 2: Upload Store Images",
    description: "Upload high-quality images of your store.",
    route: "/settings/store-images",
  },
  {
    label: "Step 3: Set Store Hours",
    description: "Set the opening and closing hours of your store.",
    route: "/settings/store-timing",
  },
  {
    label: "Step 4: Set Store Pricing",
    description: "Set pricing for different services offered by your store.",
    route: "/settings/pricing",
  },
];
import { useCurrentUser } from "@/hooks/use-current-user";
import { BounceLoader } from "react-spinners";

const StoreSetUpComponent = ({
  storeSetUpActiveStep: storeSetUpActiveStep,
}) => {

  if (storeSetUpActiveStep === undefined || storeSetUpActiveStep === null) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col bg-gray-100">
        <BounceLoader color="blue" size={80} />
        <div className="flex flex-col mt-4 text-center">
          <p className="text-gray-800 text-sm font-medium">
            Please wait a moment...
          </p>
          <p className="text-gray-800 text-sm font-medium">
            We're setting up your store.
          </p>
        </div>
      </div>
    );
  }
  const user = useCurrentUser();
  const [activeStep, setActiveStep] = useState(storeSetUpActiveStep);
  useEffect(() => {
    setActiveStep(storeSetUpActiveStep);
  }, [storeSetUpActiveStep]);
  const router = useRouter();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepClick = (route) => {
    router.push(route);
  };

  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
      className="w-full max-w-3xl h-fit rounded-md p-12 bg-white shadow"
    >
      <div>
        <h2 className="font-medium text-[28px]">
          Complete your store setup...
        </h2>
        <p className="text-[#4D4D4D] mt-2">
          Follow these steps to get your store ready for operation.
        </p>
      </div>
      <Stepper activeStep={activeStep} orientation="vertical" className="mt-6">
        {steps.map((step, index) => (
          <Step key={step.label} completed={activeStep > index}>
            <StepLabel>
              <span className="text-[#1A181E] font-normal text-[16px]">
                {step.label}
              </span>
            </StepLabel>
            <StepContent>
              <Typography>
                <span className="text-[14px] text-[#808080]">
                  {step.description}
                </span>
              </Typography>
              <Link
                href={step.route}
                className="mt-2 font-medium text-[14px] text-[#1976d2] underline underline-offset-4"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </Link>
              {activeStep > index && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={handleNext}
                  className="mt-2 ml-2"
                >
                  Next
                </Button>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </motion.div>
  );
};

export default StoreSetUpComponent;
