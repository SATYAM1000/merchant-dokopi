"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AddConditionModal = ({ isOpen, onClose, onSave }) => {
  const [conditionType, setConditionType] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [conditionPrice, setConditionPrice] = useState("");

  const handleSave = () => {
    onSave({ conditionType, conditionValue, conditionPrice });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded shadow-md"
      >
        <h3 className=" font-semibold mb-4">Add Condition</h3>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Condition Type
          </label>
          <Select
            onValueChange={(value) => setConditionType(value)}
            defaultValue={conditionType}
          >
            <SelectTrigger className="w-full font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  ">
              <SelectValue placeholder="Select Condition Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="quantity">Quantity</SelectItem>
                <SelectItem
                  value="paper_type"
                >
                  Paper Type
                </SelectItem>
                <SelectItem value="urgency">Urgency</SelectItem>
                <SelectItem value="double_sided">Double Sided</SelectItem>
                <SelectItem value="binding">Binding</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Condition Value:
          </label>

          <input
            type="text"
            value={conditionValue}
            onChange={(e) => setConditionValue(e.target.value)}
            className="mt-1 appearance-none w-full font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Condition Price:
          </label>
          <input
            type="number"
            value={conditionPrice}
            onChange={(e) => setConditionPrice(e.target.value)}
            className="mt-1 appearance-none w-full font-medium text-[13px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
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
  );
};

export default AddConditionModal;
