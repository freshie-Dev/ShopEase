import React from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";

const FormInput = ({ type, name, as }) => {
  const { values, handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <div className="flex flex-col w-full px-2 glass-input my-2">
      <Field
        className="cursive p-3  w-[100%] bg-transparent placeholder:text-[#a0a0a0] font-[300] text-[1.2rem] text-[#f5e6cb] focus:outline-none"
        id={name}
        as={as}
        type={type}
        name={name}
        placeholder={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched[name] && errors[name] && <p className="text-red-400 block px-3"> &#9432; { errors[name]}</p>}
    </div>
  );
};
// FormInput.defaultProps = {
//   textarea: false,
// };

export default FormInput;
