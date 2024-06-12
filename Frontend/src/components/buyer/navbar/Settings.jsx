import React, { useState } from "react";
import settingsIcon from "../../../assets/settings-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/user-context/UserContextProvider";
import { MdSettings } from "react-icons/md";

const Settings = ({ userInfo }) => {
    const navigate = useNavigate();
    const {logOut} = useUserContext();

    const [settings, setSettings] =useState(false)
    const handleClick = () => setSettings(!settings)

    const accountDetailsPath = userInfo.usertype === "seller" ? "/seller/account-details" : "/buyer/account-details" 

  return (
    <div className="hidden text-[white] md:flex justify-center items-center relative ">
      <p className="px-2">
        Hello,{" "}
        <span className="text-[1.3rem] font-bold ">{userInfo.username}</span>
      </p>
      {/* <img className={`${settings ? " rotate-180" : "rotate-0"} duration-300`} src={settingsIcon} alt="" onClick={handleClick} /> */}
      
      <MdSettings onClick={handleClick}  size={30}  className={`${settings ? " rotate-180" : "rotate-0"} duration-300 text-[#8e6e4e] hover:text-[#F7E0C9]`}/>
      
      <div className={`${settings ? "absolute" : "hidden"} bottom-[-140px] right-0 bg-black rounded-md min-w-[162px]`}>
        
        <p className="px-6 my-2 text-lg min-w-max"><NavLink to={accountDetailsPath} >Account Details</NavLink></p>
        {userInfo.type === "buyer" && <p className="px-6 my-2 text-lg min-w-max"><NavLink to='/buyer/orders'>Orders</NavLink></p>}
        <p className="px-6 my-2 text-lg min-w-max"><NavLink to="/" onClick={()=> {logOut()}}>Sign Out</NavLink></p>

      </div>

    </div>
  );
};

export default Settings;
