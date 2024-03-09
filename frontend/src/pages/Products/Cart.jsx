import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { toast } from "react-toastify";
import { addToCart, emptyCartItem, removeFromCart, removeSingleItems } from "../../store/Slices/cartSlice";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Cart = () => {

    const {carts} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();

    
    const [totalprice,setPrice] = useState(0);
    const [totalquantity,setTotalQuantity] = useState(0);


    // add to cart
    const handleIncrement = (e)=>{
      dispatch(addToCart(e));
    }

    // remove from cart
    const handleDecrement = (id)=>{
      dispatch(removeFromCart(id));
      toast.success("Item Remove From Your Cart");
    }

    // remove single item 
    const handleSingleDecrement = (id)=>{
      dispatch(removeSingleItems(id));
    }
    
    // empty cart
    const emptycart = ()=>{
      dispatch(emptyCartItem());
      toast.success("Your Cart is Empty");
    }

    // count total price
    const total = ()=>{
      let sum = 0;
      carts.forEach((item) => {
        sum += item.new_price * item.qnty;
      });
      setPrice(sum);
    }  

    
    // count total quantity
    const countquantity = ()=>{
      let sum = 0;
      carts.forEach((item) => {
        sum += item.qnty;
      });
      setTotalQuantity(sum);
    }  
    
    useEffect(()=>{
        total();
        countquantity();
    },[carts]);

  return (
    <>
      <div className="flex justify-center m-0 p-1">
        <div className="flex flex-col mt-5 mb-5 border-none cardsdetails">
          <div className="card">
            <div className="card-header bg-gray-900 p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className=" bg-red-600 px-3 py-2 text-white rounded-md"
                    onClick={emptycart}
                  >
                    <DeleteForeverIcon></DeleteForeverIcon>
                    <span>EmptyCart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <div className=" w-full">
                  Your Cart Is empty
                </div>
              ) : (
                <table className="cart-table mb-0">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className=" text-right">
                        {" "}
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {carts.map((data, index) => {
                      return (
                        
                          <tr key={index} className="">
                            <td>
                              <button
                                className="prdct-delete my-2"
                                onClick={() => handleDecrement(data.id)}
                              >
                                <DeleteForeverIcon></DeleteForeverIcon>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.image} alt="" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.name}</p>
                              </div>
                            </td>
                            <td className=" text-center font-semibold">₹{data.new_price}</td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDecrement(data.id)
                                      : () => handleSingleDecrement(data)
                                  }
                                >
                                  <RemoveIcon></RemoveIcon>
                                </button>
                                <input
                                  type="text"
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                  name=""
                                  id=""
                                />
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={() => handleIncrement(data)}
                                >
                                  <AddIcon></AddIcon>
                                </button>
                              </div>
                            </td>
                            <td className="text-right font-semibold">
                              ₹ {data.qnty * data.new_price}
                            </td>
                          </tr>
                        
                      );
                    })}
                  </tbody>
                  <tfoot className="">
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="">:</span>
                        <span className="text-danger">{totalquantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">₹ {totalprice}</span>
                      </th>
                      <th className="text-right">
                        <button className=" bg-green-700 px-3 py-2 rounded-md mt-3" type="button"
                        >
                          CheckOut
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;