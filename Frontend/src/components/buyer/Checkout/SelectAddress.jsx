import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const SelectAddress = ({cardPayment, setCardPayment}) => {

  return (
    <>
      <label
        className={`flex my-2 justify-center items-center p-4 relative h-[50px] w-max rounded-full duration-300 ${
          cardPayment
            ? "bg-black text-[#d9a470]"
            : "text-black border-[1px] border-black"
        }`}
        htmlFor="remove-bg"
      >
        Cash on Delivery ?
        <div className="flex justify-center items-center w-[25px] h-[25px] absolute rounded-md right-[-30px] top-[13px] checked:bg-transparent bg-black">
          {cardPayment ? (
            <TiTick size={25} color="#d9a470" />
          ) : (
            <ImCross color="#d9a470" />
          )}
        </div>
        <input
          className="hidden"
          checked={cardPayment}
          onChange={() => setCardPayment(!cardPayment)}
          id="remove-bg"
          type="checkbox"
        />
      </label>
    </>
  );
};

export default SelectAddress;
