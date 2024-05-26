import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  CustomButton  from '../../../custom-components/HoverButton';
import { useUserContext } from '../../../context/user-context/UserContextProvider';

import { enqueueSnackbar } from 'notistack';

const PaymentSuccess = () => {
  const {addOrder} = useUserContext();

  const navigate = useNavigate();
  const query = useParams()
  const paymentStatus = query.payment_status;
  console.log(paymentStatus)

  const handleOrder = async ()=> {
    const status = await addOrder();
    if (status.result) {
      enqueueSnackbar(status.message, {variant: "success"})
    } else {
      enqueueSnackbar(status.message, {variant: "error"})
    }
  }

  if (paymentStatus === "paid") {
    handleOrder();

    return (
      <div className='mt-[100px] h-[60vh] flex flex-col justify-center bg-[#F0D8C0] items-center'>
      <h1 className="py-2 my-3 font-extrabold text-xl md:text-2xl text-[white]">Payment Successful</h1>
      <CustomButton onClick={()=> navigate("/buyer/products")} className="w-[200px] md:w-[350px]">Continue Shopping</CustomButton>
    </div>
    )
  } else {
    enqueueSnackbar("Order Failed", {variant: "error"})

    return (
      <div className='mt-[100px] h-[60vh] flex flex-col justify-center bg-[#F0D8C0] items-center'>
      <h1 className="py-2 my-3 font-extrabold text-xl md:text-2xl text-[white]">Payment Failed</h1>
      <CustomButton onClick={()=> navigate("/buyer/cart")} className="w-[200px] md:w-[350px]">Go To Cart</CustomButton>
    </div>
    )
  }
}

export default PaymentSuccess