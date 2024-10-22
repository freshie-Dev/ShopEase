import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomButton from "@/custom-components/HoverButton";
import { useSellerActionsContext } from "@/context/seller-context/SellerContextProvider";
import useSnackbar from "@/custom-components/notification/useSnackbar";
import { formatDate } from "@/helpers/helpers";

const Orders = () => {
  const { showSuccess, showError } = useSnackbar();
  const { fetchOrders, fetchedOrders, updateStatus } = useSellerActionsContext();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleStatusUpdate = async (e, order) => {
    const orderId = order._id;
    const statusValue = e.target.name;

    const status = await updateStatus(orderId, statusValue);

    if (status.result) {
      await fetchOrders();
      showSuccess(status.message, { autoHideDuration: 2000 });
    } else {
      showError(status.message, { autoHideDuration: 2000 });
    }
    setSelectedOrderId(null); // Close the modal after update
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!fetchedOrders) {
    return <h1>Loading...</h1>;
  }

  return (
    <DIV className="flex-grow   bg-color2 text-white pt-[50px] px-2 md:p-6">
      <Table className=" overflow-auto ">
        <TableCaption>Order Management</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customer.username}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="relative flex flex-col justify-center items-center">
                <CustomButton
                  onClick={() =>{}}
                  className="h-[25px] w-[100px] py-0 text-sm border-[1px] font-semibold"
                >
                  View
                </CustomButton>
                <CustomButton
                  onClick={() => setSelectedOrderId((prevValue => {if(prevValue === order._id) {return null} else {return order._id}}))}
                  className="h-[25px] w-[100px] py-0 text-sm border-[1px] font-semibold"
                >
                  {selectedOrderId === order._id ? "Cancel" : "Update"}
                </CustomButton>
                {selectedOrderId === order._id && (
                  <div className="absolute z-50 flex flex-col items-start bottom-[-30%] right-[30%] px-2 py-[2px] rounded-md bg-[#757373]">
                    <button
                      onClick={(e) => handleStatusUpdate(e, order)}
                      name="active"
                    >
                      Active
                    </button>
                    <button
                      onClick={(e) => handleStatusUpdate(e, order)}
                      name="delivered"
                    >
                      Delivered
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DIV>
  );
};

export default Orders;

const DIV = styled.div``;
