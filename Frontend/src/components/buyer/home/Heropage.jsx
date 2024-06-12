import React from "react";
import heroPageContent from "./Content.json";
import CustomButton , {CustomButton2} from "../../../custom-components/HoverButton";



const Heropage = () => {
  const { section1 } = heroPageContent;
  return (
    // <section className=" flex flex-col md:flex-row  w-full h-[87vh] text-black ">
    <div className="w-full  flex justify-center items-center min-h-[87vh] bg-[#F0D8C0] mt-[100px]">
      <div className="flex flex-col justify-center items-center md:flex-row  w-full  ">
        <div className="md:w-[50%] md:min-h-[80vh] p-4 text-[#f7ede5] bg-[#C7AA8C] m-4 rounded-md">
          {" "}
          {/* //! Left half */}{" "}
          <h1 className="  w-full text-2xl max-w-max px-8 py-4 my-5 rounded-md font-bold border-2 border-white text-[#FFE9D4] bg-[#916E4B]">
            Welcome to <span className="text-5xl font-bold">ShopEase</span>
          </h1>
          <p className="text-lg font-light">{section1.intro1}</p>
          <p className="text-lg  font-light">{section1.intro2}</p>
        </div>

        <div className="md:w-[50%] md:min-h-[80vh] flex flex-col justify-evenly items-center p-4  bg-[#C7AA8C] m-4 rounded-md">
          {" "}
          {/* //! Right half */}
          <div className="  my-3  md:my-0 flex ">
            <p className="text-lg font-light pr- md:w-[75%] md:float-left pr-[20px] text-[#f7ede5]">
              <span className="text-3xl  font-bold">Explore</span>{" "}
              {section1.explore}
            </p>
           <CustomButton className="min-w-[120px] text-[#FFE9D4] bg-[#916E4B] border-white hover:bg-[#C7AA8C] hover:border-[#916E4B] hover:text-[#916E4B]">Explore</CustomButton>
          </div>
          <div className=" my-3 md:my-0 flex flex-row-reverse">
            <p className="text-lg font-light md:w-[75%] pl-[20px] md:float-right  text-[#f7ede5]">
              <span className="text-3xl font-bold">In a hurry</span>{" "}
              {section1.inAHurry}
            </p>
            <CustomButton className="min-w-[120px] text-[#FFE9D4] bg-[#916E4B] border-white hover:bg-[#C7AA8C] hover:border-[#916E4B] hover:text-[#916E4B]">Take a Look</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heropage;
