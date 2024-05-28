import React from "react";
import CustomButton from "../../../../custom-components/HoverButton";

const DuplicateProductCard = ({ duplicateProducts }) => {
  return (
    <>
      {duplicateProducts.map((product, index) => {
        const extractedUserId = product.uniqueIdentifier.split("_")[0];
        const loggedInUserId = JSON.parse(localStorage.getItem("userinfo"))._id;
        const isUserProduct = extractedUserId === loggedInUserId;
        // const isUserProduct = false;

        return (
          <div key={index}>
            <div
              className={`w-full flex flex-col my-4  p-4 rounded-xl border-[1px] border-[#916E4B]  `}
            >
              <div className={`${!isUserProduct && "  hidden" } mb-2 p-2 rounded-lg bg-[#5f3e1d] font-bold text-lg`}>
                <h1>Your Product</h1>
              </div>
              <div className="flex w-full justify-center items-center">
                <div className="rounded-l-md  min-w-[150px] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    className=" w-[100%] h-[150px] object-contain"
                    
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col justify-evenly rounded-r-lg">
                  <div className="p-2">
                    <p className="float-right text-lg">{product.price} Rs.</p>
                    <p className="float-left text-xl font-bold">
                      Title : {product.title}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between mt-4 p-2">
                    <p>Description : {product.description}</p>
                    <p>{product.uniqueIdentifier}</p>
                    <CustomButton className={`my-0 mx-0 bg-red-400 border-red-600 hover:bg-red-500 hover:text-white ${isUserProduct && "hidden"}`}>
                      Report
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DuplicateProductCard;
