import React from "react";
import useFilterContext from "../../../context/filter-context/FilterContext";
import CustomButton from "../../../custom-components/HoverButton";

import { FaFilterCircleXmark } from "react-icons/fa6";

const FilterSection = () => {
  const {
    filters: { text, category, colors, price, maxPrice, minPrice },
    getCategories,
    getColors,
    clearFilters,
    updateFilterValue,
  } = useFilterContext();

  return (
    < >
      <input
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={(e) => updateFilterValue(e)}
        placeholder="Search for Products"
        className="p-3  w-[100%] rounded-md bg-[#d9a470d3]  placeholder:text-[#383838] font-[300] text-[1.2rem] text-[#f5e6cb] focus:outline-none"
      />
      <div>
        <p className="font-bold text-lg mt-2">Categories</p>
        <div className="w-full h-[1.5px] rounded-[100%] bg-[#d9a470]"></div>
        <div>
          <ul className="ml-3 mt-1">
            {getCategories().map((category, index) => {
              return (
                <li key={index} className=" cursor-pointer ">
                  <button
                    name="category"
                    value={category}
                    onClick={(e) => updateFilterValue(e)}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <p className="font-bold text-lg mt-2">Colors</p>
        <div className="w-full h-[1.5px] rounded-[100%] bg-[#d9a470]"></div>

        <div className="flex items-center gap-1 ml-3 mt-2">
          {getColors().map((color, index) => {
            return (
              <button
                type="button"
                name="colors"
                value={color}
                onClick={(e) => {
                  updateFilterValue(e);
                }}
                //   onClick={(e) => {
                //     color === "all" ? "resetColors()" : updateFilterValue(e);
                //   }}
                key={index}
                style={{ backgroundColor: color }}
                className={`${
                  color === "all"
                    ? " w-[30px] p-1 h-[30px]"
                    : "w-[20px] h-[20px]"
                } rounded-full border-[#5a5a5a] border-[1px] `}
              >
                {color === "all" && color}
              </button>
            );
          })}
        </div>
      </div>


      <div className="my-2 mt-4 w-full h-[1.5px] rounded-[100%] bg-[#d9a470]"></div>
      <div className="mt-2 ml-3">
        <button onClick={clearFilters} className=" flex  items-center p-3 pe-4 rounded-md duration-300 w-max bg-[#d9a470] text-black  hover:bg-[black] hover:text-[#d9a470] hover:border-2 hover:border-[#d9a470]">
          <p className="mx-2">Clear Filters</p> <FaFilterCircleXmark size={20} />
        </button>
      </div>
    </>
  );
};

export default FilterSection;
