import React, { useState } from "react";
import useCartContext from "../../../context/cart-context/CartContextProvider";
import { getComplementaryColor } from "../../../helpers/helpers";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../custom-components/HoverButton";
import Total from "./Total";

const Cart = () => {
  const navigate = useNavigate()
  const {customizedImage} = useCartContext()
  const { cartState, increaseQuantity, decreaseQuantity, removeCartItem } =
    useCartContext();
  if (cartState.totalItems === 0) {
    return (
      <div className="mt-[100px] h-[80vh] bg-[#F0D8C0] flex flex-col justify-center items-center">
        <p>Currently you have no items in Cart</p>
        <NavLink
          className="my-2 text-2xl font-bold   p-2 mx-4   bg-transparent border-[2px] border-black hover:bg-[#000] hover:text-[#d9a470] rounded-md  duration-300"
          to="/buyer/products"
        >
          Go Shopping
        </NavLink>
      </div>
    );
  }

 
  
  return (
    <div className="mt-[100px] pb-[20px] min-h-[100vh] bg-[#F0D8C0] text-center">
      <h1 className=" pt-10 text-2xl md:text-4xl font-bold ">
        Cart
      </h1>
      <div className="rounded-md p-3  justtify-center flex flex-col ">
        <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>
        {cartState.cart &&
          cartState.cart.map((cartItem) => {
            const { id, _id, title, max, size, price, quantity, color, image, customizable, customizedImage } =
              cartItem;
              console.log(customizable)
            return (
              <div className="py-6">
                <div
                  key={id}
                  className="flex justify-evenly item-center md:flex-row flex-col w-[full] my-3"
                >
                  <div className="flex">
                    <img
                      className="float-left rounded-md"
                      src={customizedImage? customizedImage : image}
                      width={110}
                      alt='Custom product'
                    />
                    <div className="">
                      <h3 className="font-bold text-lg">{title}</h3>
                      <div className="ml-2 my-2 text-[#424242]">
                        <p className="inline">Color: </p>
                        <p
                          className="inline p-1 rounded-md"
                          style={{
                            backgroundColor: color,
                            color: getComplementaryColor(color),
                          }}
                        >
                          {color}
                        </p>
                        <p>Size: {size}</p>
                        <p>Stock: {max}</p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <p className="font-light">Each for</p>
                    <b>{price} Rs</b>
                  </div>
                  <div className="text-center">
                    <b className="">Quantity</b>
                    <div className="flex w-full justify-evenly">
                      <button
                        onClick={() => decreaseQuantity(id)}
                        className="h-[20px] w-[30px]  bg-black text-[#d9a470] rounded-md hover:bg-[#d9a470] hover:text-black duration-300"
                      >
                        -
                      </button>
                      <p className="mx-1">{quantity}</p>
                      <button
                        onClick={() => increaseQuantity(id)}
                        className="h-[20px] w-[30px]  bg-black text-[#d9a470] rounded-md hover:bg-[#d9a470] hover:text-black duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <b className="">Total</b>
                    <p className="p-2 rounded-md font-bold bg-[#d9a470]">
                      {price * quantity} Rs
                    </p>
                  </div>
                </div>
                <div>
                  <CustomButton className='w-[30%] text-xl h-min p-1' onClick={()=> navigate(`/buyer/singleproduct/${_id}`)} >Go To Product</CustomButton>
                  <CustomButton className='w-[30%] text-xl h-min p-1 border-red-500 bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-800' onClick={()=> removeCartItem(id)}>Remove</CustomButton>
                  <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>

                </div>
                
              </div>
            );
          })}
      </div>
      <Total/>
    </div>
  );
};

export default Cart;
