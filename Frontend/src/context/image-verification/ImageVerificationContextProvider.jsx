import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { sortProducts } from "../../helpers/helpers";

const ImageVerificationContext = createContext();

const IVProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [duplicateProducts, setDuplicateProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const verifyImages = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userinfo"))._id;
      setLoading(true)
      // const response = await axios.get(`http://127.0.0.1:5000/verify_images`);
      const response = await axios.get(`http://127.0.0.1:5000/verify_images`, {
        params: {
          userId: userId,
        },
      });
      let duplicateImages = response.data.duplicates;
      console.log(duplicateImages)

      duplicateImages = duplicateImages.map((imageName) => {
        return imageName.path;
      });
      console.log(duplicateImages)
   
      const productsResponse = await axios.post(
        `http://localhost:3002/products/productsByUniqueIdentifiers`,
        { uniqueIdentifiers: duplicateImages }
      );
      let products = productsResponse.data;
      console.log(products)
      products = sortProducts(
        products,
        JSON.parse(localStorage.getItem("userinfo"))._id
      );
      setLoading(false)
      setDuplicateProducts(products);
      console.log("Products:", products);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <ImageVerificationContext.Provider
      value={{
        verifyImages,
        duplicateProducts, setDuplicateProducts,
        loading, setLoading
      }}
    >
      {children}
    </ImageVerificationContext.Provider>
  );
};
// CUSTOM HOOK FOR USING USER CONTEXT
const useIVContext = () => {
  return useContext(ImageVerificationContext);
};

export default IVProvider;
export { useIVContext };
