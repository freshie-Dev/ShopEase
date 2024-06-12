import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import Navbar from './buyer/navbar/Navbar'
import Footer from './footer/Footer'

const LayoutBuyer = () => {
  const user = null
  return (
    <>
        <Navbar/>
        {!user ? <Navigate to="/" /> : <Outlet/>}
        <Footer/>
    </>
  )
}

export default LayoutBuyer