import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ManageProduct = () => {

    const [ products, setProdcts] = useState([]);
    const {baseURL,token} = useSelector((state) => (state.auth));
    const navigate = useNavigate();

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
            setProdcts(data.allProducts);
          }
          else{
            toast.error(data.message);
          }
        }
        catch(err){
          toast.error(err.message);
        }
    }

    const deleteProduct = async (id) => {
        const del = window.confirm('Are you sure you want to delete this product?');
        if( !del){
          return;
        }
        try{
            const res = await axios.delete(`${baseURL}/api/product/delete/${id}`,{
              headers:{
                Authorization: token
              }
            });
            const data = await res.data;
            console.log(data);
      
            if( data.success){
              toast.success(data.message);
              getAllProducts();
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
    <div>

      <p className=" mb-4 text-center text-white text-3xl">
        Products 
      </p>

        <div className=" flex flex-col gap-2">
            {
                products.map((product) => (
                    <div className=" bg-gray-800/80 px-4 py-2 flex justify-between items-center gap-4 rounded-md border border-gray-700/80" key={product._id}>
                        <div className=" p-1 border border-slate-800 rounded-md bg-gray-700">
                            <img src={product.image} className=" h-28 rounded-md" alt="" />
                        </div>
                        <div className=" text-[1.2rem]">
                            {product.name}
                        </div>
                        <div className="text-[1.2rem]">
                            ₹ {product.newPrice}
                        </div>
                        <div className="text-[1.4rem] flex items-center justify-center gap-4">
                            <button className=" bg-blue-900 px-2 py-1 hover:bg-blue-950 items-center justify-center rounded-sm"
                            onClick={() => {
                                navigate(`/product/${product._id}`)
                            }}>
                                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                            </button>
                            <Link className=" items-center justify-center" to={`${product._id}`}>
                                <button className=" bg-green-900 px-2 py-1 hover:bg-green-950 rounded-sm">
                                    <BorderColorIcon></BorderColorIcon>
                                </button>
                            </Link>
                            <button className=" bg-red-900 px-2 py-1 hover:bg-red-950 items-center justify-center rounded-sm"
                            onClick={() => {
                                deleteProduct(product._id);
                            }}>
                                <DeleteIcon></DeleteIcon>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>

        

    </div>
  )
}

export default ManageProduct