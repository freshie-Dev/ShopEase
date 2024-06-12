
import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useReducer,
} from "react";
import reducer from "../../reducers/CartReducer";
import axios from "axios";
import { useUserContext } from "../user-context/UserContextProvider";

const CartContext = createContext();



const initialState = {
  cart: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [],
  totalItems: 0,
  totalPrice: 0,
  shippingFee: 5,
  orderTotal: 0,
};

const CartProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const {getAddress, setAddress} = useUserContext();

  const [customizedImage, setCustomizedImage] = useState(null);
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (
    id,
    userId,
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
        userId,
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

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  }

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

  

  
  useEffect(() => {
    console.log(cartState);
  }, [cartState]);

  useEffect(() => {
    console.log("i am runninggggggg");
    dispatch({ type: "CART_TOTAL_ITEMS" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem('cart', JSON.stringify(cartState.cart))
   
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
        emptyCart,
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
