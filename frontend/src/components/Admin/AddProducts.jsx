import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddProducts = () => {

    const { baseURL, token} = useSelector((s)=>(s.auth));

    const [productDetails, setProductDetails] = useState({
        name:"",
        description:"",
        oldPrice:"",
        newPrice:"",
        category: "",
        quantity:""
    });
    const [ image, setImage] = useState(null);

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

    const submitHandler = async (e) =>{
        try{
            e.preventDefault();

            const formData = new FormData();
            formData.append("image",image);
            formData.append("name",productDetails.name);
            formData.append("description",productDetails.description);
            formData.append("oldPrice",productDetails.oldPrice);
            formData.append("newPrice",productDetails.newPrice);
            formData.append("category",productDetails.category);
            formData.append("quantity",productDetails.quantity);

            const res = await axios.post(`${baseURL}/api/product/addproduct`,
            formData,{
                headers:{
                    Authorization: token,
                    "Content-Type":"multipart/form-data"
                }
            });
            const data = await res.data;

            console.log("data",data);

            if( data.success){
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

  return (
    <div>
        <p className=' text-2xl text-center pb-4'>
            Add Products
        </p>

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

            <label className="w-full" htmlFor='f'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Product Image <span className='text-pink-200'>*</span></p>
                <input type="file"
                required
                placeholder='Enter Product Image'
                id='f'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                onChange={(e)=>{
                    setImage(e.target.files[0]);
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
                value={productDetails.quantity}
                name='quantity'
                onChange={(e) => {
                    changeHandler(e);
                }}
                />
            </label>


            <button
                className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-2 disabled:bg-gray-500 w-full'
                disabled={false}
                onClick={submitHandler}
                >
                    <p className="text-[1.1rem]">
                        Add Product
                    </p>
            </button>

        </form>
    </div>
  )
}

export default AddProducts