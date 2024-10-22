import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import axios from "axios";

import filterReducer from "@/reducers/CheckoutReducer";

import useCartContext from "../cart-context/CartContextProvider";

const CheckoutContext = createContext();

const initialState = {
  address: [],
  isAddressSame: true,
  selectedAddress: null,
  paymentType: "cash",
  addAddress: false,
};

const CheckoutProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const { cartState } = useCartContext();

  const [checkoutState, dispatch] = useReducer(filterReducer, initialState);

  const { address, isAddressSame, selectedAddress, paymentType, addAddress } =
    checkoutState;

  const setAddress = (newAddress) => {
    dispatch({ type: "SET_ADDRESS", payload: newAddress });
  };

  const setIsAddressSame = (isSame) => {
    dispatch({ type: "SET_IS_ADDRESS_SAME", payload: isSame });
  };

  const setSelectedAddress = (addressId) => {
    dispatch({ type: "SET_SELECTED_ADDRESS", payload: addressId });
  };

  const setPaymentType = (type) => {
    dispatch({ type: "SET_PAYMENT_TYPE", payload: type });
  };

  const setAddAddress = (add) => {
    dispatch({ type: "SET_ADD_ADDRESS", payload: add });
  };

  const cashCheckout = async () => {
    const cartItems = cartState.cart.length > 0 ? cartState.cart : localStorageCartData();
    const addressId = address[selectedAddress]._id
    const order = {
      cartItems,
      addressId,
    }
    console.log(order)
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        token
      }
    }

    try {
      const response = await axios.post(`${baseUrl}auth/add_order_by_cash`, order, config)
      console.log(response.data)
      return { message: response.data.message, result: response.data.result }

    } catch (error) {
      return { message: "Order Failed!, please try again.", result: false }
    }
  }

  const cardCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const items =
        cartState.cart.length > 0 ? cartState.cart : localStorageCartData();
      const products = items.map((item) => ({
        _id: item._id,
        // title: item.title,
        // sellerId: item.userId,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        // imageUrl: item.image,
      }));
      console.log(products)

      const response = await axios.post(
        "http://localhost:3002/payment/",
        products,
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );

      const data = response.data;
      console.log(data);
      return { message: "Order placed successfully!", success: true, paymentUrl: data.url }
    } catch (error) {
      console.log("Error while Checking out", error.message);
      return { message: "Ordre failed!", success: false }
    }
  };

  const saveAddress = async (address) => {
    const token = localStorage.getItem("token");

    const userAddressInfo = {
      area: address.address,
      city: address.city,
      zip_code: address.zip,
      email: address.email,
      customerName: address.name,
    };

    console.log("typed in", userAddressInfo);

    try {
      const response = await axios.post(
        `${baseUrl}auth/save_address`,
        userAddressInfo,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data.success) {
        setAddress(response.data.updatedUserAddress);
        console.log("Address saved successfully");
      } else {
        console.error("Failed to save address:", response.data.message);
      }
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Error saving address:", error);
      return { success: false, message: response.data.message };
    }
  };

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

  const deleteAddressField = async (addressId) => {
    try {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await axios.delete(
        `${baseUrl}auth/delete_address/${addressId}`,
        config
      );
      console.log(response.data);
      setAddress(response.data.updatedUserAddress);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  };


  return (
    <CheckoutContext.Provider
      value={{
        address,
        isAddressSame,
        selectedAddress,
        paymentType,
        addAddress,
        setAddress,
        setIsAddressSame,
        setSelectedAddress,
        setPaymentType,
        setAddAddress,
        cardCheckout,
        cashCheckout,
        saveAddress,
        getAddress,
        deleteAddressField,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export { CheckoutProvider };
export default useCheckoutContext;
