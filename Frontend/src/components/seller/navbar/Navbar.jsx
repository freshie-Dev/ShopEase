import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStyleContext } from '../../../context/style-context/StyleContextProvider';
import { useUserContext } from '../../../context/user-context/UserContextProvider';
import Settings from '../../buyer/navbar/Settings';

const Navbar = () => {

  const {mobileNav, setMobileNav} = useStyleContext();
  const {userState} = useUserContext();
  const userInfo = JSON.parse(localStorage.getItem("userinfo")) || userState.loggedInUserInfo;

  return (
    <div className='fixed top-0 w-screen h-[100px] bg-black text-[#D9A470] cursive flex justify-between items-center px-2 border-[#D9A470] border-b-2'>
      <h1 className='text-xl md:text-3xl font-bold'>
        ShopEase
      </h1>
      <ul className="hidden md:flex p-2 rounded-sm  text-black bg-[#D9A470] min-w-[200px] justify-center">
        <li className="px-2 text-lg">
          <NavLink  to="/buyer/home">
            Seller Dashboard
          </NavLink>
        </li>
        {/* <li className="px-2 text-lg">
          <NavLink  to="/buyer/products">
            Add Product 
          </NavLink>
        </li>
        <li className="px-2 text-lg">
          <NavLink  to="/buyer/cart">
            Cart
          </NavLink>
        </li> */}
      </ul>
      <Settings userInfo={userInfo}/>
    </div>
  )
}

export default Navbar