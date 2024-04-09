import { useSelector } from "react-redux";
import ProductItem from "../components/Products/ProductItem";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

  const {baseURL,token} = useSelector((state) => (state.auth));

  // all_product.sort((pro1,pro2)=>(pro2.id - pro1.id ));
  const [ all_product, setProdct] = useState([]);

  const getAllProducts = async () => {
    try{
      const res = await axios.get(`${baseURL}/api/product/all`,{
        headers:{
          Authorization: token
        }
      });
      const data = await res.data;
      console.log(data);

      if( data.success){
        toast.success(data.message);
        setProdct(data.allProducts);
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

  return (
    <div className="flex flex-1 justify-center items-center text-white text-3xl w-screen">
      <div className=" my-12 flex flex-wrap items-center justify-center gap-12">
        {
          all_product.map((product)=>(
            <ProductItem key={product._id} product={product}></ProductItem>
          ))
        }
      </div>
    </div>
  );
}

export default Dashboard;
