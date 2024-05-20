import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ({ mobileNav, userInfo }) => {
  return (
    <>
      {/* //! Menu */}
      <ul className="hidden md:flex p-2 rounded-sm  text-white bg-[#D9A470] min-w-[200px] justify-center">
        <li className="px-2 text-lg">
          <NavLink to="/buyer/home">Home</NavLink>
        </li>
        <li className="px-2 text-lg">
          <NavLink to="/buyer/products">Products</NavLink>
        </li>
        <li className="px-2 text-lg">
          <NavLink to="/buyer/cart">Cart</NavLink>
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
        <p className="px-6 my-2 text-lg">Account Details</p>
        <p className="px-6 my-2 text-lg">Your Orders</p>
        <p className="px-6 my-2 text-lg">Sign Out</p>

        <h1 className="p-2 my-2 text-2xl font-bold bg-[#916E4B]">Goto</h1>

        <p className="px-6 my-2 text-lg">
          <NavLink to="/buyer/home">Home</NavLink>
        </p>
        <p className="px-6 my-2 text-lg">
          <NavLink to="/buyer/products">Products</NavLink>
        </p>
        <p className="px-6 my-2 text-lg">
          <NavLink to="/buyer/cart">Cart</NavLink>
        </p>
      </div>
    </>
  );
};

export default Menu;
