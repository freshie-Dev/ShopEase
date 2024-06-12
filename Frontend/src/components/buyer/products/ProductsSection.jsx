import React from "react";
import { useProductContext } from "../../../context/product-context/ProductContextProvider";
import ProductCard from "./ProductCard";
import { GridLoader } from "react-spinners";
import useFilterContext from "../../../context/filter-context/FilterContext";
import ImageSearch from "./ImageSearch";

const ProductsSection = () => {
  const {  productState } = useProductContext();
  const {filteredProducts} = useFilterContext()
  const { allProducts, isLoading } = productState;
  return (
    // <div className="flex flex-col justify-center items-center flex-wrap flex-grow  gap-y-2 border-l-2 border-[#d9a470] w-[70%] min-h-[87vh]">
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-2 border-l-2 border-[#d9a470] w-[70%] min-h-[87vh] flex-grow">
      <ImageSearch/>
      <h1 className=" col-span-full text-center  text-[#d9a470] text-4xl font-bold my-3">
        All Products
      </h1>
      {isLoading ? (
        <div className="h-[67vh] col-span-full text-center flex justify-center items-center">
          <GridLoader color="#d9a470" size={15} speedMultiplier={1} />
        </div>
      ) : (
        <div className=" col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2 rounded-md ">
          {filteredProducts.map((product) => {
            return (
              <div key={product._id} className=" col-span-1">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
