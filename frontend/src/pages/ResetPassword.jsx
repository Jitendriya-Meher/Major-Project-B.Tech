import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { PiSignInBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const {email} = useParams();
    const navigate = useNavigate();
    const {baseURL} = useSelector((state) => (state.auth));

    async function submitHandler(){

        setDisabledButton(true);

        if( password !== confirmPassword ){
            toast.error("password and confirm password do not match");
            return;
        }

        try{
            const payload = {
                email,
                newPassword:password,
                otp
            };
            console.log(payload);

            const res = await axios.post(`${baseURL}/api/auth/resetpassword`,payload);
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                navigate("/login");
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
    <div className='min-h-[80vh] flex justify-center items-center'>
        <div 
        className='flex flex-col w-full gap-y-4 mt-6 mx-20 sm:mx-12 lg:m-4 p-8 sm:w-full md:w-1/2 lg:w-1/3 bg-gray-800/30 rounded-md pb-16 border border-gray-800'>

            <p className=' text-3xl text-center text-white my-4'>
                Reset Password
            </p>

            <div className=' bg-gray-800 h-[1px]' />

            <label htmlFor="">
                <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-3'>
                OTP
                <span className='text-pink-200'> *</span>
                </p>
                <input type="text"
                value={otp}
                onChange={(e)=>{
                    setOtp(e.target.value);
                }}
                id="" required
                placeholder='Enter OTP'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                />
            </label>

            <label htmlFor="" className='relative mt-1'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Password <span
                className='text-pink-200'>*</span></p>
                <input type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                id="" required
                placeholder='Enter Password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                />

                <span onClick={
                    () => {
                        setShowPassword(!showPassword);
                    }
                }
                className='absolute right-3 top-[38px] cursor-pointer'
                >
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill='#afb2bf'></AiOutlineEye>)}
                </span>   
            </label>

            <label htmlFor="" className='relative mt-1'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Confirm Password <span
                className='text-pink-200'>*</span></p>
                <input type={showPassword2 ? "text" : "password"}
                name="password"
                value={confirmPassword}
                onChange={(e)=>{
                    setConfirmPassword(e.target.value);
                }}
                id="" required
                placeholder='Confirm Password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                />

                <span onClick={
                    () => {
                        setShowPassword2(!showPassword2);
                    }
                }
                className='absolute right-3 top-[38px] cursor-pointer'
                >
                    {showPassword2 ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill='#afb2bf'></AiOutlineEye>)}
                </span>   
            </label>

            <button
            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center justify-center gap-x-2 disabled:bg-gray-500'
            onClick={submitHandler}
            disabled={disabledButton}
            >
                <p className="text-[1.1rem]">
                    Reset Password
                </p>
                <PiSignInBold size={26}></PiSignInBold>
            </button>

        </div>
    </div>
  )
}

export default ResetPassword