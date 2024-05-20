import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import { MdSettings } from 'react-icons/md'
import Settings from '../../buyer/navbar/Settings'

function Header({OpenSidebar}) {

  const userInfo = JSON.parse(localStorage.getItem("userinfo")) || userState.loggedInUserInfo;

  return (
    <header className='header bg-[#BB9773] border-l-2 border-[#916E4B]'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <BsSearch  className='icon'/> */}
        </div>
        <div className='header-right flex gap-2'>
            
            <Settings userInfo={userInfo}/>
        </div>
    </header>
  )
}

export default Header