import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../../custom-components/HoverButton';
import { useUserContext } from '../../../context/user-context/UserContextProvider';
import { enqueueSnackbar } from 'notistack';
import useSnackbar from '@/custom-components/notification/useSnackbar';
import useCartContext from '@/context/cart-context/CartContextProvider';

const PaymentSuccess = () => {
  const { emptyCart } = useCartContext()
  const { showSuccess, showError } = useSnackbar()
  const navigate = useNavigate();
  const query = useParams();
  const paymentStatus = query.paymentStatus;
  const hasDisplayedSnackbar = useRef(false); // Ref to act as a flag

  useEffect(() => {
    if (!hasDisplayedSnackbar.current) {
      if (paymentStatus === 'paid') {
        emptyCart();
        enqueueSnackbar('Order Successful!', { variant: 'success', autoHideDuration: 2000 });
      } else if (paymentStatus === 'un_paid') {
        enqueueSnackbar('Order Failed', { variant: 'error', autoHideDuration: 2000 });
      }
      hasDisplayedSnackbar.current = true; // Set the flag to true after displaying the snackbar
    }
  }, [paymentStatus, emptyCart]);// Add paymentStatus as a dependency

  
  
  return (
    <div className='mt-[100px] h-[60vh] flex flex-col justify-center bg-[#F0D8C0] items-center'>
      {paymentStatus === 'paid' ? (
        <>
          <h1 className='py-2 my-3 font-extrabold text-xl md:text-2xl text-[white]'>Payment Successful</h1>
          <CustomButton onClick={() => navigate('/buyer/products')} className='w-[200px] md:w-[350px]'>
            Continue Shopping
          </CustomButton>
        </>
      ) : (
        <>
          <h1 className='py-2 my-3 font-extrabold text-xl md:text-2xl text-[white]'>Payment Failed</h1>
          <CustomButton onClick={() => navigate('/buyer/cart')} className='w-[200px] md:w-[350px]'>
            Go To Cart
          </CustomButton>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
