import React, { useEffect, useState } from "react";
import { useProductFormContext } from "../../../../context/product-form/ProductFormProvider";
import { getComplementaryColor } from "../../../../helpers/helpers";

import { MdCancel } from "react-icons/md";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import CustomButton from "../../../../custom-components/HoverButton";

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

  useEffect(() => {}, [inputs]);

  return (
    <LocalStyles>
      <div className=" text-[#E2D4BA] flex flex-col">
        {inputs.map((input) => (
          <div className="flex justify-between items-center border-[1px] border-black p-2 rounded-xl my-2 ">
            <div
              key={input.id}
              className="flex flex-col sm:flex-row  items-center mx-4 my-2"
            >
              {/* <input
              type="text"
              value={input.colorName}
              onChange={(e) => handleColorInputChange(input.id, e.target.value)}
              placeholder="Color"
              className="h-[75px] p-2 mr-2"
            /> */}

              <div className="flex gap-2 justify-center items-center">
                <HexColorPicker
                  style={{ width: "100px", height: "100px" }}
                  color={input.colorName}
                  onChange={(e) => handleColorInputChange(input.id, e)}
                />
                <div>
                  <input
                    type="text"
                    value={input.colorName}
                    onChange={(e) =>
                      handleColorInputChange(input.id, e.target.value)
                    }
                    className=" p-1 my-2 w-[100px]"
                    placeholder="#ffffff"
                  />
                  <div
                    className="p-1 my-2 w-[100px] h-[40px] rounded-xl"
                    style={{
                      backgroundColor: input.colorName,
                      border: `${getComplementaryColor(
                        input.colorName
                      )} 2px solid`,
                    }}
                  ></div>
                </div>
              </div>

              <div className=" ml-2 h-full grid grid-cols-3 md:grid-cols-5 gap-4">
                {input.size.map((sizeObj) => {
                  return (
                    <div className="flex gap-4 flex-col justify-center items-center  relative">
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
                <div className="flex justify-center items-center">
                  <CustomButton
                    className=" text-base border-[1px]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddSizeInput(input.id);
                    }}
                  >
                    + Add size
                  </CustomButton>
                </div>
              </div>
            </div>
            <MdCancel
              onClick={() => deleteInput(input.id)}
              className="hover:text-red-500 duration-150"
              size={25}
            />
          </div>
        ))}
        <CustomButton
        className="hoverButton text-xl"
          type="button"
          onClick={(e) => {
            // e.preventDefault();
            handleAddInputField();
          }}
        >
          Attributes Field &#65291;
        </CustomButton>
        {/* <pre>{JSON.stringify(inputs, null, 2)}</pre> */}
      </div>
    </LocalStyles>
  );
};

export default DynamicInputComponent;

const LocalStyles = styled.div`
  .hoverButton {
    width: 100%;
    margin: 0;
    font-weight: 300;
  }
  input {
    font-size: 1rem;
  }
`;
