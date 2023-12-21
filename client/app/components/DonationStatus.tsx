"use client";
import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const DonationStatus = () => {
  // My individual contributions
  const [myDonationAmount, setMyDonationAmount] = useState(0);
  // Total contributions by the group
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    socket.on("donate", ({ previousAmount, amountDonated }) => {
      // Tells you what to do with the event when listened to
      setTotalDonated(previousAmount + amountDonated);
    });
  }, []);

  function updateTotal(amountDonated: number) {
    // emit the donate event and inform all listeners of the new value
    socket.emit("donate", { previousAmount: totalDonated, amountDonated });
    setTotalDonated((value) => value + amountDonated);
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        <Counter
          title={"Donate here!"}
          myTotal={myDonationAmount}
          groupTotal={totalDonated}
          onChange={(amountDonated: number) => {
            updateTotal(amountDonated);
            setMyDonationAmount((value) => value + amountDonated);
          }}
        />
        <div>Amount I've donated: ${myDonationAmount}</div>
        <div>Total amount: ${totalDonated}</div>
      </div>
    </>
  );
};

export default DonationStatus;
