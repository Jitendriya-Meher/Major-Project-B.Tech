import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserOrderChat from "./UserOrderChat";

const SingleOrder = () => {

  const { baseURL, token } = useSelector((s) => s.auth);
  const { id } = useParams();

  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [disabledButton,setDisabledButton] = useState(false);
  const navigate = useNavigate();

  const [Order, setOrder] = useState(null);

  const getOrder = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/order/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;
      console.log(data.order);

      if (data.success) {
        toast.success(data.message);
        setOrder(data.order);
        setEmail(data.order.email);
        setPhone(data.order.phone);
        setAddress(data.order.address);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelivery = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.patch(`${baseURL}/api/order/edit/delivery/${id}`,{
            email,
            address,
            phone
        } ,{
          headers: {
            Authorization: token,
          },
        });
        const data = await res.data;
        console.log(data.order);
  
        if (data.success) {
          toast.success(data.message);
          setOrder(data.order);
          setEmail(data.order.email);
          setPhone(data.order.phone);
          setAddress(data.order.address);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
  }

  const deleteOrder = async () => {
    const conf = window.confirm('Are you sure you want to delete this order?');
    if( !conf){
      return;
    }
    try {
      const res = await axios.delete(`${baseURL}/api/order/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/order");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!Order) {
    return (
      <div className=" max-w-[1200px] mx-auto w-11/12 pt-4 text-2xl text-white text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto w-11/12 py-8">

    <div className=" text-white p-5 mb-3 bg-gray-900/80 rounded-md">
        <p className=" text-xl text-center">
            Edit Delivery
        </p>
        <form
        onSubmit={handleDelivery}
        className='flex flex-col w-full gap-y-3 mt-4 justify-between'>

            <label htmlFor="a" className=" flex gap-2 items-center justify-between">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                Email Address
                <span className='text-pink-200'> *</span>
                </p>
                <input type="email" name="email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                id="a" required
                placeholder='Enter email address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 flex-1 max-w-[85%]'
                />
            </label>

            <label htmlFor="b" className=" flex gap-2 items-center justify-between">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                    Delivery Address
                <span className='text-pink-200'> *</span>
                </p>
                <input type="text"
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
                id="b" required
                placeholder='Enter Delivery Address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 flex-1 max-w-[85%]'
                />
            </label>

            <label htmlFor="c" className=" flex gap-2 items-center justify-between">
                <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                    Phone Number
                <span className='text-pink-200'> *</span>
                </p>
                <input type="number"
                id="c" required
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                }}
                placeholder='Enter Delivery Address address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 flex-1 max-w-[85%]'
                />
            </label>

            <button
            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-2 disabled:bg-gray-500'
            disabled={disabledButton}
            >
                <p className="text-[1.1rem]">
                    Edit Delivery
                </p>
            </button>

        </form>
    </div>

      <div className=" bg-gray-900/90 p-5 flex justify-between items-center pr-12 rounded-md">

        <div className=" flex flex-col gap-2 text-white">
          {Order.cart.map((product) => (
            <div className=" flex items-center gap-2" key={product._id}>
              <div className="">
                <img src={product.image} className=" h-16 rounded-sm" alt="" />
              </div>
              <div className="">{product.name}</div>
              <div className="">X {product.qnty}</div>
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-8">
            <div className=" text-white px-4 py-2 border border-gray-300 rounded-md text-center bg-gray-950/80">
                {Order.status}
            </div>
            <div className=" text-white px-4 py-2 text-xl bg-gray-950/60 flex flex-col gap-2">
                <p>Total Quantity : {Order.totalQnty}</p>
                <p>Total Price : ₹ {Order.totalPrice}</p>
            </div>
        </div>
        
        <div className="">
            <button className=" bg-red-800 px-5 py-2 rounded-md hover:bg-red-900 text-white border border-gray-700"
            onClick={deleteOrder}>
                Cancel Order
            </button>
        </div>

      </div>

      <UserOrderChat></UserOrderChat>

    </div>
  );
};

export default SingleOrder;
