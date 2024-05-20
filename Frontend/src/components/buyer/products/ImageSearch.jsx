import React, { useState } from "react";
import useFilterContext from "../../../context/filter-context/FilterContext";

const ImageSearch = () => {
    const {searchImage, searchByImage} = useFilterContext()
  const [fileName, setFileName] = useState("Search By Image");

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Upload File");
    }
  };
  return (
    <div className="w-full p-2">
      <label
        className="flex justify-center items-center my-2 border-[1px] border-black  bg-[#d9a470] text-black hover:border-[#d9a470] hover:bg-black hover:text-[#d9a470] duration-300 h-[50px] w-full rounded-full"
        htmlFor="file-input"
      >
        <h1>{!searchImage ? "Search by file" : searchImage.name}</h1>
      </label>{" "}
      <input
        id="file-input"
        type="file"
        name="product_image"
        placeholder="Upload the image"
        required
        value={searchImage}
        onChange={searchByImage}
      />
    </div>
  );
};

export default ImageSearch;
