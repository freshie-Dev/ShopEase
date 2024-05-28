import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import hamburgerIcon from "../../../assets/hamburger-icon.png";
import crossIcon from "../../../assets/cross-icon.png";
import Menu from "./Menu";
import Settings from "./Settings";
import { useStyleContext } from "../../../context/style-context/StyleContextProvider";
import { useUserContext } from "../../../context/user-context/UserContextProvider";

const Navbar = () => {
  const {mobileNav, setMobileNav} = useStyleContext();
  const {userState} = useUserContext();
  const userInfo = JSON.parse(localStorage.getItem("userinfo")) || userState.loggedInUserInfo;




  return (
    <LocalStyles>
      <div className=" fixed top-0 w-screen h-[100px] bg-[#BB9773] text-[#D9A470]   flex justify-between items-center px-2 border-[white] border-b-2">
        {/* //! Logo */}
        <h1 className="text-4xl font-bold text-[white]">ShopEase</h1>

        {/* //! Resposive Menu */}
        <Menu mobileNav={mobileNav} userInfo={userInfo}/>

        {/* //!settings */}
        <Settings userInfo={userInfo}/>

        {/* //!Hamburger Icon */}
          <img
            className="w-[25px] flex md:hidden"
            src={mobileNav ? crossIcon : hamburgerIcon}
            onClick={()=> setMobileNav(!mobileNav)}
          />

      </div>
    </LocalStyles>
  );
};

export default Navbar;

const LocalStyles = styled.div`
  .active {
    font-weight: bold;
    font-size: 1.25rem;
  }
`;
