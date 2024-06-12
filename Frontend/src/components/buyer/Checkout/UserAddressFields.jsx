// UserAddressFields.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import CustomButton, {
  CustomButton2,
} from "../../../custom-components/HoverButton";
import AddressForm from "./AddressForm";
import useCheckoutContext from "@/context/checkout/CheckoutContext";
import useSnackbar from "@/custom-components/notification/useSnackbar";

const UserAddressFields = ({ address, paymentType }) => {
  const { showSuccess, showError, showInfo, showWarning } = useSnackbar();

  const {
    selectedAddress,
    setSelectedAddress,
    addAddress,
    setAddAddress,
    deleteAddressField,
  } = useCheckoutContext();

  const handleDeleteAddress = async (addressId) => {
    const status = await deleteAddressField(addressId);
    if (status.success === true) {
      showSuccess(status.message, { autoHideDuration: 2000 });
    } else {
      showError(status.message, { autoHideDuration: 2000 });
    }
  };
  return (
    <>
      {paymentType === "cash" && (
        <>
          <h1 className="text-2xl font-bold text-[#916E4B] mt-6">
            Select your Address
          </h1>
          {address.map((addr, index) => (
            <div
              key={index}
              className={` z-0 relative w-[80%] sm:w-[70%] md:w-[50%] rounded-xl flex flex-col p-4 my-2 bg-[#C7AA8C] text-white ${
                selectedAddress === index ? "border-2 border-black" : ""
              }`}
            >
              <MdDeleteForever
                onClick={() => handleDeleteAddress(addr._id)}
                size={30}
                className=" text-[#916E4B] absolute right-0 mx-6 mt-4 top-0 hover:text-[#ff000067] duration-200"
              />
              <h1 className="font-bold text-xl mb-2">Address: {index + 1}</h1>

              <div className="flex justify-between text-[#f3dac1]">
                <div>
                  <p><b className="">City:</b> {addr.city}</p>
                  <p><b className="">Area:</b> {addr.area}</p>
                </div>

                <div>
                  <p><b className="">Postal Code:</b> {addr.zip_code}</p>
                  <p><b className="">Contact:</b> {addr.email}</p>
                </div>

                <button
                  className="mr-[12px] pt-6 hover:text-[#916E4B] duration-200"
                  onClick={() =>
                    setSelectedAddress(selectedAddress === index ? null : index)
                  }
                >
                  {selectedAddress === index ? (
                    <TiTick size={25} />
                  ) : (
                    <ImCross size={20} />
                  )}
                </button>
              </div>
            </div>
          ))}
          <b className="text-color1">Address: {selectedAddress+1} selected</b>
          {addAddress && <AddressForm />}
          {!addAddress && (
            <CustomButton2
            
              onClick={() => setAddAddress(true)}
              className="w-[300px] bg-color3  text-color5"
            >
              Add Address
            </CustomButton2>
          )}
        </>
      )}
    </>
  );
};

export default UserAddressFields;

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
