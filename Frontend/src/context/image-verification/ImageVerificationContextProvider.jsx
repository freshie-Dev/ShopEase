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

      duplicateImages = duplicateImages.map((imageName) => {
        return imageName.path;
      });
      // let duplicateImages = [
      //   {65cb4aa0f927e23076ad66e5_538690_2024-05-14_18-38-38.png},
      //   {66436a8e72a872420993a2cf_474656_2024-05-14_18-53-15.png},
      //   {66436a8e72a872420993a2cf_338597_2024-05-14_18-53-05.png},
      //   {66436a8e72a872420993a2cf_144550_2024-05-14_18-48-00.png},
      //   {66436a8e72a872420993a2cf_207470_2024-05-14_18-53-15.png}
      // ]
      // Send duplicateImages to the backend to fetch products
      // const productsResponse = await axios.post(`${baseUrl}productsByUniqueIdentifiers`,
      const productsResponse = await axios.post(
        `http://localhost:3002/products/productsByUniqueIdentifiers`,
        { uniqueIdentifiers: duplicateImages }
      );
      let products = productsResponse.data;
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
