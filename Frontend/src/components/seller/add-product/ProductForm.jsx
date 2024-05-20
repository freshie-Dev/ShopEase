import { useEffect, useState } from "react";
import DynamicInputComponent from "./DynamicInputComponent";
import TagInput from "./TagInput";
import styled from "styled-components";
import FormInput from "../../register/FormInput";
import { Form, Formik } from "formik";
import { useProductFormContext } from "../../../context/product-form/ProductFormProvider";
import ProcessedImage from "./ProcessedImage";
import { enqueueSnackbar } from "notistack";
import CustomCheckbox from "../../../custom-components/checkbox/CheckBox";

import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { GridLoader } from "react-spinners";

function ProductForm() {
  const { productFormData, handleFormSubmit, isRemoveBgChecked, setIsRemoveBgChecked, customizable, setCustomizable, isLoading } = useProductFormContext();

  const [fileName, setFileName] = useState("Upload File");

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Upload File");
    }
  };


  const handleSubmit = async (e, isRemoveBgChecked, customizable) => {
    const status =  await handleFormSubmit(e, isRemoveBgChecked, customizable);
    if (status.success) {
      enqueueSnackbar(status.message, { variant: "success" });
    } else {
      enqueueSnackbar(status.message, { variant: "error" });
    }
  };


  return (
    // <LocalStyles>
      <main className={`main-container text-[#E2D4BA]  flex justify-center items-center relative`}>
        {/* <h1 className="text-[#d9a470] cursive text-5xl my-8">Add a product</h1> */}
        {isLoading && <div className= {`absolute w-full h-full flex justify-center items-center  rounded-xl ${isLoading && "bg-black opacity-25"}`} ><GridLoader color="white" size={15} speedMultiplier={1} /></div>  }
       
        <form
          id="product-form"
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col w-[700px] rounded-md bg-[#BB9773] px-16 py-8 box-content"
        >
          <div className=" w-full flex items-center justify-center border-black border-2 p-2 rounded-md mb-2">
            <button className="min-w-max mr-2 font-bold text-xl">
              Customizable product
            </button>
            <CustomCheckbox
              checked={customizable}
              onChange={()=> setCustomizable(!customizable)}
            />
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              className="w-[49%] PFinput cursive placeholder:text-[#a0a0a0] focus:outline-none"
              placeholder="Title"
              name="title"
              required
            />
            <input
              type="text"
              className="w-[49%] PFinput cursive"
              placeholder="Price"
              name="price"
              required
            />
          </div>
          <textarea
            type="text"
            placeholder="Description"
            className="PFinput cursive border border-[#d9a470]"
            name="description"
            required
          />

          <TagInput />
          {!customizable && (
            <>
              <DynamicInputComponent />
              <label
                className="flex justify-center items-center my-2 border-[1px] border-black h-[50px] w-full rounded-full"
                htmlFor="file-input"
              >
                <p>{fileName}</p>
              </label>{" "}
              <input
                id="file-input"
                type="file"
                name="product_image"
                placeholder="Upload the image"
                required = {!customizable && true}
                onChange={handleImageFileChange}
              />
            </>
          )}
          {!customizable && (
            <>
              <label
                className={`flex my-2 justify-center items-center p-4 relative h-[50px] w-max rounded-full duration-300 ${
                  isRemoveBgChecked
                    ? "bg-black text-[#d9a470]"
                    : "text-black border-[1px] border-black"
                }`}
                htmlFor="remove-bg"
              >
                {" "}
                Remove Background ?
                <div className="flex justify-center items-center w-[25px] h-[25px] absolute rounded-md right-[-30px] top-[13px] checked:bg-transparent bg-black">
                  {isRemoveBgChecked ? (
                    <TiTick size={25} color="#d9a470" />
                  ) : (
                    <ImCross color="#d9a470" />
                  )}
                </div>
                <input
                  className="hidden"
                  checked={isRemoveBgChecked}
                  onChange={() => setIsRemoveBgChecked(!isRemoveBgChecked)}
                  id="remove-bg"
                  type="checkbox"
                />
              </label>
            </>
          )}

          <button className="hoverButton text-xl font-extrabold" type="submit">
            Submit
          </button>
          {!customizable && <ProcessedImage />}
        </form>
      </main>
    // </LocalStyles>
  );
}

export default ProductForm;

const LocalStyles = styled.div`
  /* .main {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
  } */
  /* input,
  textarea {
    color: #d9a470;
    border-radius: 10px;
    margin: 2px;
  }
  .input,
  input,
  textarea {
    padding: 0.75rem;
    background-color: #000000c0;
    font-weight: 300;
    font-size: 1.2rem;
    color: #f5e6cb;
  } */
`;
