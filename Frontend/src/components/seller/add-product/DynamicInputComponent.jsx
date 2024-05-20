import React, { useEffect, useState } from "react";
import FormInput from "../../register/FormInput";
import { useProductFormContext } from "../../../context/product-form/ProductFormProvider";

import { MdCancel } from "react-icons/md";

const DynamicInputComponent = () => {
  const {
    inputs,
    setInputs,
    handleAddInputField,
    deleteInput,
    handleAddSizeInput,
    deleteSize,
    handleColorInputChange,
    handleSizeInputChange,
  } = useProductFormContext();

  useEffect(() => {
  }, [inputs]);

  return (
    <div className=" text-[#E2D4BA]">
      {inputs.map((input) => (
        <div className="flex justify-between items-center border-[1px] border-black p-2 rounded-xl my-2">
          <div key={input.id} className="flex  items-center">
            <input
              type="text"
              value={input.colorName}
              onChange={(e) => handleColorInputChange(input.id, e.target.value)}
              placeholder="Color"
              className="h-[75px] p-2 mr-2"
            />
            {input.size.map((sizeObj) => {
              return (
                <div className="flex flex-col h-[70px] relative">
                  <button
                    onClick={() => {
                      deleteSize(input.id, sizeObj.sizeId);
                    }}
                    className="absolute top-0 right-1 text-red-500"
                  >
                    ✗
                  </button>
                  <input
                    placeholder="size"
                    value={sizeObj.sizeName}
                    name="sizeName"
                    className="w-[70px] h-[35px] mb-[1px] p-1 "
                    onChange={(e) => {
                      handleSizeInputChange(
                        input.id,
                        sizeObj.sizeId,
                        e.target.name,
                        e.target.value
                      );
                    }}
                  />
                  <input
                    placeholder="stock"
                    // type="number"
                    value={sizeObj.stock}
                    name="stock"
                    className="w-[70px] h-[35px] mb-[1px] p-1"
                    onChange={(e) => {
                      handleSizeInputChange(
                        input.id,
                        sizeObj.sizeId,
                        e.target.name,
                        e.target.value
                      );
                    }}
                  />
                </div>
              );
            })}
            <button
              className="hoverButton"
              onClick={(e) => {
                e.preventDefault();
                handleAddSizeInput(input.id);
              }}
            >
              + Add size
            </button>
          </div>
            <MdCancel
            onClick={()=> deleteInput(input.id)}
             className="hover:text-red-500 duration-150" size={25} />
         
        </div>
      ))}
      <button
        className="hoverButton"
        type="button"
        onClick={(e) => {
          // e.preventDefault();
          handleAddInputField();
        }}
      >
        Attributes Field &#65291;
      </button>
      {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
    </div>
  );
};

export default DynamicInputComponent;
