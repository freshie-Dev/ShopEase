import { ErrorMessage, Field } from 'formik';
import React from 'react'

const InputField = ({ label, id, name, type, className }) => (
    <label htmlFor={id}>
      <p className={`flex gap-[4px] ${className}`}>{label}</p>
      <Field type={type} id={id} name={name} />
      <ErrorMessage className="text-red-600" name={name} component="div" />
    </label>
  );

export default InputField