"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AddConditionModal = ({ isOpen, onClose, onSave }) => {
  const [conditionType, setConditionType] = useState("");
  const [conditionOperator, setConditionOperator] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [conditionPrice, setConditionPrice] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!conditionType) newErrors.conditionType = "Condition Type is required";
    if (!conditionOperator)
      newErrors.conditionOperator = "Operator is required";
    if (!conditionValue)
      newErrors.conditionValue = "Condition Value is required";
    if (!conditionPrice) {
      newErrors.conditionPrice = "Condition Price is required";
    } else if (isNaN(conditionPrice) || parseFloat(conditionPrice) <= 0) {
      newErrors.conditionPrice = "Condition Price must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        conditionType,
        conditionOperator,
        conditionValue,
        conditionPrice,
      });
    
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-gray-500 bg-opacity-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 max-w-sm w-full rounded-lg relative shadow-md"
          >
            <div>
              <X
                className="w-7 h-7 cursor-pointer absolute right-6 top-4 p-1 flex items-center justify-center bg-gray-100 rounded-sm hover:bg-gray-200"
                onClick={onClose}
              />
            </div>
            <h3 className="font-semibold mb-4">Add Condition</h3>
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Condition Type
              </label>
              <Select
                onValueChange={(value) => setConditionType(value)}
                defaultValue={conditionType}
              >
                <SelectTrigger className="w-full font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <SelectValue placeholder="Select Condition Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="quantity">Quantity</SelectItem>
                    <SelectItem value="urgency">Urgency</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.conditionType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.conditionType}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Operator
              </label>
              <Select
                onValueChange={(value) => setConditionOperator(value)}
                defaultValue={conditionOperator}
              >
                <SelectTrigger className="w-full font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <SelectValue placeholder="Select Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="greater_than">Greater than</SelectItem>
                    <SelectItem value="less_than">Less than</SelectItem>
                    <SelectItem value="equal_to">Equal to</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.conditionOperator && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.conditionOperator}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Condition Value
              </label>
              <input
                type="text"
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                className="mt-1 appearance-none w-full font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.conditionValue && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.conditionValue}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Condition Price
              </label>
              <input
                type="number"
                value={conditionPrice}
                onChange={(e) => setConditionPrice(e.target.value)}
                className="mt-1 appearance-none w-full font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.conditionPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.conditionPrice}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button size="sm" variant="destructive" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} size="sm" className="px-4 ml-4">
                Save
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddConditionModal;
