

import Navbar from "@/components/buyer/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useUserContext } from "@/context/user-context/UserContextProvider";
import axios from "axios";
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const BuyerRoutes = () => {
const {loggedInUserInfo} = useUserContext()
console.log(loggedInUserInfo)
const userType = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")).usertype :  loggedInUserInfo ? loggedInUserInfo.usertype === "buyer" : null;
console.log("Printing user type from buyer routes", userType)
 return (
  userType ? (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  ) :
  <Navigate to="*"/>
 ) 
}

export default BuyerRoutes;
