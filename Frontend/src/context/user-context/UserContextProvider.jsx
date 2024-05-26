import { useContext, useReducer, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

import reducer from "../../reducers/UserReducer";

const initialState = {
  loggedInUserInfo: {
    username: "",
    email: "",
    usertype: "",
    cart: "",
    orders: "",
    address: "",
  },
};

const UserProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [userState, dispatch] = useReducer(reducer, initialState);
  const [address, setAddress] = useState([]);

  //! 1: Sign Up User
  const signUpUser = async (signUpCredentials) => {
    try {
      const response = await axios.post(`${baseUrl}auth/`, signUpCredentials);
      const data = response.data;
      const {
        user: { _id, username, email, orders, cart, usertype, address },
        token,
      } = data;

      dispatch({
        type: "SAVE_USER_INFO",
        payload: {
          _id,
          username,
          email,
          orders,
          cart,
          usertype,
          address,
          token,
        },
      });

      return { success: "true", userType: usertype };
    } catch (error) {
      console.log("Error while signing up " + error);
      return { success: false, message: error.response.data.message };
    }
  };

  //! 2: Login User
  const loginUser = async (loginCredentials) => {
    try {
      const response = await axios.post(
        `${baseUrl}auth/login`,
        loginCredentials
      );
      const data = response.data;
      console.log(data.user);
      const {
        user: { _id, username, email, orders, cart, usertype, address },
        token,
      } = data;

      dispatch({
        type: "SAVE_USER_INFO",
        payload: {
          _id,
          username,
          email,
          orders,
          cart,
          usertype,
          token,
          address,
        },
      });

      return { success: "true", userType: usertype };
    } catch (error) {
      return { success: false, message: error.response.data.message };
    }
  };

  //! 3: Log Out User
  const logOut = () => {
    localStorage.clear();
  };

  //! 4: Update Field
  const UpdateField = async (newData) => {
    if (newData.Password) {
      newData = {
        password: newData.Password,
      };
    } else {
      newData = {
        username: newData.Username,
      };
    }
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const response = await axios.put(
      `${baseUrl}auth/updateinfo`,
      newData,
      config
    );

    const data = response.data;

    if (!data.otpSent) {
      const {
        user: { username },
      } = data;
      dispatch({
        type: "UPDATE_USER_INFO",
        payload: { username },
      });
      return { message: data.message, result: true, changedField: "username" };
    } else {
      return { message: data.message, result: true, changedField: "password" };
    }
  };

  //! 5: OTP verification
  const verifyOTP = async (newData) => {
    try {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await axios.post(
        `${baseUrl}auth/verifyotp`,
        newData,
        config
      );
      const data = response.data;
      return data.status;
    } catch (error) {
      console.log(error.message, "Incorrect OTP");
      return data.status;
    }
  };

  //! 6: Get user Address
  const getAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token,
        },
      };
      const response = await axios.get(`${baseUrl}auth/address`, config);
      setAddress(response.data.address);
      // Handle the response here
      console.log(response.data.address);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  //! 7: Add Order
  const addOrder = async () => {
    
    try {
      const order = JSON.parse(localStorage.getItem("cart"));
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token,
        },
      };

      const response = await axios.post(`${baseUrl}auth/add_order`,order, config);
      const data = response.data;

      if(data.success) {
        Array
        localStorage.setItem("cart", JSON.stringify(new Array()));
      }
      return { message: data.message, result: true };
    } catch (error) {
      return { message: "Error while Updating Orders", result: false };
    }
  };

  return (
    <UserContext.Provider
      value={{
        baseUrl,
        signUpUser,
        loginUser,
        logOut,
        UpdateField,
        verifyOTP,
        getAddress,
        address,
        addOrder,
        userState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// CUSTOM HOOK FOR USING USER CONTEXT
const useUserContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
export { useUserContext };
