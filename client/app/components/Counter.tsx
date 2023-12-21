"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  myTotal: number;
  groupTotal: number;
  onChange: (amountDonated: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, groupTotal, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(1); // Amount donated is always $1
  }, [onChange, groupTotal]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="font-light text-xl text-neutral-600">{groupTotal}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
