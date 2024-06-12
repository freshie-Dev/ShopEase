import React, { useState } from "react";
import useFilterContext from "../../../context/filter-context/FilterContext";
import axios from "axios";
import useSnackbar from "@/custom-components/notification/useSnackbar";
import { ClockLoader } from "react-spinners";

const ImageSearch = () => {
  const { showError } = useSnackbar();
  const { filters, updateQueryImageFilterValue } = useFilterContext();

  const [selectedFilename, setSelectedFilename] = useState(null);
  const [onLoading, setOnLoading] = useState(false)

  const handleEmptyInput = () => {
    showError("Please select an image", { autoHideDuration: 2000 });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFilename) {
      handleEmptyInput();
    } else {
      setOnLoading(true)
      const form = document.getElementById("query_image_form");
      const formData = new FormData(form);
      const userId = JSON.parse(localStorage.getItem("userinfo"))._id;

      formData.append("userId", userId);
      console.log(formData);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/image_search",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        updateQueryImageFilterValue({
          name: "query_image",
          value: response.data.unique_identifiers,
        });
      } catch (error) {
        console.log("error while fetching results");
      }
      setOnLoading(false)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="query_image_form"
      className=" col-span-full p-2 relative"
    >
      <label
        className="flex justify-center items-center my-2 border-[1px] border-black  bg-[#d9a470] text-black hover:border-[#d9a470] hover:bg-black hover:text-[#d9a470] duration-300 h-[50px] w-full rounded-full"
        htmlFor="file-input"
      >
        {/* <h1>{!queryImage ? "Search by file" : "image123"}</h1> */}
        <h1>{selectedFilename ? selectedFilename : "Upload Image"}</h1>
      </label>{" "}
      <input
        id="file-input"
        type="file"
        name="query_image"
        placeholder="Upload the image"
        accept="image/*"
        onChange={(e) => setSelectedFilename(e.target.files[0].name)}
      />
      <button
        type="submit"
        className="top-[19px] right-3  absolute h-[45px] w-[100px] rounded-r-full  bg-black flex justify-center items-center"
      >
        {onLoading ? <ClockLoader color="#D9A470" size={30}/> : "Search"}
      </button>
    </form>
  );
};

export default ImageSearch;
