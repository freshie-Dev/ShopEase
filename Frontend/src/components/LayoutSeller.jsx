import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'

import SideBar from "./seller/dashboard/sidebar/Sidebar"
import SidebarSlideToggle from "./seller/dashboard/sidebar/SidebarSlideToggle"
import SidebarSlide from "./seller/dashboard/sidebar/SidebarSlide"

const LayoutSeller = () => {

  return (
    <div className='flex w-full min-h-screen relative '>
        {/* <Navbar/> */}
        < SideBar/>
        < SidebarSlideToggle/>
        < SidebarSlide/>
        <Outlet/>
        {/* <Footer/> */}
    </div>
  )
}

export default LayoutSeller