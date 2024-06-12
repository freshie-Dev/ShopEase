import {  useState } from "react";
import DynamicInputComponent from "./DynamicInputComponent";
import TagInput from "./TagInput";
import styled from "styled-components";
import ProcessedImage from "./ProcessedImage";
import { enqueueSnackbar } from "notistack";
import CustomCheckbox from "../../../../custom-components/checkbox/CheckBox";


import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { BarLoader } from "react-spinners";
import { useProductFormContext } from "../../../../context/product-form/ProductFormProvider";
import Br from "../../../../custom-components/line-break/Br";



function ProductForm() {
  const {  handleFormSubmit, isRemoveBgChecked, setIsRemoveBgChecked, customizable, setCustomizable, isLoading } = useProductFormContext();

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
      enqueueSnackbar(status.message, { variant: "success", autoHideDuration: 2000  });
    } else {
      enqueueSnackbar(status.message, { variant: "error", autoHideDuration: 2000  });
    }
  };


  return (
    // <LocalStyles>
      <LocalStyles className={` flex-grow  p-2 md:p-6 bg-color3 text-white `}>
        {/* <h1 className="text-[#d9a470]   text-5xl my-8">Add a product</h1> */}
        <form
          id="product-form"
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-w-[700px] rounded-2xl border-2 border-color1 p-6 box-content mx-auto my-0"
        >
          <div className=" w-full flex items-center justify-center border-black border-[1px] p-2 rounded-md mb-2">
            <button className="min-w-max mr-2  text-xl">
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
              className="w-[49%] PFinput   placeholder:text-[#a0a0a0] focus:outline-none"
              placeholder="Title"
              name="title"
              required
            />
            <input
              type="text"
              className="w-[49%] PFinput  "
              placeholder="Price"
              name="price"
              required
            />
          </div>
          <textarea
            type="text"
            placeholder="Description"
            className="PFinput   border border-[#d9a470]"
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

          <button className="hoverButton text-xl  " type="submit">
            {isLoading ? <BarLoader  color="white"  speedMultiplier={1} /> : "Submit"}
          </button>
          <Br className="h-[5px] bg-color1 my-12"/>
          {!customizable && <ProcessedImage />}
        </form>
      </LocalStyles>
    // </LocalStyles>
  );
}

export default ProductForm;

const LocalStyles = styled.div`
 
 input,
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
    font-size: 1rem;
    color: #f5e6cb;
  } 
  .hoverButton {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
