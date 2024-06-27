"use client";
import React, { useState } from "react";

const initialPricingRules = [];

const PricingRules = () => {
  const [pricingRules, setPricingRules] = useState(initialPricingRules);
  const [selectedPaperSize, setSelectedPaperSize] = useState("A4");
  const [pageCount, setPageCount] = useState("");
  const [pricePerPage, setPricePerPage] = useState("");

  const handlePaperSizeChange = (event) => {
    setSelectedPaperSize(event.target.value);
  };

  const handlePageCountChange = (event) => {
    setPageCount(event.target.value);
  };

  const handlePricePerPageChange = (event) => {
    setPricePerPage(event.target.value);
  };

  const handleAddPricingRule = () => {
    setPricingRules((prevRules) => [
      ...prevRules,
      {
        paperSize: selectedPaperSize,
        pageCount: pageCount,
        pricePerPage: pricePerPage,
      },
    ]);
    setPageCount("");
    setPricePerPage("");
  };

  return (
    <div className="w-full grid grid-cols-2">
      <form className="w-full">
        <div className="w-full flex flex-wrap -mx-3 mb-6">
          <div className="w-full grid grid-cols-1">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                For
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />

                <div className="flex items-center gap-2">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Pages
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />

                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />
                  <div className="flex items-center gap-2">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Cost
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      For
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricingRules;
