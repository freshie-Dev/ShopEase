import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styled from "styled-components";
import CustomButton from "@/custom-components/HoverButton";
import useSnackbar from "@/custom-components/notification/useSnackbar";
import { ClipLoader } from "react-spinners";

import shirtImg from "@/assets/custom.jpg"

const Inventory = () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const baseUrlPython = import.meta.env.PYTHON_BACKEND_API_BASE_URL;
  const { showError, showSuccess } = useSnackbar();
  const [userProducts, setUserProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState({});

  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token,
        },
      };
      const response = await axios.get(
        `${baseUrl}products/seller_products`,
        config
      );
      setLoading(false);
      console.log(response.data);
      setUserProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setDelLoading((prevDelLoading) => ({
        ...prevDelLoading,
        [productId]: true,
      })); // set loading state for this product ID

      const response = await axios.delete(
        `${baseUrl}products/delete_product/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const deleted_product_key = response.data.deletedProduct.uniqueIdentifier;
      if(deleted_product_key) {
        const response2 = await axios.post(`http://127.0.0.1:5000/delete_image`, { deleted_product_key });
        console.log(response2.data)
      } 
      

      setDelLoading((prevDelLoading) => ({
        ...prevDelLoading,
        [productId]: false,
      }));
      setUserProducts(response.data.updatedProducts);

      showSuccess(response.data.message, { autoHideDuration: 1000 });

      //   setUserProducts(userProducts.filter(product => product._id !== productId));
    } catch (error) {
      setDelLoading((prevDelLoading) => ({
        ...prevDelLoading,
        [productId]: false,
      })); // set loading state for this product ID
      showError("Failed to delete Product", { autoHideDuration: 1000 });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  } else {
    return (
      <DIV className="flex-grow   bg-color2 text-white pt-[50px] px-2 md:p-6">
        <Table>
          <TableCaption>Inventory</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sr #</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Colors</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userProducts.map((item, index) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell><img src={item.imageUrl || shirtImg} className="w-[40px] rounded-lg" alt="" /></TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    {item.attributes.map((attr) => {
                      return (
                        <div
                          style={{
                            background: attr.colorName,
                          }}
                          className="flex gap-2 p-[.5rem] rounded-sm my-[.3rem]"
                          key={attr._id}
                        >
                          {attr.size.map((size, index) => {
                            return (
                              <>
                                <span>{size.sizeName}: </span>
                                <span>
                                  {size.stock}{" "}
                                  {attr.size.length !== index + 1 && ","}
                                </span>
                              </>
                            );
                          })}
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    <CustomButton
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                      className="h-[25px] w-[100px] py-0 text-sm border-[1px] font-semibold"
                    >
                      {delLoading[item._id] ? "Loading..." : "Delete"}
                    </CustomButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DIV>
    );
  }
};

export default Inventory;

const DIV = styled.div`
  /* background-color: black; */
`;
// flex-grow p-2 md:p-6 bg-color3 text-white
