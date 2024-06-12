import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { useProductContext } from "../../../context/product-context/ProductContextProvider";

import { CiCircleCheck } from "react-icons/ci";
import useCartContext from "../../../context/cart-context/CartContextProvider";
import CustomButton from "../../../custom-components/HoverButton";

import custom_shirt_image from "../../../assets/custom.jpg";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { customizedImage, setCustomizedImage } = useCartContext();
  const { getSingleProduct, productState } = useProductContext();
  const { addToCart } = useCartContext();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { "product-id": productId } = useParams();

  const { singleProduct } = productState;

  // Destructure properties from singleProduct
  const {
    title,
    price,
    description,
    imageUrl,
    attributes,
    categories,
    customizable,
    userId,
  } = singleProduct;

  const [customSize, setCustomSize] = useState("");
  const handleSizeChange = (event) => {
    setCustomSize(event.target.value);
  };

  const Sizes = (colorName) => {
    if (attributes) {
      const sizes = attributes
        .filter((attr) => attr.colorName === colorName) // Filter attributes based on colorName
        .map((attr) => attr.size.map((size) => size.sizeName)) // Map over size array for each matching color
        .flat(); // Flatten the nested arrays
      return sizes;
    }
  };

  const maxStock = (colorName, sizeName) => {
    if (colorName && sizeName) {
      const stock = attributes
        .filter((attr) => attr.colorName === colorName) // Filter attributes based on colorName
        .map(
          (attr) => attr.size.find((size) => size.sizeName === sizeName)?.stock
        );

      return stock;
    }
  };

  useEffect(() => {
    getSingleProduct(productId);
    console.log(customizedImage);
  }, []);

  return (
    <LocalStyles>
      <section className="main">
        <div className="w-[100%] md:w-[50%] min-h-[87vh] flex justify-center items-center bg-[#fcd7b2]  border-2 border-r-[#d9a470] ">
          <div>
            <img
              src={
                !customizable
                  ? imageUrl
                  : customizedImage
                  ? customizedImage
                  : custom_shirt_image
              }
              className="w-[250px] sm:w-[300px] md:w-[350px] rounded-xl"
              alt=""
            />
            {customizable && (
              <CustomButton
                onClick={() =>
                  navigate(`/buyer/singleproduct/customize/${productId}`)
                }
              >
                Create Custom texture
              </CustomButton>
            )}
          </div>
        </div>
        <div className="flex justify-center p-[10px] w-[50%] min-h-[87vh] flex-col bg-[#fcd7b2]  ">
          <h3 className="text-lg md:text-2xl font-extrabold w-max border-b-[3px] border-[#d9a470]">
            {title}
          </h3>
          <p className="font-bold">{price} Rs.</p>
          <p className="my-3 font-light">{description}</p>

          {!customizable ? (
            <>
              {/*//! color selector  */}
              <div className="flex items-center">
                <p className="mr-2 font-bold">Choose color:</p>
                {attributes &&
                  attributes.map((color) => {
                    return (
                      <div
                        key={color.id}
                        onClick={() => {
                          setSelectedColor(color.colorName);
                        }}
                        className={`duration-300 flex justify-center items-center   mx-1 w-8 h-8 rounded-full`}
                        style={{
                          backgroundColor: color.colorName,
                          border: "0.5px solid gray",
                        }}
                      >
                        {selectedColor === color.colorName && (
                          <CiCircleCheck size={25} color="#FCD7B2" />
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* //! size selector depending on color selected */}
              <div className="flex">
                {Sizes(selectedColor) &&
                  Sizes(selectedColor).map((size) => {
                    return (
                      <p
                        key={size.sizeId}
                        onClick={() => setSelectedSize(size)}
                        className="pr-1 mx-1 font-semibold flex items-center justify-center w-8 h-8 rounded-full border border-[#d9a470]"
                      >
                        {size}
                      </p>
                    );
                  })}
              </div>

              <div>
                {maxStock(selectedColor, selectedSize) &&
                  maxStock(selectedColor, selectedSize).map((stock) => {
                    let key = 0;
                    return (
                      <p key={key + 1} className="my-1 ">
                        In stock: <span className="font-bold">{stock}</span>
                      </p>
                    );
                  })}
              </div>
            </>
          ) : (
            <div className="flex items-center my-2">
              <p className="ml-2   text-2xl font-bold inline">
                Select a size
              </p>
              <div>
                <label
                  className={`mx-2 h-6 w-6 border-[1px] border-black rounded-md p-2 pl-0 duration-300 ${
                    customSize === "S" && "bg-[black] text-[#d9a470]"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value="S"
                    className="opacity-0"
                    checked={customSize === "S"}
                    onChange={handleSizeChange}
                  />
                  S
                </label>
                <label
                  className={`mx-2 h-6 w-6 border-[1px] border-black rounded-md p-2 pl-0 duration-300 ${
                    customSize === "M" && "bg-[black] text-[#d9a470]"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value="M"
                    className="opacity-0"
                    checked={customSize === "M"}
                    onChange={handleSizeChange}
                  />
                  M
                </label>
                <label
                  className={`mx-2 h-6 w-6 border-[1px] border-black rounded-md p-2 pl-0 duration-300 ${
                    customSize === "L" && "bg-[black] text-[#d9a470]"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value="L"
                    className="opacity-0"
                    checked={customSize === "L"}
                    onChange={handleSizeChange}
                  />
                  L
                </label>
              </div>
            </div>
          )}

          <div className="my-3">
            <button
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              className="h-[25px] w-[35px]  bg-black text-[#d9a470] rounded-md hover:bg-[#d9a470] hover:text-black duration-300"
            >
              +
            </button>
            <span className="mx-4">{selectedQuantity}</span>
            <button
              onClick={() => setSelectedQuantity(selectedQuantity - 1)}
              className="h-[25px] w-[35px]  bg-black text-[#d9a470] rounded-md hover:bg-[#d9a470] hover:text-black duration-300"
            >
              -
            </button>
          </div>

          <CustomButton
            onClick={() => {
              addToCart(
                productId,
                userId,
                selectedColor,
                selectedSize,
                selectedQuantity,
                singleProduct,
                customizable && customizedImage,
                customSize
              );
              navigate("/buyer/cart");
            }}
            className="min-w-[200px] max-w-[300px] text-xl "
            disabled={selectedColor === "" || selectedSize === ""}
            // disabled = {true}
          >
            Add To Cart
          </CustomButton>
        </div>
      </section>
    </LocalStyles>
  );
};

export default SingleProduct;

const LocalStyles = styled.div`
  .main {
    display: flex;
    flex-direction: row;
  }
  .container {
    width: 50%;
    min-height: 87vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    padding: 10px;
  }

  @media (max-width: 768px) {
    /* Change to flex column layout for screen sizes less than medium (768px) */
    .container {
      width: 100%;
      min-height: 30vh;
    }
  }
`;
