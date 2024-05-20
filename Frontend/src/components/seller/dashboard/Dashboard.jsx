import React, { useState } from "react";
import ProductForm from "../add-product/ProductForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


import Modules from "./Modules";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";

import "./App.css"
import { useStyleContext } from "../../../context/style-context/StyleContextProvider";
import ImageVerification from "../add-product/Image-verification/ImageVerification";
const Dashboard = () => {
  const {openSidebarToggle, setOpenSidebarToggle, OpenSidebar} = useStyleContext();
  const [currentPage, setCurrentPage] = useState("home");
  return (
    // <LocalStyles>
    <>
      {/* <div className="main p-10 gap-2">
        <div className="flex w-full gap-2">
          <Modules text="Add a new Product" goto="/seller/dashboard/add-product" />
          <Modules text="Take a look at your earnings" />
        </div>

        <div className="flex w-full gap-2">
          <Modules text="Seamlessly manage your inventory" />
          <Modules text="Get Seasonal Product recommendations" />
        </div>
      </div> */}
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          setPage = {setCurrentPage}
        />
        {currentPage === "home" && <Home/>}
        {currentPage === "productForm" && <>
        <div className="main-title">
          <h1>Add a Product</h1>
        </div>
        <ProductForm/>
        </>}
        {currentPage === "imageVerification" && <ImageVerification/>}
        {/* <Home /> */}
        {/* <ProductForm/> */}
      </div>
      </>
    // </LocalStyles>
  );
};

export default Dashboard;

const LocalStyles = styled.div``;
