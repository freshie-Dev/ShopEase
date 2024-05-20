import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { FaRegImages } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar, setPage }) {
  // const navigate = Navigate();
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title flex justify-center items-center">
        <div className="sidebar-brand flex">
          <BsCart3 className="icon_header" /> SHOPEASE
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item" onClick={() => setPage("home")}>
          <Link className="flex">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => setPage("productForm")}
        >
          <Link className="flex">
            <BsFillArchiveFill className="icon" /> Add Products
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={() => setPage("imageVerification")}>
          <Link className="flex" href="">
            <FaRegImages size={24} className="icon" /> Image Verification
          </Link>
        </li>
        {/* <li className='sidebar-list-item'>
                <a className = "flex" href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li> */}
        <li className="sidebar-list-item">
          <a className="flex" href="">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a className="flex" href="">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>
        {/* <li className='sidebar-list-item'>
                <a className = "flex" href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li> */}
        {/* <li className="sidebar-list-item">
          <a className="flex" href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
