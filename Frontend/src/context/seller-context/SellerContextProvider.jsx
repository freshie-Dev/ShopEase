import axios from "axios";
import { createContext, useContext, useState } from "react";

const SellerActionsContext = createContext();

const SellerActionsProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const pythonBackendBaseUrl = import.meta.env.PYTHON_BACKEND_API_BASE_URL;


  const verifyImages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/verify_images`);
      const duplicateImages = response.data.duplicates;
      const products = duplicateImages.map(product => {
        return product.path
      })
      console.log(products)
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <SellerActionsContext.Provider
      value={{
        verifyImages,
      }}
    >
      {children}
    </SellerActionsContext.Provider>
  );
};

const useSellerActionsContext = () => {
  return useContext(SellerActionsContext);
};

export default SellerActionsProvider;
export { useSellerActionsContext };
