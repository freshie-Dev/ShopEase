import axios from "axios";
import { createContext, useContext, useState } from "react";

const ProductFormContext = createContext();

const ProductFormProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const pythonBackendBaseUrl = import.meta.env.PYTHON_BACKEND_API_BASE_URL;
  // var productFormData = useState(new FormData());
  const [productFormData, setProductFormData] = useState(new FormData());
  const [inputs, setInputs] = useState([
    {
      id: 1,
      colorName: "",
      size: [
        {
          sizeId: 1,
          sizeName: "",
          stock: "",
        },
      ],
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [processedImageUrl, setProcessedImageUrl] = useState("");

  const [customizable, setCustomizable] = useState(false);
  const [isRemoveBgChecked, setIsRemoveBgChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  //! RESET THE PRODUCT FORM AFTER SUBMISSION
  const resetProductForm = (form) => {
    form.reset();
    setCategories([]);
    setInputs([
      {
        id: 1,
        colorName: "",
        size: [
          {
            sizeId: 1,
            sizeName: "",
            stock: "",
          },
        ],
      },
    ]);
  };
  //!----- POST PRODUCT FORM SUBMISSION ------
  const handleFormSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formElement = document.getElementById("product-form");

    const formData = new FormData(formElement);
    formData.append("userId", JSON.parse(localStorage.getItem("userinfo"))._id);
    formData.append("categories", JSON.stringify(categories));
    formData.set("customizable", JSON.stringify(customizable));
    formData.set("isRemoveBgChecked", JSON.stringify(isRemoveBgChecked));

    //! For Customizable Product--------------------------
    if (customizable) {
      try {
        const response = await axios.post(
          `${baseUrl}products/postproduct`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
        const { success, message } = response.data;
        setIsLoading(false)
        // resetProductForm(formElement);
        return { success, message };
      } catch (error) {
        console.error("Error submitting form:", error);
        return { success: false, message: error.response.data.message };
      }
    }
    //!---------------------------------------------------

    formData.append("attributes", JSON.stringify(inputs));
    // Get the product image from the form data
    const productImage = formData.get("product_image");

    //! Create a new FormData object to send only the product image for background removal
    const imageFormData = new FormData();
    imageFormData.append("productImage", productImage);
    imageFormData.append(
      "userId",
      JSON.parse(localStorage.getItem("userinfo"))._id
    );
    imageFormData.append(
      "isRemoveBgChecked",
      JSON.stringify(isRemoveBgChecked)
    );

    //* BACKGROUND REMOVAL
    try {
      const response = await axios.post(
        // `${pythonBackendBaseUrl}process_image`,
        `http://127.0.0.1:5000/process_image`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // Access the resulting mask URL and image data
      if (isRemoveBgChecked) {
        const resultingMaskUrl = response.data.resulting_mask_url;
        const maskedImageFilename = response.data.masked_image_filename;
        const resultingCatMaskUrl = response.data.resulting_cat_mask_url;
        formData.set("product_image", resultingMaskUrl);
        formData.set("image_filename", maskedImageFilename);
        setProcessedImageUrl(resultingCatMaskUrl);
      } else {
        const imageUrl = response.data.image_url;
        const imageFilename = response.data.image_filename;
        formData.set("product_image", imageUrl);
        formData.set("image_filename", imageFilename);
      }
      // Update the form data with the resulting mask URL
      formData.set("original_product_image", productImage);
    } catch (error) {
      console.error("Error during background removal:", error);
      // Handle error if necessary
      return;
    }
    //* PRODUCT SUBMISSION
    try {
      const response = await axios.post(
        `${baseUrl}products/postproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      setIsLoading(false)
      const { success, message } = response.data;
      // resetProductForm(formElement);
      return { success, message };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, message: error.response.data.message };
    }
  };


  //!----- HANDLING PRODUCT ATTRIBUTES ------
  const handleAddInputField = (e) => {
    const newInput = {
      id: inputs.length + 1,
      colorName: "",
      size: [
        {
          sizeId: 1,
          sizeName: "",
          stock: "",
        },
      ],
    };
    setInputs([...inputs, newInput]);
  };

  //!------- Add INPUT FIELD ---------
  const handleAddSizeInput = (inputId) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return {
          ...input,
          size: [
            ...input.size,
            {
              sizeId: input.size.length + 1,
              sizeName: "",
              stock: "",
            },
          ],
        };
      }
      return input; // Return the input unchanged for unmatched elements
    });

    setInputs(updatedInputs);
  };

  //!------- DELETE INPUT FIELD ---------
  const deleteInput = (inputId) => {
    const updatedInputs = inputs.filter((inputObj) => {
      return inputObj.id !== inputId;
    });

    setInputs(updatedInputs);
  };

  //!------- DELETE SIZE INPUT FIELD ---------
  const deleteSize = (inputId, sizeId) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return {
          ...input,
          size: input.size.filter((sizeObj) => sizeObj.sizeId !== sizeId),
        };
      }
      return input;
    });

    setInputs(updatedInputs);
  };

  //!------- HANDLE COLOR INPUT VALUE ---------
  const handleColorInputChange = (id, value) => {
    const updatedInputs = inputs.map(
      (input) =>
        input && input.id === id
          ? {
              ...input,
              colorName: value,
            }
          : input //return unchaged inputs
    );
    setInputs(updatedInputs);
  };

  //!------- HANDLE SIZE INPUT VALUE ---------
  const handleSizeInputChange = (parentId, sizeId, inputName, value) => {
    const updatedInputs = inputs.map((input) =>
      input.id === parentId
        ? {
            ...input,
            size: input.size.map((sizeObj) =>
              sizeObj.sizeId === sizeId
                ? { ...sizeObj, [inputName]: value }
                : sizeObj
            ),
          }
        : input
    );

    setInputs(updatedInputs);
  };
  //!--------------------------------------

  return (
    <ProductFormContext.Provider
      value={{
        productFormData,
        setProductFormData,
        inputs,
        setInputs,
        categories,
        setCategories,
        handleAddInputField,
        deleteInput,
        handleAddSizeInput,
        deleteSize,
        handleColorInputChange,
        handleSizeInputChange,
        handleFormSubmit,
        processedImageUrl,
        customizable,
        setCustomizable,
        isRemoveBgChecked,
        setIsRemoveBgChecked,
        isLoading,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
};

const useProductFormContext = () => {
  return useContext(ProductFormContext);
};

export default ProductFormProvider;
export { useProductFormContext };
