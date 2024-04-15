import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import start_icon from "../../assets/star_icon.png";
import start_dull_icon from "../../assets/star_dull_icon.png";
import "./Product.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/Slices/cartSlice";
import axios from "axios";
import ProductReview from "./ProductReview";
import CampaignIcon from '@mui/icons-material/Campaign';
import { useNavigate} from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { baseURL, token } = useSelector((s) => s.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const add = async (id) => {
    try {
      dispatch(addToCart(product));
      toast.success("Product added to cart successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/product/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setProduct(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [speak,setSpeak] = useState(true);
  const msg = new SpeechSynthesisUtterance();
  const describeProduct = () => {
    if(speak){
      msg.text = `the product name is ${product.name} and its price is ${product.newPrice} rupee. ${product.description}`;
      window.speechSynthesis.speak(msg);
    }else{
      speechSynthesis.cancel();
    }
    setSpeak((prev) => (!prev));
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(()=>{
    speechSynthesis.cancel();
  },[id]);
  
  if (!product) {
    return <div className=" text-center my-4 text-2xl">
      Loading...
    </div>;
  }

  return (
    <div className=" max-w-[1200px] mx-auto w-11/12 relative">

        <div className="productdisplay bg-gray-50 p-2 rounded-md">
        <div className="productdisplay-left">

          <div className="productdisplay-img">
            <img
              src={product.image}
              alt="product"
              className="productdisplay-main-img"
            />
          </div>
        </div>

        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={start_icon} alt="start" />
            <img src={start_icon} alt="start" />
            <img src={start_icon} alt="start" />
            <img src={start_icon} alt="start" />
            <img src={start_dull_icon} alt="start" />
            <p>(122)</p>
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
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div className="">S</div>
              <div className="">M</div>
              <div className="">L</div>
              <div className="">XL</div>
              <div className="">XXL</div>
            </div>
          </div>

          <button
            onClick={() => {
              add(product);
            }}
          >
            ADD TO CART
          </button>

          <p className="productdisplay-right-category">
            <span>Category :</span>
            &nbsp;{product.category}, T-Shirt
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span>
            &nbsp;Modern, Latest
          </p>
        </div>
        </div>

        {product && <button className={`text-white p-4 rounded-full fixed right-10 bottom-10 ${ speak ? " bg-blue-800" : " bg-red-800"}`}
        onClick={describeProduct}>
          <CampaignIcon></CampaignIcon>
        </button>}

        <ProductReview></ProductReview>

    </div>
  );
};

export default Product;
