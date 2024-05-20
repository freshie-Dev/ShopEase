import React, { useState } from "react";
import { useProductFormContext } from "../../../context/product-form/ProductFormProvider";


const TagInput = () => {
  const {categories, setCategories} = useProductFormContext();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    // e.preventdefault();
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent default form submission behavior
      setCategories([...categories, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="flex my-[1px] ">
      <input
        type="text"
        className="p-2"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add category *press enter to add*"
      />
      <div className="flex">
        {categories.map((category, index) => (
          <div
            key={index}
            className="tag bg-[#000000c0] text-[#d9a470]  mx-1  rounded-xl p-3 relative cursive flex justify-center items-center"
          >
            <span>{category}</span>
            <button
              className="absolute text-red-500  top-[2px] right-[3px] p-2  pb-1 w-4 h-4 flex justify-center items-center "
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
