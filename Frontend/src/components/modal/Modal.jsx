import React, { useState } from "react";
import styled from "styled-components";
import { useStyleContext } from "../../context/style-context/StyleContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import selectSchema from "../register/selectSchema";
import { useUserContext } from "../../context/user-context/UserContextProvider";
import { BiSolidHide, BiSolidShow } from "react-icons/bi"; // Import icons

const Modal = () => {
  const { openModal, setOpenModal, changeField, setChangeField } =
    useStyleContext();
  const { UpdateField, verifyOTP } = useUserContext();

  const [tempPassword, setTempPassword] = useState();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setOpenModal(false);
    }
  };

  const onSubmit = async (values, action) => {
    if (!values.OTP) {
      const status = await UpdateField(values); //1
      if (status.changedField === "username") {
        alert("Username Changed");
        action.resetForm();
        setOpenModal(false);
      } else if (status.changedField === "password") {
        setTempPassword(values.Password);
        action.resetForm();
        setChangeField("OTP");
      }
    } else {
      const status = await verifyOTP({ OTP: values.OTP, tempPassword });
      if (status === true) {
        action.resetForm();
        setOpenModal(false);
        alert("Password Changed");
      } else {
        alert("Wrong OTP");
      }
    }
  };

  const username = {
    Username: "",
  };
  const password = {
    Password: "",
  };
  const OTP = {
    OTP: "",
  };

  const initialValues =
    changeField === "Password"
      ? password
      : changeField === "Username"
      ? username
      : changeField === "OTP"
      ? OTP
      : null;

  const CustomInputComponent = ({
    field,
    form: { touched, errors },
    ...props
  }) => (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (openModal)
    return (
      <LocalStyles>
        <div onClick={handleClick} className="overlay ">
          <div className="modal-container flex flex-col justify-center items-center p-2 bg-[#D9A470] border-[2px] rounded-md border-[#916437] w-[400px] md:w-[600px]">
            <div className="w-full ">
              <p
                onClick={() => setOpenModal(false)}
                className=" float-right mr-3 cursor-pointer"
              >
                x
              </p>
            </div>
            <h1 className="text-[1.4rem] w-full text-center bg-black text-[#D9A470] my-1 rounded-md p-2">
              {changeField === "Password"
                ? "Set Password"
                : changeField === "Username"
                ? "Set Username"
                : "Enter OTP"}
            </h1>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={() => {
                return Yup.object(selectSchema(null, changeField));
              }}
              errors
              touched
            >
              <Form className="w-full">
                {changeField === "Username" ? (
                  <Field
                    type="text"
                    name="Username"
                    placeholder={`Enter ${changeField}`}
                    className="w-full text-center h-[40px] py-2 px-4 text-[1.2rem] focus:outline-none rounded-md"
                  />
                ) : changeField === "Password" ? (
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="Password"
                      placeholder={`Enter ${changeField}`}
                      className="w-full text-center h-[40px] py-2 px-4 text-[1.2rem] focus:outline-none rounded-md"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
                    >
                      {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                    </span>
                  </div>
                ) : changeField === "OTP" ? (
                  <Field
                    type="text"
                    name="OTP"
                    component={CustomInputComponent}
                    placeholder={`Enter ${changeField}`}
                    className="w-full text-center h-[40px] py-2 px-4 text-[1.2rem] focus:outline-none rounded-md"
                  />
                ) : null}

                <div>
                  <ErrorMessage name={changeField} />
                </div>
                <button
                  type="submit"
                  className="text-[#000] text-[1.4rem] font-bold rounded-md bg-[#eee1c8] w-full py-4 mt-1"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </LocalStyles>
    );
};

export default Modal;

const LocalStyles = styled.div`
  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
