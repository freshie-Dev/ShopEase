import React from 'react'

import { Outlet } from 'react-router-dom'

import Navbar from './buyer/navbar/Navbar'
import Footer from './footer/Footer'

const LayoutBuyer = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default LayoutBuyer