import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useCartContext from "../../../context/cart-context/CartContextProvider";
import { useUserContext } from "../../../context/user-context/UserContextProvider";

const Menu = ({ mobileNav, userInfo }) => {
  const navigate = useNavigate()

  const {logOut} = useUserContext();
  const {cartState} = useCartContext();

  const cartLength = cartState.totalItems;
  const accountDetailsPath = userInfo && userInfo.usertype === "seller" ? "/seller/account-details" : "/buyer/account-details" 

  return (
    <>
      {/* //! Menu */}
      <ul className="hidden relative md:flex p-2 rounded-sm  text-white bg-[#D9A470] min-w-[200px] justify-center">
        <li className="px-2 text-lg">
          <NavLink to="/buyer/home">Home</NavLink>
        </li>
        <li className="px-2 text-lg">
          <NavLink to="/buyer/products">Products</NavLink>
        </li>
        <li className="px-2 text-lg ">
          <NavLink className="" to="/buyer/cart">Cart </NavLink>
          <p className="absolute right-[-5px] top-[-5px]  w-[20px] h-[20px] rounded-full  flex justify-center items-center bg-[#af8153]">{cartLength}</p>
        </li>
      </ul>

      {/* //! Mobile Menu */}
      <div
        className={`absolute z-[999] text-white bg-[#BB9773] h-[100vh] w-[60%] top-0 ${
          mobileNav ? "left-0" : "left-[-70%]"
        } duration-300 border-r-2 border-[white] `}
      >
        <p className="p-2 my-2 text-lg bg-[#916E4B] ">
          Hello, <span className="text-2xl font-bold">{userInfo.username}</span>
        </p>
        <p className="px-6 my-2 text-lg cursor-pointer" onClick={()=> navigate(accountDetailsPath)}>Account Details</p>
        <p className="px-6 my-2 text-lg cursor-pointer" onClick={()=> navigate('/buyer/orders')}>Your Orders</p>
        <Link className="px-6 my-2 text-lg cursor-pointer" to="/" onClick={()=> {logOut()}}>Sign Out</Link>

        <h1 className="p-2 my-2 text-2xl font-bold bg-[#916E4B]">Goto</h1>

        <p className="px-6 my-2 text-lg cursor-pointer">
          <NavLink to="/buyer/home">Home</NavLink>
        </p>
        <p className="px-6 my-2 text-lg cursor-pointer">
          <NavLink to="/buyer/products">Products</NavLink>
        </p>
        <p className="px-6 my-2 text-lg  p-2 relative cursor-pointer">
          <NavLink to="/buyer/cart">Cart</NavLink>
          <p className="absolute right-2 top-2 bg-[#BB9773] h-[20px]  ">{cartLength} items</p>
        </p>
      </div>
    </>
  );
};

export default Menu;
