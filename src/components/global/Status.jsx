"use client";
import React, { useState } from "react";

const Status = () => {
  const [status, setStatus] = useState("closed");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center mt-4">
        <div className="shadow-card flex h-auto w-[46px] items-center justify-center gap-1 flex-col rounded-md border bg-gray-100 py-1">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded ${
              status === "closed" ? "bg-red-500 text-white" : "text-body-color hover:bg-gray-100"
            }`}
            onClick={() => handleStatusChange("closed")}
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
              className="lucide lucide-circle-x"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded ${
              status === "open" ? "bg-green-500 text-white" : "text-body-color hover:bg-gray-100"
            }`}
            onClick={() => handleStatusChange("open")}
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
              className="lucide lucide-circle-check"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>

          {/* High Rush */}
          <span
            className={`flex h-9 w-9 items-center justify-center rounded ${
              status === "highRush"
                ? "bg-orange-500 text-white"
                : "text-body-color hover:bg-gray-100"
            }`}
            onClick={() => handleStatusChange("highRush")}
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
              className="lucide lucide-circle-alert"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </span>
        </div>
      </label>
    </>
  );
};

export default Status;
