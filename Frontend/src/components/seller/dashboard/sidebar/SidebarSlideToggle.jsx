import React from 'react'
import { useStyleContext } from '../../../../context/style-context/StyleContextProvider'

import hamburgerIcon from "../../../../assets/hamburger-icon.png";
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const  SidebarSlideToggle = () => {
    const {mobileNav, setMobileNav, handleMobileNav} = useStyleContext()
  return (
    <div onClick={handleMobileNav} className='absolute right-0 md:hidden p-[1.3rem]'>
        {mobileNav ? <RxCross1 size={20} color='#5F3E1D'/>  : <GiHamburgerMenu size={20} color='#5F3E1D'/> }


    </div>
  )
}

export default  SidebarSlideToggle