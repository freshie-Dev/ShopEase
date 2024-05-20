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
    <div className="flex flex-col justify-center items-center flex-wrap flex-grow  gap-y-2 border-l-2 border-[#d9a470] w-[70%] min-h-[87vh]">
      <ImageSearch/>
      <h1 className="cursive text-[#d9a470] text-4xl font-bold my-3">
        All Products
      </h1>
      {isLoading ? (
        <div className="h-[67vh] flex justify-center items-center">
          <GridLoader color="#d9a470" size={15} speedMultiplier={1} />
        </div>
      ) : (
        <div className="flex justify-evenly flex-wrap flex-grow gap-y-2 ">
          {filteredProducts.map((product) => {
            return (
              <div key={product._id} className=" w-[175px]   md:w-[300px]  ">
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
