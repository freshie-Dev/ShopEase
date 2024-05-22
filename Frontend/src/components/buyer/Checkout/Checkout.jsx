import React, { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CustomButton from "../../../custom-components/HoverButton";

import styled from "styled-components";
import InputField from "./InputField";
import useCartContext from "../../../context/cart-context/CartContextProvider";
import { useUserContext } from "../../../context/user-context/UserContextProvider";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Checkout = () => {
  const { checkout, saveAddress } = useCartContext();
  const { userState } = useUserContext();
  console.log(userState);
  console.log(JSON.parse(localStorage.getItem("userinfo")).address);

  const loggedInUserAddress = JSON.parse(
    localStorage.getItem("userinfo")
  ).address;

  const [isAddressSame, setIsAddressSame] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    billingAddress:
      !isAddressSame && Yup.string().required("Billing address is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip code is required"),
    sameAddress: Yup.boolean(),
  });

  if (loggedInUserAddress !== "") {
    return (
      <div className=" flex flex-col justify-center items-center mt-[100px] py-[20px]  bg-[#FFE9D4]">
        <h1 className="text-2xl font-bold text-[#916E4B]">Select your Address</h1>
        {loggedInUserAddress.map((address, index) => {
          return (
            <div
              key={index}
              className={`w-[80%] sm:w-[70%] md:w-[50%]  rounded-xl flex flex-col p-4 my-2 bg-[#C7AA8C] text-white ${
                selectedAddress === index ? "border-2 border-black" : ""
              }`}
            >
              <h1 className="font-bold text-xl mb-2 ">Address: {index + 1}</h1>

              <div className="flex justify-between text-[#f3dac1]">
                <div className=" ">
                  <p>City: {address.city}</p>

                  <p>Area: {address.area}</p>
                </div>

                <div className=" text-[]">
                  <p>Postal code: {address.zip_code}</p>

                  <p>Contact: {address.email}</p>
                </div>

                <button
                  className={`bg-[#916E4B] flex justify-center items-center rounded-md h-[50px] w-[50px]  ${
                    selectedAddress === index ? "opacity-50" : ""
                  }`}
                  onClick={() => {
                    if (selectedAddress === index) {
                      setSelectedAddress(null);
                    } else {
                      setSelectedAddress(index);
                    }
                  }}
                >
                  {selectedAddress === index ? (
                    <TiTick size={25} />
                  ) : (
                    <ImCross size={20} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
        <CustomButton
          onClick={() => checkout()}
          type="submit"
          className=" w-[80%] sm:w-[70%] md:w-[50%]"
        >
          Checkout
        </CustomButton>
      </div>
    );
  } else {
    console.log("else is true");
    return (
      <LocalStyles>
        <Formik
          initialValues={{
            name: "",
            email: "",
            address: "",
            billingAddress: "",
            city: "",
            zip: "",
            sameAddress: false,
            //   cardName: "",
            //   cardNumber: "",
            //   cvv: "",
            //   expMonth: "",
            //   expYear: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Submit the form data here
            // console.log(values);
            await saveAddress(values);
            await checkout();
            // setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <>
              <Form className="mt-[100px] flex flex-col sm:flex-row  justify-center max-w-[800px] mx-auto">
                <div className="flex flex-col gap-2 sm:w-[50%] w-[100%] p-6">
                  <h1>Billing Address</h1>

                  <InputField
                    label="Full Name"
                    id="name"
                    name="name"
                    type="text"
                    className="shippibg"
                  />

                  <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="text"
                    className="shippibg"
                  />

                  <InputField
                    label="Address"
                    id="address"
                    name="address"
                    type="text"
                    className="shippibg"
                  />

                  {!isAddressSame && (
                    <InputField
                      label="Billing Address"
                      id="billing-address"
                      name="billingAddress"
                      type="text"
                      className="shippibg"
                    />
                  )}

                  <InputField
                    label="City"
                    id="city"
                    name="city"
                    type="text"
                    className="shippibg"
                  />

                  <InputField
                    label="Zip code"
                    id="zip"
                    name="zip"
                    type="text"
                    className="shippibg"
                  />

                  <div className="flex gap-2 items-center">
                    <label className=" " htmlFor="same-address">
                      <Field
                        className="h-[20px] mr-2 "
                        id="same-address"
                        type="checkbox"
                        checked={isAddressSame}
                        onClick={() => setIsAddressSame(!isAddressSame)}
                      />
                    </label>

                    <p className="shippibg">Shipping & Billing address same?</p>
                  </div>

                  <CustomButton
                    onClick={() => console.log("haha")}
                    type="submit"
                    className=" btn  "
                  >
                    Checkout
                  </CustomButton>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </LocalStyles>
    );
  }
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

{
  /* <div className="flex flex-col gap-2 sm:w-[50%] w-[100%] p-6">
<h1>Payment</h1>

<InputField
label="Name on Card"
id="cardName"
name="cardName"
type="text"
className="shippibg"
/>

<InputField
label="Credit card number"
id="cardNumber"
name="cardNumber"
type="text"
className="shippibg"
/>

<InputField
label="CVV"
id="cvv"
name="cvv"
type="text"
className="shippibg"
/>

<div className="flex gap-2">
<InputField
label="Exp Month"
id="expMonth"
name="expMonth"
type="text"
className="shippibg"
/>

<InputField
label="Exp Year"
id="expYear"
name="expYear"
type="text"
className="shippibg"
/>
  </div>
  <CustomButton type="submit" className=" btn  ">Checkout</CustomButton>
</div> */
}
// cardName: Yup.string().required("Card name is required"),
// cardNumber: Yup.string()
//   .required("Credit card number is required")
//   .min(13, "Must be at least 16 characters")
//   .max(19, "Must be at most 19 characters"),
// cvv: Yup.string()
//   .required("CVV is required")
//   .min(3, "Must be at least 3 characters")
//   .max(4, "Must be at most 4 characters"),
// expMonth: Yup.string()
//   .required("Exp month is required")
//   .length(2, "Must be 2 characters"),
// expYear: Yup.string()
//   .required("Exp year is required")
//   .length(2, "Must be 2 characters"),
