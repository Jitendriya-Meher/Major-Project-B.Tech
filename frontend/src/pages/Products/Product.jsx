import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import all_product from '../../assets/all_product';
import start_icon from "../../assets/star_icon.png";
import start_dull_icon from "../../assets/star_dull_icon.png";
import "./Product.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/Slices/cartSlice';
import axios from 'axios';

const Product = () => {

    const { id } = useParams();
    const [product,setProduct] = useState(null);
    const {baseURL,token} = useSelector(s=>s.auth);
    
    const dispatch = useDispatch();

    const add = async (id) =>{
        try{
            dispatch(addToCart(product));
            toast.success("Product added to cart successfully");
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const getAllProducts = async () => {
        try{
          const res = await axios.get(`${baseURL}/api/product/${id}`,{
            headers:{
              Authorization: token
            }
          });
          const data = await res.data;
          console.log(data);
    
          if( data.success){
            toast.success(data.message);
            setProduct(data.product);
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
        getAllProducts();
      },[]);

      if( !product){
        return <div className=""></div>
      }

  return (
    <div className='productdisplay bg-gray-50 p-2 rounded-md'>

        <div className="productdisplay-left">
            {/* <div className="productdisplay-img-list">
                <img src={product.image} alt="product" />
                <img src={product.image} alt="product" />
                <img src={product.image} alt="product" />
                <img src={product.image} alt="product" />
            </div> */}

            <div className="productdisplay-img">
                <img src={product.image} alt="product" className='productdisplay-main-img' />
            </div>
        </div>

        <div className="productdisplay-right">
            <h1>
                {
                    product.name
                }
            </h1>
            <div className="productdisplay-right-stars">
                <img src={start_icon} alt="start" />
                <img src={start_icon} alt="start" />
                <img src={start_icon} alt="start" />
                <img src={start_icon} alt="start" />
                <img src={start_dull_icon} alt="start" />
                <p>
                    (122)
                </p>
            </div>

            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    ₹{product.oldPrice}
                </div>
                <div className="productdisplay-right-price-new">
                    ₹{product.newPrice}
                </div>
            </div>

            <div className="productdisplay-right-description">
                {product.description}
            </div>

            <div className="productdisplay-right-size">
                <h1>
                    Select Size
                </h1>
                <div className="productdisplay-right-sizes">
                    <div className="">
                        S
                    </div>
                    <div className="">
                        M 
                    </div>
                    <div className="">
                        L 
                    </div>
                    <div className="">
                        XL
                    </div>
                    <div className="">
                        XXL
                    </div>
                </div>
            </div>

            <button onClick={() => {
                add(product);
            }}>
                ADD TO CART
            </button>

            <p className="productdisplay-right-category">
                <span>
                    Category :
                </span>
                &nbsp;{product.category}, T-Shirt
            </p>
            <p className="productdisplay-right-category">
                <span>
                    Tags :
                </span>
                &nbsp;Modern, Latest
            </p>

        </div>

    </div>
  )
}

export default Product