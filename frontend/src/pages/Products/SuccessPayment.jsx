import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCartItem } from '../../store/Slices/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuccessPayment = () => {

    const {carts} = useSelector((state)=>state.cart);
    const { baseURL, token } = useSelector((s) => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addOrder = async () => {

        let totalPrice = 0;
        let totalQnty = 0;

        carts.forEach((item) => {
            totalPrice += item.newPrice * item.qnty;
            totalQnty += item.qnty;
        });
        
        try{
  
        const res = await axios.post(`${baseURL}/api/order/add`,{
            carts,
            totalPrice,
            totalQnty
          },{
            headers:{
                Authorization: token
            }
          });
          const data = await res.data;
          console.log("order",data);
  
          if( data.success){
              toast.success(data.message);
              dispatch(emptyCartItem());
              navigate(`/order/${data.orderDB._id}`)
          }
          else{
            toast.error(data.message);
          }
        }
        catch(err){
          toast.error(err.message);
        }
      }

      useEffect(()=>{
        addOrder();
      },[])

  return (
    <div className=' min-h-screen flex items-center justify-center text-xl text-white gap-4'>
        <p>
            Payment Successfully Completed !!!
        </p>
        <p>
            It will take some time to Place Your Order
        </p>
    </div>
  )
}

export default SuccessPayment