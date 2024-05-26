
import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useReducer,
} from "react";
import reducer from "../../reducers/CartReducer";
import axios from "axios";

const CartContext = createContext();

const localStorageCartData = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    return JSON.parse(cartData);
  } else {
    return [];
  }
};

const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  shippingFee: 5,
  orderTotal: 0,
};

const CartProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [customizedImage, setCustomizedImage] = useState(null);
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (
    id,
    color,
    size,
    quantity,
    product,
    customizedImage,
    customSize
  ) => {
    console.log("i am running")
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        color,
        size,
        quantity,
        product,
        customizedImage,
        customSize,
      },
    });
    setCustomizedImage(null);
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const removeCartItem = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem('token');
      const items = cartState.cart.length > 0 ? cartState.cart : localStorageCartData()
      const products = items.map((item) => ({
        id: item._id,
        quantity: item.quantity,
      }));

      const response = await axios.post('http://localhost:3002/payment/', products, {
        headers: {
          'Content-Type': 'application/json',
          token
        },
      });

      const data = response.data;
      console.log(data);
      // window.location.href = data.url;
    } catch (error) {
      console.log("Error while Checking out", error.message);
    }
  };

  

  const saveAddress = async (address) => {
    const token = localStorage.getItem('token');
  
    const userAddressInfo = {
      area: address.address,
      city: address.city,
      zip_code: address.zip,
      email: address.email,
      customerName: address.name,
    };

    console.log(userAddressInfo)
  
    try {
      // const response = await axios.post(`${baseUrl}auth/save_address`, {
      //   userId,
      //   address: userAddressInfo,
      // });
      const response = await axios.post(`${baseUrl}auth/save_address`, userAddressInfo, {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      });
  
      if (response.data.success) {
        console.log('Address saved successfully');
      } else {
        console.error('Failed to save address:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  useEffect(() => {
    console.log(cartState);
  }, [cartState]);

  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEMS" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    // if (cartState.cart.length !== 0) {
    //   localStorage.setItem('cart', JSON.stringify(cartState.cart));
    // } 
    if (cartState.totelItems !== 0) {
      localStorage.setItem('cart', JSON.stringify(cartState.cart));
    } 
  }, [cartState.cart]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeCartItem,
        increaseQuantity,
        decreaseQuantity,
        customizedImage,
        setCustomizedImage,
        checkout,
        saveAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider };
export default useCartContext;
