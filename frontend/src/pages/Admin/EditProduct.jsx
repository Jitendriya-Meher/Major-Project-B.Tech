import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {

    const { baseURL, token} = useSelector((s)=>(s.auth));
    const [disableButton, setDissableButton] = useState(false);
    const navigate = useNavigate();
    const [image,setImage] = useState("");

    const {id} = useParams(); 

    const [productDetails, setProductDetails] = useState({
        name:"",
        description:"",
        oldPrice:"",
        newPrice:"",
        category: "",
        qunatityRemaining:""
    });

    const changeHandler =( e ) =>{
        const name = e.target.name;
        const value = e.target.value;
        setProductDetails((prev) => (
            {
                ...prev,
                [name]:value
            }
        ));
    }

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
            setProductDetails(data.product);
            setImage(data.product.image);
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error(err.message);
        }
      };

    const submitHandler = async (e) =>{

        setDissableButton(true);

        try{
            e.preventDefault();

            const res = await axios.patch(`${baseURL}/api/product/edit/${id}`,
            productDetails,{
                headers:{
                    Authorization: token
                }
            });
            const data = await res.data;

            console.log("data",data);

            if( data.success){
                toast.success(data.message);
                navigate("/admin/manage/product");
            }else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
        setDissableButton(false);
    }

    useEffect(() => {
        getProducts();
    },[]);

  return (
    <div>
        <p className=' text-2xl text-center pb-4'>
            Edit Products
        </p>

        <div className=" flex items-center justify-center pb-4">
            <img src={image} className=' h-44 rounded-md' alt="" />
        </div>

        <form className=" flex flex-col gap-3 w-full md:flex">

            <label className="w-full" htmlFor='a'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product Name <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                placeholder='Enter Product Name'
                id='a'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.name}
                name='name'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>

            <label className="w-full" htmlFor='b'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product Description <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                placeholder='Enter Product Description'
                id='b'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.description}
                name='description'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>
            <label className="w-full" htmlFor='e'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product Category <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                placeholder='Enter Product Category'
                id='e'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.category}
                name='category'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>
            <label className="w-full" htmlFor='c'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product Old Price <span className='text-pink-200'>*</span></p>
                <input type="number"
                required
                placeholder='Enter Product Old Price'
                id='c'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.oldPrice}
                name='oldPrice'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>
            <label className="w-full" htmlFor='d'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product New Price <span className='text-pink-200'>*</span></p>
                <input type="number"
                required
                placeholder='Enter Product New Price'
                id='d'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.newPrice}
                name='newPrice'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>

            <label className="w-full" htmlFor='z'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Total Qunatity <span className='text-pink-200'>*</span></p>
                <input type="number"
                required
                placeholder='Toatal Qunatity'
                id='z'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={productDetails.qunatityRemaining}
                name='qunatityRemaining'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>


            <button
                className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-2 disabled:bg-gray-500 w-full'
                disabled={disableButton}
                onClick={submitHandler}
                >
                    <p className="text-[1.1rem]">
                        Edit Product
                    </p>
            </button>

        </form>
    </div>
  )
}

export default EditProduct