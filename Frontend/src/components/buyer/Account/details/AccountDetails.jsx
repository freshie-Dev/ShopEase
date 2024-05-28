import React, { useState } from "react";
import { useStyleContext } from "../../../../context/style-context/StyleContextProvider";
import { useUserContext } from "../../../../context/user-context/UserContextProvider";

const AccountDetails = () => {
  const { userState } = useUserContext();

  const userInfo = JSON.parse(localStorage.getItem("userinfo")) || userState.loggedInUserInfo ;

  const {setOpenModal, setChangeField } =
    useStyleContext();

  return (
    <div className=" main flex-col  ">
      <h1 className="py-2 my-3 text-3xl text-[#D9A470]  ">
        Account Details
      </h1>
      <div className="bg-[#D9A470] w-full sm:w-[80%] p-3 md:w-[70%] lg:w-[50%] min-h-max flex flex-col justify-center items-center rounded-md ">
        <div className="w-full  duration-200 border-b-[1px] hover:bg-[#e6b788] border-[#bb7c3e] px-2">
          <p className="font-bold">Username</p>
          <p className="pl-1">{userInfo.username}</p>
        </div>
        <div className="w-full hover:bg-[#e6b788] duration-200 border-b-[1px] border-[#bb7c3e] px-2">
          <p className="font-bold">Email</p>
          <p className="pl-1">{userInfo.email}</p>
        </div>
        <div className="w-full hover:bg-[#e6b788] duration-200  px-2">
          <p className="font-bold">User Type</p>
          <p className="pl-1">{userInfo.usertype}</p>
        </div>
      </div>
      <h1 className="py-2 my-3 text-3xl text-[#D9A470]  ">
        Change Information
      </h1>
      <div className="bg-[#D9A470]  w-full sm:w-[80%] md:w-[70%] lg:w-[50%] min-h-max flex justify-between items-center rounded-md">
        <button
          onClick={() => {
            setChangeField("Password");
            setOpenModal(true);
          }}
          className="hover:bg-[#e6b788] border-[#bb7c3e] w-[50%] p-2  rounded-md"
        >
          Change Password
        </button>
        <div className="border-[1px] border-black h-[40px] w-[1px]"></div>
        <button
          onClick={() => {
            setChangeField("Username");
            setOpenModal(true);
          }}
          className="hover:bg-[#e6b788] border-[#bb7c3e] w-[50%] p-2  rounded-md"
        >
          Change Username
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
