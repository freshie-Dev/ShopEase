import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { formatDate2, getComplementaryColor } from '@/helpers/helpers';
import shirtImg from "@/assets/custom.jpg"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GridLoader } from 'react-spinners';

const Orders = () => {
  const BaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("im running")
      try {
        const response = await axios.get(`${BaseUrl}auth/orders`, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        setOrders(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [])

  if (!orders) return <div className="flex flex-col justify-center items-center mt-[100px] min-h-[60vh] py-[20px] bg-[#FFE9D4]">
    <GridLoader
      color="#000000"
      size={15}
    />
  </div>
  if (orders.length === 0) return <div className='flex justify-center items-center min-h-[60vh] mt-[99px] bg-color4'><h1>No orders yet</h1></div>

  return (
    <div className='flex flex-col-reverse min-h-[60vh] mt-[99px] bg-color4'>
      {orders.map((order, index) => {
        return (
          <div key={index} className='flex flex-col w-full gap-2 justify-center items-center'>
            <h1 className='text-gray-500'>Order # {index + 1}</h1>
            <p className='text-gray-500'>Ordered at </p>
            <p className='text-gray-500'>{formatDate2(order.orderDate)}</p>
            <Table className="overflow-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell><img src={item.imageUrl || shirtImg} className="w-[40px] rounded-lg" alt="" /></TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell><span style={{backgroundColor: item.color, color: getComplementaryColor(item.color)}} className={` p-1 rounded-full`}>{item.color}</span></TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}

export default Orders