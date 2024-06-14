import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

import reducer from "../../reducers/ProductReducer";

const initialState = {
    allProducts:[],
    singleProduct: {},
    isLoading: false,
}

// dispatch({
//     type: "SAVE_USER_INFO",
//     payload: { username, email, orders, cart, usertype, token },
//   });


const ProductContext = createContext()

const ProductProvider = ({children}) => {
    const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
    const [productState, dispatch] = useReducer(reducer, initialState);

    const fetchAllProducts = async () => {

        dispatch({type: "SET_LOADING_TRUE"})

        try {
            const response = await axios.get(`${baseUrl}products/all`);
            const data = response.data;
            // console.log(data)
            dispatch({type: "FETCH_ALL_PRODUCTS", payload: data})
            dispatch({type: "SET_LOADING_FALSE"})

          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

    const getSingleProduct = async (productId)=> {
        dispatch({type: "SET_LOADING_TRUE"})
        try {
            const response = await axios.get(`${baseUrl}products/singleproduct/${productId}`);
            const data = response.data;
            dispatch({type: "SET_SINGLE_PRODUCT", payload: data});
            dispatch({type: "SET_LOADING_FALSE"})
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    

    return (
        <ProductContext.Provider value={{
            productState,
            fetchAllProducts,
            getSingleProduct,
        }}>
            {children}
        </ProductContext.Provider>
    )

}

const useProductContext = () => {
    return useContext(ProductContext);
}

export default ProductProvider;
export {useProductContext};