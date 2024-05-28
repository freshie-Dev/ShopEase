import React, { useState } from "react";
import { useProductFormContext } from "../../../../context/product-form/ProductFormProvider";
import CustomButton from "../../../../custom-components/HoverButton";
import styled from "styled-components";
const options = [
  "Activewear",
  "Boots",
  "Bottoms",
  "Coat",
  "Dress",
  "Footwear",
  "Jeans",
  "Jacket",
  "Joggers",
  "Pants",
  "Sandals",
  "Shirt",
  "Skirt",
  "Sleepwear",
  "Sneakers",
  "Sportswear",
  "Sweater",
  "Swimwear",
  "T-shirt",
  "Tops",
  "Trousers",
  "Underwear",
  // Add more clothing categories as needed
];


const TagInput = () => {
  const { categories, setCategories } = useProductFormContext();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddCategory = () => {
    if (selectedOption !== "" && !categories.includes(selectedOption)) {
      setCategories([...categories, selectedOption]);
      setSelectedOption("");
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="flex flex-col my-[1px]">
      <div className="flex my-2">
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="ml-[2px]  p-3 rounded-lg bg-[#2E251C] text-gray-400"
        >
          <option value="" disabled>
            Select category
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <CustomButton
        type="button"
          onClick={handleAddCategory}
          className=" hoverButton text-base"
        >
          Add
        </CustomButton>
      </div>
      <div className="flex mt-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="tag bg-[#000000c0] text-[#d9a470] mx-1 rounded-xl p-3 relative   flex justify-center items-center"
          >
            <span>{category}</span>
            <button
              className="absolute text-red-500 top-[2px] right-[3px] p-2 pb-1 w-4 h-4 flex justify-center items-center"
              onClick={() => handleRemoveCategory(index)}
            >
              ✗
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
const DIV = styled.div`
  
`
