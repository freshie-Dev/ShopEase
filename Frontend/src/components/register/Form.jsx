import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
import selectSchema from "./selectSchema";

import { useUserContext } from "../../context/user-context/UserContextProvider";
import { useStyleContext } from "../../context/style-context/StyleContextProvider";
import { enqueueSnackbar } from "notistack";

import { BarLoader } from "react-spinners";
import bg from "@/assets/register-bg.jpg";

const Register = () => {
  const navigate = useNavigate();

  //! Importing from Contexts
  const { signUpUser, loginUser, isLoading, userState } = useUserContext();
  const { selectedUserType, formType, animateUserTypeInput, changeFormType } =
    useStyleContext();

  const registerInitialValues = {
    Username: "",
    Email: "",
    Password: "",
    Confirmpassword: "",
    usertype: "",
  };

  const loginInitialValues = {
    Username: "",
    Password: "",
  };

  // Select the appropriate initial values based on the form type
  const initialValues = formType ? registerInitialValues : loginInitialValues;

  const onSubmit = async (values, action) => {
    let status;
    if (formType) {
      status = await signUpUser(values);
    } else {
      status = await loginUser(values);
    }
    if (!status.success) {
      enqueueSnackbar(status.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }

    //TODO: alert user that login wasnt successfull
  };
  useEffect(() => {
    console.log("logged in user Info changed");
    let userType =
      userState.loggedInUserInfo && userState.loggedInUserInfo.usertype;
    console.log(userState.loggedInUserInfo);
    console.log(userType);
    if (userType && userType === "buyer") {
      navigate("/buyer/home");
    } else if (userType && userType === "seller") {
      navigate("/seller/dashboard/home");
    }
  }, [userState.loggedInUserInfo]);

  useEffect(() => {
    const schema = selectSchema(formType, null);
  }, [formType]);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="h-screen w-screen flex justify-center items-center"
    >
      <div className="md:w-[50%] flex justify-center">
        <div className="w-[380px] flex-col justify-center items-center bg-[#131314c4] border-[1px] border-[#574d43] rounded-md p-3  ">
          <h1 className=" text-5xl text-[#D9A470]  my-10  ">
            {formType ? "Register" : "Sign In"}
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={() => {
              return Yup.object(selectSchema(formType));
            }}
            errors
            touched
          >
            <Form className="flex flex-col justify-center items-center">
              <FormInput type="text" name="Username" />

              <FormInput type="password" name="Password" />
              {formType && (
                <>
                  <FormInput type="password" name="Confirmpassword" />

                  <FormInput type="text" name="Email" />
                  <div
                    className="   w-full flex mt-1 text-[#f5e6cb] text-[1.2rem] font-light gap-2"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <p className="w-[46%] glass-input p-4"> User type: </p>
                    <label
                      className={`w-[27%]  p-4 ] ${selectedUserType !== "buyer"
                          ? "glass-input"
                          : "bg-[#D9A470]"
                        }`}
                      onClick={() => animateUserTypeInput("buyer")}
                    >
                      <Field
                        className="opacity-0"
                        type="radio"
                        name="usertype"
                        value="buyer"
                      />
                      Buyer
                    </label>
                    <label
                      className={`w-[27%] p-4 ] ${selectedUserType !== "seller"
                          ? "glass-input"
                          : "bg-[#D9A470]"
                        }`}
                      onClick={() => animateUserTypeInput("seller")}
                    >
                      <Field
                        className="opacity-0"
                        type="radio"
                        name="usertype"
                        value="seller"
                      />
                      Seller
                    </label>
                  </div>
                </>
              )}
              <button
                className="text-[#000]  text-[1.4rem]   font-bold  rounded-md bg-[#eee1c8] w-full py-4 mt-5"
                type="submit"
              >
                {isLoading ? (
                  <BarLoader className="mx-auto" />
                ) : formType ? (
                  "Sign Up"
                ) : (
                  "Sign In"
                )}
              </button>
            </Form>
          </Formik>
          <div className="mt-3 text-center text-[#f5e6cb]">
            <p className="">
              {formType ? "Already registered?" : "Need to"}
              <span
                onClick={changeFormType}
                className=" cursor-pointer font-bold"
              >
                {formType ? " Login" : " Sign Up"}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] md:block hidden"></div>
    </div>
  );
};

export default Register;
