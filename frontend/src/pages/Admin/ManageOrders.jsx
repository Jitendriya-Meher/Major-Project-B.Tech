import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import { Link } from 'react-router-dom';

const ManageOrders = () => {

    const { baseURL, token } = useSelector((s) => s.auth);

    const [ orders, setOrders] = useState([]);

    const getOrders = async () => {
        try{
            const res = await axios.get(`${baseURL}/api/order/all/order`,{
                headers:{
                    Authorization: token
                }
            });
            const data = await res.data;
            console.log(data);

            if( data.success){
                setOrders(data.orders);
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getOrders();
    },[]);

  return (
    <div>
        <div className="">
            {
                orders.map((order) => (
                        <div className=" mt-2 mb-4 p-4 bg-gray-800/40 rounded-md w-full flex items-center justify-between" key={order._id}>

                            <div className=" text-white flex flex-col gap-2">
                                {
                                    order.cart.map((product) => (
                                        <div className=" flex items-center gap-2" key={product._id}>
                                            <div className="">
                                                <img src={product.image} className=' h-16 rounded-sm' alt="" />
                                            </div>
                                            <div className="">
                                                {product.name}
                                            </div>
                                            <div className="">
                                                X {product.qnty}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className=" text-white flex flex-col gap-2 items-center justify-center">
                                <p>Total Quantity : {order.totalQnty}</p>
                                <p>Total Price : ₹ {order.totalPrice}</p>
                            </div>

                            <div className=" text-white border-2 border-gray-500 px-4 py-2 rounded-md">
                                <p>{order.status}</p>
                            </div>

                            <Link to={`${order._id}`}>
                                <button className=' bg-blue-900 text-white hover:bg-blue-950 px-5 py-2 rounded-md'>
                                    Track
                                </button>
                            </Link>
                        </div>
                    ))
            }
        </div>

    </div>
  )
}

export default ManageOrders