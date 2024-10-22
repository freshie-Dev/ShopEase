import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import InputField from "./InputField";
import CustomButton, {
  CustomButton2,
} from "../../../custom-components/HoverButton";
import useCheckoutContext from "@/context/checkout/CheckoutContext";
import useSnackbar from "@/custom-components/notification/useSnackbar";

const AddressForm = () => {
  const { showSuccess, showError, showInfo, showWarning } = useSnackbar();

  const { isAddressSame, setIsAddressSame, setAddAddress, saveAddress } =
    useCheckoutContext();

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
  const initialValues = {
    name: "",
    email: "",
    address: "",
    billingAddress: "",
    city: "",
    zip: "",
    sameAddress: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const status = await saveAddress(values);
    if (status.success === true) {
      showSuccess(status.message);
      setAddAddress(false)
    } else {
      showError(status.message)
    }
    resetForm();
  };
  return (
    <DIV className="my-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className=" p-4 rounded-xl bg-[#BB9773] flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-[white] ">
              Enter your Address
            </h1>

            <InputField
              label="Full Name"
              id="name"
              name="name"
              type="text"
              className="input "
            />

            <InputField
              label="Email"
              id="email"
              name="email"
              type="text"
              className="input"
            />

            <InputField
              label="Address"
              id="address"
              name="address"
              type="text"
              className="input"
            />

            {!isAddressSame && (
              <InputField
                label="Billing Address"
                id="billing-address"
                name="billingAddress"
                type="text"
                className="input"
              />
            )}

            <InputField
              label="City"
              id="city"
              name="city"
              type="text"
              className="input"
            />

            <InputField
              label="Zip code"
              id="zip"
              name="zip"
              type="text"
              className="input"
            />

            {/* <div className="flex gap-2 items-center justify-center my-4">
              <label className=" " htmlFor="same-address">
                <Field
                  className="h-[20px] mr-2 "
                  id="same-address"
                  type="checkbox"
                  checked={isAddressSame}
                  onClick={() => setIsAddressSame(!isAddressSame)}
                />
              </label>

              <p className="">Shipping & Billing address same?</p>
            </div> */}

            <CustomButton
              type="submit"
              className="btn text-white border-[1px] hover:border-black border-white  bg-color2"
            >
              Save Address
            </CustomButton>

            <CustomButton
              type="button"
              onClick={() => setAddAddress(false)}
              className="btn text-white border-[1px] hover:border-red-300 hover:bg-red-400 hover:text-white border-white  bg-color2"
            >
              Cancel
            </CustomButton>
          </Form>
        )}
      </Formik>
    </DIV>
  );
};

export default AddressForm;

const DIV = styled.div`
  .btn {
    margin: 10px 0 10px;
  }
  input {
    width: 100%;
    border-radius: 5px;
    color: #a17c2b;
    background-color: #d4b99d;
    padding: 8px 6px;
  }
  .input {
    color: white;
  }
`;
