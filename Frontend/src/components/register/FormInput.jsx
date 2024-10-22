import React, { useState } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const FormInput = ({ type, name, as }) => {
  const { values, handleChange, handleBlur, touched, errors } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false)
  const passInputType = type === "password" && showPassword ? "text" : type;
  return (
    <div className="flex flex-col w-full px-2 glass-input my-2">
      <div className="flex items-center">
        <Field
          className="  p-3  w-[100%] bg-transparent placeholder:text-[#a0a0a0] font-[300] text-[1.2rem] text-[#f5e6cb] focus:outline-none"
          id={name}
          as={as}
          type={passInputType}
          name={name}
          placeholder={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {type === "password" && (
          <span onClick={()=> setShowPassword(!showPassword)} className="cursor-pointer ml-2 text-[#f5e6cb]">
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </span>
        )}

      </div>
      {touched[name] && errors[name] && <p className="text-red-400 block px-3"> &#9432; {errors[name]}</p>}
    </div>
  );
};
// FormInput.defaultProps = {
//   textarea: false,
// };

export default FormInput;
