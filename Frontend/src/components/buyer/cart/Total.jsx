import React from "react";
import useCartContext from "../../../context/cart-context/CartContextProvider";
import CustomButton from "../../../custom-components/HoverButton";
import { NavLink, useNavigate } from "react-router-dom";

const Total = () => {
  const navigate = useNavigate();
  const {checkout} = useCartContext()
  const { cartState } = useCartContext();
  return (
    <div className="flex w-full mt-12">
      <div className="md:w-[50%] md:block hidden"></div>
      <div className="flex flex-col md:w-[50%] w-[100%] bg-[#916E4B] py-4 px-6 rounded-xl mx-20">
        <div className="flex justify-between my-2">
          <p className="">Total Items</p>
          <p className="w-[100px] pr-[90px]">{cartState.totalItems}</p>
        </div>

        <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>

        <div className="flex justify-between my-2">
          <p className="">Total Price (PKR)</p>
          <p className="w-[100px] pr-[90px]">{cartState.totalPrice}</p>
        </div>
       
        <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>

        <div className="flex justify-between my-2">
          <p className="">Shipping Fee</p>
          <p className="w-[100px] pr-[90px]">{cartState.shippingFee}</p>
        </div>
        
        <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>

        <div className="flex justify-between my-2">
          <p className="">Order Total (PKR)</p>
          <p className="w-[100px] pr-[90px]">{cartState.orderTotal}</p>
        </div>

        <div className="h-[4px]  bg-[#d9a470] rounded-[100%] px-[50px]"></div>
        
        {/* <NavLink to="/buyer/checkout" > go too</NavLink> */}
        <NavLink to="/buyer/checkout"><CustomButton className="border-white mt-10" >Checkout</CustomButton></NavLink>
        {/* <CustomButton onClick={checkout} className="border-white mt-10" >Checkout</CustomButton> */}
        

      </div>
    </div>
  );
};

// totalItems: "",
//   totalPrice: "",
//   shippingFee: 5,
//   orderTotal: "",
export default Total;
