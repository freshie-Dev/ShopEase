// import React from "react";
// import { FaRegAddressCard } from "react-icons/fa6";
// import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
// import { LiaCitySolid } from "react-icons/lia";
// import { IoLocationOutline } from "react-icons/io5";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import styled from "styled-components";

// const Checkout = () => {
//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required("Full Name  required"),
//         email: Yup.string().email("Invalid email").required("Email  required"),
//         address: Yup.string().required("Address is required"),
//         billingAddress: Yup.string().required("Billing address required"),
//         city: Yup.string().required("City is required"),
//         zip: Yup.string().required("Zip code  required"),
//         sameAddress: Yup.boolean(),
//         cardName: Yup.string().required("Card name required"),
//         cardNumber: Yup.string()
//           .required("Credit card number required")
//           .min(13, "Must be at least 16 characters")
//           .max(19, "Must be at most 19 characters"),
//         cvv: Yup.string()
//           .required("CVV  required")
//           .min(3, "Must be at least 3 characters")
//           .max(4, "Must be at most 4 characters"),
//         expMonth: Yup.string()
//           .required("Exp month  required")
//           .length(2, "Must be 2 characters"),
//         expYear: Yup.string()
//           .required("Exp year  required")
//           .length(2, "Must be 2 characters"),
//       });

//   return (
//     <LocalStyles>
//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           address: "",
//           billingAddress: "",
//           city: "",
//           zip: "",
//           sameAddress: false,
//           cardName: "",
//           cardNumber: "",
//           cvv: "",
//           expMonth: "",
//           expYear: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           // Submit the form data here
//           console.log(values);
//           setSubmitting(false);
//         }}
//       >
//         {({ isSubmitting, isValid }) => (
//           <Form className="mt-[100px] flex flex-col sm:flex-row  justify-center max-w-[800px] mx-auto">
//             <div className="flex flex-col gap-2 sm:w-[50%] w-[100%] p-6">
//               <h1>Billing Address</h1>

//               <label htmlFor="name">
//                 <p className="flex gap-[4px]">
//                   <MdDriveFileRenameOutline size={20} /> Full Name
//                 </p>
//                 <Field type="text" id="name" name="name" />
//                 <ErrorMessage className = "text-red-600" name="name" component="div" />
//               </label>

//               <label htmlFor="email">
//                 <p className="flex gap-[4px]">
//                   <MdAlternateEmail size={20} /> Email
//                 </p>
//                 <Field type="text" id="email" name="email" />
//                 <ErrorMessage className = "text-red-600" name="email" component="div" />
//               </label>

//               <label htmlFor="address">
//                 <p className="flex gap-[4px]">
//                   <FaRegAddressCard size={20} /> Address
//                 </p>
//                 <Field type="text" id="address" name="address" />
//                 <ErrorMessage className = "text-red-600" name="address" component="div" />
//               </label>

//               <label htmlFor="billing-address">
//                 <p className="flex gap-[4px]">
//                   <FaRegAddressCard size={20} /> Billing Address
//                 </p>
//                 <Field type="text" id="billing-address" name="billingAddress" />
//                 <ErrorMessage className = "text-red-600"  name="billingAddress" component="div" />
//               </label>

//               <label htmlFor="city">
//                 <p className="flex gap-[4px]">
//                   <LiaCitySolid size={20} /> City
//                 </p>
//                 <Field type="text" id="city" name="city" />
//                 <ErrorMessage className = "text-red-600" name="city" component="div" />
//               </label>

//               <label htmlFor="zip">
//                 <p className="flex gap-[4px]">
//                   <IoLocationOutline size={20} /> Zip code
//                 </p>
//                 <Field type="text" id="zip" name="zip" />
//                 <ErrorMessage className = "text-red-600" name="zip" component="div" />
//               </label>

//               <div className="flex gap-2 items-center">
//                 <label className="" htmlFor="same-address">
//                   <Field
//                     className="h-[20px] mr-2 "
//                     id="same-address"
//                     type="checkbox"
//                     name="sameAddress"
//                   />
//                 </label>
//                 <p className="shippibg">Shipping & Billing address same?</p>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 sm:w-[50%] w-[100%] p-6">
//               <h1>Payment</h1>

//               <label htmlFor="cardName">
//                 <p>Name on Card</p>
//                 <Field type="text" id="cardName" name="cardName" />
//                 <ErrorMessage className = "text-red-600" name="cardName" component="div" />
//               </label>

//               <label htmlFor="cardNumber">
//                 <p>Credit card number</p>
//                 <Field type="text" id="cardNumber" name="cardNumber" />
//                 <ErrorMessage className = "text-red-600" name="cardNumber" component="div" />
//               </label>

//               <label htmlFor="cvv">
//                 <p>CVV</p>
//                 <Field type="text" id="cvv" name="cvv" />
//                 <ErrorMessage className = "text-red-600" name="cvv" component="div" />
//               </label>

//               <div className="flex gap-2">
//                 <label htmlFor="expMonth">
//                   <p>Exp Month</p>
//                   <Field id="expMonth" type="text" name="expMonth" />
//                   <ErrorMessage className = "text-red-600" name="expMonth" component="div" />
//                 </label>

//                 <label htmlFor="expYear">
//                   <p>Exp Year</p>
//                   <Field id="expYear" type="text" name="expYear" />
//                   <ErrorMessage className = "text-red-600" name="expYear" component="div" />
//                 </label>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </LocalStyles>
//   );
// };

// export default Checkout;

// const LocalStyles = styled.div`
//   input {
//     width: 100%;
//   }
//   p{
//     color: #352d24
//   }
//   h1 {
//     font-size: clamp(20px, 3vw, 25px);
//     font-weight: bold;
//     color: #ffffff;

//     background-color: black;

//     border: 1px solid black;
//     border-radius: 5px;
//     padding: 5px;
//   }
// `;

import React, { useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import InputField from "./InputField";

// const InputField = ({ label, id, name, type, className }) => (
//   <label htmlFor={id}>
//     <p className={`flex gap-[4px] ${className}`}>{label}</p>
//     <Field type={type} id={id} name={name} />
//     <ErrorMessage className="text-red-600" name={name} component="div" />
//   </label>
// );

const Checkout = () => {
    
  const [isAddressSame, setIsAddressSame] = useState(true);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    billingAddress:
      !isAddressSame && Yup.string().required("Billing address is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip code is required"),
    sameAddress: Yup.boolean(),
    cardName: Yup.string().required("Card name is required"),
    cardNumber: Yup.string()
      .required("Credit card number is required")
      .min(13, "Must be at least 16 characters")
      .max(19, "Must be at most 19 characters"),
    cvv: Yup.string()
      .required("CVV is required")
      .min(3, "Must be at least 3 characters")
      .max(4, "Must be at most 4 characters"),
    expMonth: Yup.string()
      .required("Exp month is required")
      .length(2, "Must be 2 characters"),
    expYear: Yup.string()
      .required("Exp year is required")
      .length(2, "Must be 2 characters"),
  });

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
          cardName: "",
          cardNumber: "",
          cvv: "",
          expMonth: "",
          expYear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Submit the form data here
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
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
            </div>

            <div className="flex flex-col gap-2 sm:w-[50%] w-[100%] p-6">
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
            </div>
          </Form>
        )}
      </Formik>
    </LocalStyles>
  );
};

export default Checkout;

const LocalStyles = styled.div`
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
