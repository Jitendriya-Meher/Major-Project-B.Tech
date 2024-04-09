import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AdminOrderChat from "../Admin/AdminOrderChat";

const ManageSingleOrder = () => {

  const { baseURL, token } = useSelector((s) => s.auth);
  const { id } = useParams();

  const [status,setStatus] = useState("");

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
        setStatus(data.order.status)
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateOrder = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/order/${id}`,{
        status
      }, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        getOrder();
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
            Manage Delivery
        </p>
        <div className=" mt-4 flex items-center justify-center">
            <label htmlFor="status">
                Order Status : 
            </label>
            <select id="status" className=" text-black px-4 py-2 ml-3 rounded-md bg-gray-500/90 "
            onChange={(e) => {
                setStatus(e.target.value);
            }}
            value={status}
            >
                <option value="Order Placed">
                    Order Placed
                </option>
                <option value="Dispatch">
                    Dispatch
                </option>
                <option value="Out for Delivery">
                    Out for Delivery
                </option>
                <option value="Delivered">
                    Delivered
                </option>
            </select>
        </div>
        <div className=" mt-2 flex gap-2 justify-between text-xl px-4">
          <div className=" flex flex-col gap-2">
            <p>
              UserName : {Order.username}
            </p>
            <p>
              Email : {Order.email}
            </p>
          </div>
          <div className=" flex flex-col gap-2">
            <p>
              Address : {Order.address}
            </p>
            <p>
              Phone : {Order.phone}
            </p>
          </div>
        </div>
        <button
            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-2 disabled:bg-gray-500 w-full'
            disabled={disabledButton}
            onClick={updateOrder}
            >
                <p className="text-[1.1rem]">
                    Update Delivery
                </p>
        </button>

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
        </div>
        
        <div className="">
            <div className=" text-white px-4 py-2 text-xl bg-gray-950/60 flex flex-col gap-2">
                <p>Total Quantity : {Order.totalQnty}</p>
                <p>Total Price : ₹ {Order.totalPrice}</p>
            </div>
        </div>

      </div>

      <AdminOrderChat></AdminOrderChat>

    </div>
  );
};

export default ManageSingleOrder;