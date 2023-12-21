"use client";
import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const DonationStatus = () => {
  const [amountReceived, setAmountReceived] = useState(0);

  useEffect(() => {
    socket.on("donate", ({ previousAmount, amountDonated }) => {
      //   setAmountReceived(amountReceived);
      setAmountReceived(previousAmount + amountDonated);
    });
  }, []);

  function updateTotal(amountDonated: number) {
    // emit the donate event and inform all listeners of the new value
    socket.emit("donate", { previousAmount: amountReceived, amountDonated });
    setAmountReceived((value) => value + amountDonated);
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        <Counter
          title={"Donate here!"}
          subtitle={""}
          value={amountReceived}
          onChange={(newDonationAmount: number) => {
            updateTotal(1);
          }}
        />
        <div>Amount donated: ${amountReceived}</div>
      </div>
    </>
  );
};

export default DonationStatus;
