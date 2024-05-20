import React from "react";
import { useNavigate } from "react-router-dom";

const Modules = ({ text, goto }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(goto)}
      className="duration-300 flex justify-center items-center w-[50%] min-h-[200px] p-4 border-2 border-black rounded-xl hover:bg-black hover:text-[#d9a470] duration-300]"
    >
      <h1 className="text-center font-bold text-xl">{text}</h1>
    </div>
  );
};

export default Modules;
