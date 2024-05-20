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
    <main className="main-container">
      <div className="main-title">
        <h1 className="mx-auto">Seller Image Verification</h1>
      </div>
      <div className="main-content">
        <p>
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
      </div>

      <div className="main-title mt-10">
        <h1 className="mx-auto">Results will be Shown below</h1>
      </div>
      <div className="main-content">
        {duplicateProducts.length > 0 && (
          <h1 className="text-lg">
            These products have same images as your product.
          </h1>
        )}
        {loading ? (
          <div className="h-[67vh] flex justify-center items-center">
            <GridLoader color="black" size={15} speedMultiplier={1} />
          </div>
        ) : (
          <DuplicateProductCard duplicateProducts={duplicateProducts} />
        )}
      </div>
    </main>
  );
};

export default ImageVerification;
