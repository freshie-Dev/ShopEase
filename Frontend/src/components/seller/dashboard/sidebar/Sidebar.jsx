import React from "react";
import styled from "styled-components";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsListCheck,
} from "react-icons/bs";
import { FaRegImages } from "react-icons/fa6";
import { useSellerNavigationContext } from "../../../../context/seller-navigation/SellerNavigationContext";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { goto } = useSellerNavigationContext();
  const location = useLocation();

  return (
    <DIV className="min-h-full py-[1px] min-w-[350px] bg-color1 md:block hidden text-white">
      <ul>
        <li>
          <BsCart3 size={30} />
          <Link className="text-[1.75rem]" to="/">ShopEase</Link>
        </li>
        <li onClick={() => goto("home")}>
          <BsGrid1X2Fill size={20} />
          <Link
            to="/seller/dashboard/home"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/home' ? 'active' : ''} duration-300`}
          >
            DashBoard
          </Link>
        </li>
        <li onClick={() => goto("productForm")}>
          <BsFillArchiveFill size={20} />
          <Link
            to="/seller/dashboard/add-product"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/add-product' ? 'active' : ''} duration-300`}
          >
            Add Product
          </Link>
        </li>
        <li onClick={() => goto("imageVerification")}>
          <FaRegImages size={20} />
          <Link
            to="/seller/dashboard/image-verification"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/image-verification' ? 'active' : ''} duration-300`}
          >
            Image Verification
          </Link>
        </li>
        <li onClick={() => goto("customers")}>
          <BsPeopleFill size={20} />
          <Link
            to="/seller/dashboard/customers"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/customers' ? 'active' : ''}`}
          >
            Customers
          </Link>
        </li>
        <li onClick={() => goto("inventory")}>
          <BsListCheck size={20} />
          <Link
            to="/seller/dashboard/inventory"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/inventory' ? 'active' : ''}`}
          >
            Inventory
          </Link>
        </li>
      </ul>
    </DIV>
  );
};

export default Sidebar;

const DIV = styled.div`
  li {
    margin: 1.5rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  li:first-child {
    font-weight: bolder;
  }
  .active {
    font-weight: bold;
  }
`;
