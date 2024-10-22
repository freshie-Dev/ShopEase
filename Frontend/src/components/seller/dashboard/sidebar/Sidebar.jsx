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
import { IoPowerSharp } from "react-icons/io5";
import { useSellerNavigationContext } from "../../../../context/seller-navigation/SellerNavigationContext";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/user-context/UserContextProvider";
import { useIVContext } from "@/context/image-verification/ImageVerificationContextProvider";

const Sidebar = () => {
  const { goto } = useSellerNavigationContext();
  const {logOut} = useUserContext();
  const {setDuplicateProducts} = useIVContext()
  const location = useLocation();

  return (
    <DIV className="min-h-full py-[1px] min-w-[350px] bg-color1 md:block hidden  text-white">
      <ul>
        <li>
          <BsCart3 size={30} />
          <Link className="text-[1.75rem]" >ShopEase</Link>
        </li>
        <li >
          <BsGrid1X2Fill size={20} />
          <Link
            to="/seller/dashboard/home"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/home' ? 'active' : ''} duration-300`}
          >
            DashBoard
          </Link>
        </li>
        <li >
          <BsFillArchiveFill size={20} />
          <Link
            to="/seller/dashboard/add-product"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/add-product' ? 'active' : ''} duration-300`}
          >
            Add Product
          </Link>
        </li>
        <li >
          <FaRegImages size={20} />
          <Link
            to="/seller/dashboard/image-verification"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/image-verification' ? 'active' : ''} duration-300`}
          >
            Image Verification
          </Link>
        </li>
        <li >
          <BsPeopleFill size={20} />
          <Link
            to="/seller/dashboard/orders"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/orders' ? 'active' : ''}  duration-300`}
          >
            Orders
          </Link>
        </li>
        <li >
          <BsListCheck size={20} />
          <Link
            to="/seller/dashboard/inventory"
            className={`text-[1.2rem] ${location.pathname === '/seller/dashboard/inventory' ? 'active' : ''}  duration-300`}
          >
            Inventory
          </Link>
        </li>
        <li >
          <IoPowerSharp size={24} className="text-red-500"/>
          <Link
            className={`text-[1.2rem] hover:text-red-500 duration-300 ${location.pathname === '/seller/dashboard/customers' ? 'active' : ''}`}
            to={'/'}
            onClick={()=> {setDuplicateProducts([]); logOut();}}
          >
            Log Out
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
