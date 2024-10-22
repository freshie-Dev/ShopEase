import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UserAddressFields from "./UserAddressFields";
import AddressForm from "./AddressForm";

import useCartContext from "../../../context/cart-context/CartContextProvider";
import useCheckoutContext from "@/context/checkout/CheckoutContext";
import CustomButton from "@/custom-components/HoverButton";
import useSnackbar from "@/custom-components/notification/useSnackbar";
import { useNavigate } from "react-router-dom";
import { BounceLoader, ClockLoader, GridLoader } from "react-spinners";

const Checkout = () => {
  const navigate = useNavigate()
  const { showError, showSuccess } = useSnackbar();

  const [onLoading, setOnLoading] = useState(false);

  const { emptyCart } = useCartContext();

  const {
    getAddress,
    address,
    setPaymentType,
    paymentType,
    cardCheckout,
    cashCheckout,
    selectedAddress,
  } = useCheckoutContext();

  const handleCheckout = async () => {
    if (paymentType === "cash") {
      if (selectedAddress === null) {
        showError("Please select an address", { autoHideDuration: 1000 });
        return;
      }
      setOnLoading(true)
      const status = await cashCheckout();
      if (status.result) {
        localStorage.setItem('cart', new Array());
        emptyCart();
        setOnLoading(false)
        showSuccess(status.message, { autoHideDuration: 2000 });
        navigate('/buyer/products')
      } else {
        showError(status.message, { autoHideDuration: 2000 });
        setOnLoading(false)
      }
    } else {
      setOnLoading(true)
      const status = await cardCheckout();
      if (status.success) {
        window.location.href = status.paymentUrl;

      } else {
        showError(status.message, { autoHideDuration: 2000 });
        setOnLoading(false)
      }
    }
  };

  useEffect(() => {
    getAddress();
    console.log(address);
  }, []);
  if (!address) return <div className="flex flex-col justify-center items-center mt-[100px] min-h-[60vh] py-[20px] bg-[#FFE9D4]">
    <GridLoader
      color="#000000"
      size={15}
    />
  </div>
  return (
    <DIV className=" flex flex-col justify-center items-center mt-[100px] min-h-[60vh] py-[20px] bg-[#FFE9D4]">
      <h1 className="text-2xl font-bold text-[#916E4B] mb-4">
        Select your Payment Mode
      </h1>
      <div className="flex w-[80%] sm:w-[70%] md:w-[50%] ">
        <button
          onClick={() => setPaymentType("cash")}
          style={{
            background: paymentType === "cash" && "#eed2b7",
            fontWeight: paymentType === "cash" && "bold",
          }}
          className="addressButton"
        >
          Cash on Delivery
        </button>
        <button
          onClick={() => setPaymentType("card")}
          style={{
            background: paymentType === "card" && "#eed2b7",
            fontWeight: paymentType === "card" && "bold",
          }}
          className="addressButton"
        >
          Card
        </button>
      </div>
      {address.length > 0 ? (
        <>
          <UserAddressFields address={address} paymentType={paymentType} />
        </>
      ) : (
        paymentType === "cash" && <AddressForm />
      )}

      <CustomButton
        onClick={handleCheckout}
        // disabled={selectedAddress === null ? true : false}
        type="submit"
        className="w-[80%] sm:w-[70%] md:w-[50%] my-6 flex justify-center"
      >
        {paymentType === "cash" && onLoading ? <ClockLoader size={25} /> : paymentType === "cash" && !onLoading ? "Checkout" : paymentType === "card" && onLoading ? <ClockLoader size={25} /> : "proceed"}
      </CustomButton>
    </DIV>
  );
};

export default Checkout;

const LocalStyles = styled.div`
  .btn {
    margin: 10px 0 10px;
  }
  input {
    width: 100%;
  }
  p {
    color: #352d24;
  }
  h1 {
    font-size: clamp(20px, 3vw, 25px);
    font-weight: bold;
    color: #ffffff;
    background-color: black;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
  }
`;
const DIV = styled.div`
  .addressButton {
    width: 50%;
    border: #86592c 2px solid;
    padding: 7px;
    margin: 0 0.5rem;
    border-radius: 5px;
    color: #9c754d;
  }
`;
