import React from "react";
import CustomButton, {
  CustomButton2,
} from "../../../../custom-components/HoverButton";
import { BsInfoCircleFill } from "react-icons/bs";
import { useProductFormContext } from "../../../../context/product-form/ProductFormProvider";
import { useIVContext } from "../../../../context/image-verification/ImageVerificationContextProvider";
import DuplicateProductCard from "./DuplicateProductCard";
import { GridLoader } from "react-spinners";

const ImageVerification = () => {
  const { verifyImages, duplicateProducts, loading } = useIVContext();
  return (
    <div className="flex-grow p-2 md:p-6 bg-color3 text-white">
        <h3 className="font-semibold border-b-[.2rem] border-color1 my-4 pb-0">Seller Image Verification</h3>
      
        <p className="w-[80%] md:w-[60%]">
          We want our clients to feel totally safe about their profits by
          entrusting us with their products information. Therefore you can now
          crosscheck whether your product's exclusive image is being used by
          another seller.{" "}
        </p>
        <div className="flex w-full ">
          <CustomButton
            onClick={verifyImages}
            className="w-full mt-12 text-black font-normal"
          >
            Start Verification Process
          </CustomButton>
          {/* <CustomButton className='w-[30%] text-xl h-min p-1' onClick={()=> navigate(`/buyer/singleproduct/${_id}`)} >Go To Product</CustomButton> */}
        </div>
        <p className="flex justify-center items-center text-gray-200">
          <BsInfoCircleFill size={20} color="#515151" /> &nbsp;It might take
          some while to get the results.
        </p>

      <div className="main-title mt-10">
      <h3 className="font-semibold border-b-[.2rem] border-color1 my-4 pb-0">Results will be shown below</h3>
      </div>
      <div className="main-content">
        {duplicateProducts.length > 0 ? (
          <h1 className="text-lg">
            These products have same images as your product.
          </h1>
        ) : <p>No Duplicates yet</p>}
        {loading ? (
          <div className="h-[67vh] flex justify-center items-center">
            <GridLoader color="black" size={15} speedMultiplier={1} />
          </div>
        ) : (
          <DuplicateProductCard duplicateProducts={duplicateProducts} />
        )}
      </div>
    </div>
  );
};

export default ImageVerification;
