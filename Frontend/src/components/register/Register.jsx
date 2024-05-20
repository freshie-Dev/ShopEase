import React from "react";


import Form from "./Form";
import bg from "../../assets/register-bg.jpg";

const Register = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        // backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="p-3 h-screen flex flex-row  items-center justify-center "
    >
      <div className="flex justify-center items-center md:w-[50%]">
        <Form />
      </div>
      <div className="w-[50%] hidden md:block">
      </div>
    </div>
  );
};

export default Register;
