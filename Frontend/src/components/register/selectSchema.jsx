import * as Yup from "yup";

const selectSchema = (formType, changeField) => {
  let signUpSchema;

  if (formType !== null) {
    const schemaRegister = {
      Username: Yup.string()
        .min(5, "Use atleast 5 characters")
        .max(15, "Username cannot exceed 15 characters")
        .required("Required"),

      Email: Yup.string().email("Invalid email").required("Required"),

      Password: Yup.string()
        .min(6, "Password must be atleast 6 characters long")
        .matches(
          /^(?=.*[A-Z])/,
          "Password must contain at least one uppercase letter"
        )
        .matches(
          /^(?=.*[a-z])/,
          "Password must contain at least one lowercase letter"
        )
        .matches(/^(?=.*\d)/, "Password must contain at least one digit")
        .matches(
          /^(?=.*[@$!%*#?&])/,
          "Password must contain at least one symbol from '@ $ ! % * # ? &'"
        )
        .required("Required"),

      Confirmpassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Must match the password field")
        .required("Required"),

      usertype: Yup.string()
        .test(
          "at-least-one-selected",
          "At least one option must be selected",
          (value) => {
            return value !== undefined && value !== null && value !== "";
          }
        )
        .required("Required"),
    };

    const schemaLogin = {
      Username: Yup.string()
        .min(5, "Username must be atleast 5 characters long")
        .max(15, "Username cannot exceed 15 characters")
        .required("Required"),

      Password: Yup.string()
        .min(6, "Password must be atleast 6 characters long")
        .matches(
          /^(?=.*[A-Z])/,
          "Password must contain at least one uppercase letter"
        ),
    };

    signUpSchema = formType ? schemaRegister : schemaLogin;
  } else {
    const schemaChangeUserName = {
      Username: Yup.string()
        .min(5, "Username must be atleast 5 characters long")
        .max(15, "Username cannot exceed 15 characters")
        .required("Required"),
    };

    const schemaChangePassword = {
      Password: Yup.string()
        .min(6, "Password must be atleast 6 characters long")
        .matches(
          /^(?=.*[A-Z])/,
          "Password must contain at least one uppercase letter"
        ),
    };

    const schemaOTP = {
      OTP: Yup.string()
        .min(6, "OTP must be atleast 5 characters long")
        .nullable(),
    };

    signUpSchema =
      changeField === "Password"
        ? schemaChangePassword
        : changeField === "Username"
        ? schemaChangeUserName
        : changeField === "OTP"
        ? schemaOTP
        : null;
  }

  return signUpSchema;
};

export default selectSchema;
