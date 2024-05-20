import React from "react";
import CustomButton from "../../custom-components/HoverButton";

import { FaFacebookF } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="flex justify-evenly items-center bg-[#bb9773] border-white border-t-2 py-10">
      <div className="flex flex-col justify-center items-center">
        <p>Subscribe to our Newsletter!</p>
        <input
          placeholder="Enter your Email"
          type="email"
          className=" placeholder:text-[white] p-3 border-[2px] rounded-md border-black  bg-transparent  font-[300] text-[1.2rem] text-[#f5e6cb] focus:outline-none"
        />
        <CustomButton className="text-sm p-1 border-[2px]">
          Subscribe
        </CustomButton>
      </div>
      <div className="text-center">
        <p className="mb-2">Follow us on</p>
        <div className="flex justify-evenly">
          <a href="https://www.facebook.com/profile.php?id=100004357007777">
            <FaFacebookF
              className="mx-3 hover:text-white duration-300"
              size={25}
            />
          </a>
          <a href="">
            <BiLogoInstagramAlt
              className="mx-3 hover:text-white duration-300"
              size={25}
            />
          </a>
          <a href="">
            <FaTwitter
              className="mx-3 hover:text-white duration-300"
              size={25}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
