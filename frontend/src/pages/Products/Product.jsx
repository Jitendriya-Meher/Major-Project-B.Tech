import React from 'react';
import { useParams } from 'react-router-dom';
import all_product from '../../assets/all_product';
import start_icon from "../../assets/star_icon.png";
import start_dull_icon from "../../assets/star_dull_icon.png";
import "./Product.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/Slices/cartSlice';

const Product = () => {

    const { id } = useParams();
    const product = all_product.find((item) => (
        item.id == id
    ));
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
                    ₹{product.old_price}
                </div>
                <div className="productdisplay-right-price-new">
                    ₹{product.new_price}
                </div>
            </div>

            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ullam laborum esse cupiditate libero earum amet placeat impedit voluptate vel accusantium, dignissimos sequi veniam illum aliquam magni accusamus expedita architecto nostrum veritatis. Vero eveniet odio, magni nostrum porro dignissimos! Quisquam nostrum ducimus consectetur dicta officia saepe deserunt beatae nam quod.
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
                add(product.id);
            }}>
                ADD TO CART
            </button>

            <p className="productdisplay-right-category">
                <span>
                    Category :
                </span>
                &nbsp;Women, T-Shirt, Crop Top
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