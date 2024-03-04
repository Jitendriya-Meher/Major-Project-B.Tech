import axios from 'axios';
import React, { useState } from 'react'
import { PiSignInBold } from 'react-icons/pi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [disabledButton, setDisabledButton] = useState(false);
    const {baseURL} = useSelector((state) => (state.auth));

    async function submitHandler(){

        setDisabledButton(true);

        try{
            const res = await axios.post(`${baseURL}/api/auth/otp/forgotpassword`,{email});
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                navigate(`/reset-password/${email}`);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }

        setDisabledButton(false);
    }

  return (
    <div className=' min-h-[80vh] flex justify-center items-center'>
        <div 
        className='flex flex-col w-full gap-y-4 mt-6 mx-20 sm:mx-12 lg:m-4 p-8 sm:w-full md:w-1/2 lg:w-1/3 bg-gray-800/30 rounded-md pb-16 border border-gray-800'>

            <p className=' text-3xl text-center text-white my-6'>
                Forgot Password
            </p>

            <div className=' bg-gray-800 h-[1px]' />

            <label htmlFor="">
                <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-3'>
                Email Address
                <span className='text-pink-200'> *</span>
                </p>
                <input type="email" name="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                id="" required
                placeholder='Enter email address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                />
            </label>

            <button
            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center justify-center gap-x-2 disabled:bg-gray-500'
            onClick={submitHandler}
            disabled={disabledButton}
            >
                <p className="text-[1.1rem]">
                    Send OTP
                </p>
                <PiSignInBold size={26}></PiSignInBold>
            </button>

        </div>
    </div>
  )
}

export default ForgotPassword