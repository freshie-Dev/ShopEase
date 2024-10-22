import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { sortProducts } from "../../helpers/helpers";

const ImageVerificationContext = createContext();

const IVProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [duplicateProducts, setDuplicateProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkUserIdInFilenames = (filenames) => {
    if (filenames.length === 0) {
      return { isSame: false, userId: null };
    }
  
    const extractUserId = (filename) => {
      return filename.split('_')[0];
    };
  
    const firstUserId = extractUserId(filenames[0]);
    const isSame = filenames.every((filename) => extractUserId(filename) === firstUserId);
  
    return { isSame, userId: isSame ? firstUserId : null };
  };

  const verifyImages = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userinfo"))._id;
      setLoading(true)
      const response = await axios.get(`http://127.0.0.1:5000/verify_images`, {
        params: {
          userId: userId,
        },
      });
      let duplicateImages = response.data.duplicates;

      duplicateImages = duplicateImages.map((imageName) => {
        return imageName.path;
      });
      console.log(duplicateImages)

      const {isSame, userId: extractedUserId} = checkUserIdInFilenames(duplicateImages)

      if(!isSame || (isSame && extractedUserId === userId) ) {
        // fetch products
        const productsResponse = await axios.post(
          `http://localhost:3002/products/productsByUniqueIdentifiers`,
          { uniqueIdentifiers: duplicateImages }
        );
        let products = productsResponse.data;
        products = sortProducts(
          products,
          JSON.parse(localStorage.getItem("userinfo"))._id
        );
        setDuplicateProducts(products);
      }  else {
        setDuplicateProducts([])
      }
      setLoading(false)
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
