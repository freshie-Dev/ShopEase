import axios from "axios";
import { createContext, useContext, useState } from "react";

const SellerActionsContext = createContext();

const SellerActionsProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const pythonBackendBaseUrl = import.meta.env.PYTHON_BACKEND_API_BASE_URL;

  const chartData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
        chartData,
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
