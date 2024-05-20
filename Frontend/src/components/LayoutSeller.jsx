import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'

import Navbar from './seller/navbar/Navbar'
import Footer from './footer/Footer'
import Sidebar from './seller/dashboard/Sidebar'
import { useStyleContext } from '../context/style-context/StyleContextProvider'

const LayoutSeller = () => {

  // const {openSidebarToggle, setOpenSidebarToggle, OpenSidebar} = useStyleContext();
  return (
    <>
        {/* <Navbar/> */}
        {/* <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        /> */}
        <Outlet/>
        <Footer/>
    </>
  )
}

export default LayoutSeller