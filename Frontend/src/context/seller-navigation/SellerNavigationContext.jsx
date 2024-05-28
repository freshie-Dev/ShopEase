import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SellerNavigationContext = createContext();

const SellerNavigationProvider = ({ children }) => {
  
    const [page, setPage] = useState({
        home: true,
        productForm: false,
        inventory: false,
        imageVerification: false,
        customers: false
    })

    const goto = (pageName) => {
        setPage((prevPage) => ({
          ...Object.keys(prevPage).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
          [pageName]: true,
        }));
      };

      useEffect(() => {
        console.log(page)
      }, [page])
      

  


  return (
    <SellerNavigationContext.Provider
      value={{
        page,
        goto,
      }}
    >
      {children}
    </SellerNavigationContext.Provider>
  );
};

const useSellerNavigationContext = () => {
  return useContext(SellerNavigationContext);
};

export default SellerNavigationProvider;
export { useSellerNavigationContext };
