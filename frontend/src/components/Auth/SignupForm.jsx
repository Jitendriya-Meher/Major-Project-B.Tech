import React, { useState } from 'react';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { PiSignInBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const SignupForm = () => {

    const {baseURL} = useSelector((state) => (state.auth));

    const [showPassword1,setShowPassword1] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [otp,setOtp] = useState("");

    const [disabledOtpButton, setDisabledOtpButton] = useState(false);
    const [disabledSignupButton, setDisabledSignupButton] = useState(false);

    const navigate = useNavigate();

    async function handleOtp (){

        setDisabledOtpButton(true);
        try{
            const username = firstName+" "+lastName;

            const otpPayload = {
                email,
                username
            };

            const res = await axios.post(`${baseURL}/api/auth/otp/signup`,otpPayload);

            const data = await res.data;
            // console.log(data);

            if( data.success){
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error("please try again");
            return;
        }
        setDisabledOtpButton(false);
    }
    
    async function submitHandler(e){
        e.preventDefault();
        setDisabledOtpButton(true);
        setDisabledSignupButton(true);
        
        if( password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        if( !password || !firstName || !lastName || !email){
            toast.error("please enter all required fields");
            return;
        }

        const userPayload = {
            username: firstName+" "+lastName,
            email: email,
            password: password,
            phone,
            address: location,
            otp
        };

        try{
            const res = await axios.post(`${baseURL}/api/auth/signup`,userPayload);

            const data = await res.data;
            console.log(data);

            if( data.success){
                toast.success(data.message);
                navigate("/login");
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error("please try again");
            return;
        }  

        setDisabledOtpButton(false);
        setDisabledSignupButton(false);

    }

  return (
    <div className='w-full'>
      
      <div className='w-full mt-5 flex flex-col gap-y-4'>

        <div className="gap-x-4 justify-between w-full md:flex">

            <label className="w-full" htmlFor='a'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >First Name <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                placeholder='Enter First Name'
                id='a'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={firstName}
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}
                />
            </label>
            <label className="w-full" htmlFor='b'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Last Name <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                id='b'
                placeholder='Enter Last Name'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={lastName}
                onChange={(e) => {
                    setLastName(e.target.value);
                }}
                />
            </label>
        </div>

        <label htmlFor="c">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-1'
            >Emial Address <span className='text-pink-200'>*</span></p>
            <input type="email"
            required
            id='c'
            placeholder='Enter Email Address'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            />
        </label>

        <label htmlFor="">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-1'
            >Phone Number <span className='text-pink-200'>*</span></p>
            <input type="number"
            minLength={10}
            maxLength={10}
            min={1000000000}
            max={9999999999}
            required
            value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                }}
            placeholder='Enter your phone number'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            />
        </label>

        <label htmlFor="">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-1'
            >Your Location <span className='text-pink-200'>*</span></p>
            <input type='text'
            required
            value={location}
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
            placeholder='Enter your location'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            />
        </label>

        <div className="gap-x-4 justify-between w-full md:flex">
            <label className="relative w-full" htmlFor='d'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Create Password <span className='text-pink-200'>*</span></p>
                <input type={showPassword1 ? "text" : "password"}
                required
                id='d'
                placeholder='Enter Password'
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                />
                <span onClick={
                () => {
                        setShowPassword1(!showPassword1);
                    }
                }
                className='absolute right-3 top-[38px] cursor-pointer '
                >
                    {showPassword1 ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill='#afb2bf'></AiOutlineEye>)}
                </span>
            </label>

            <label className="relative w-full block" htmlFor='e'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >Confirm Password <span className='text-pink-200'> *</span></p>
                <input type={showPassword2 ? "text" : "password"}
                required
                id='e'
                placeholder='Confirm Password'
                onChange={
                    (e)=>{
                        setConfirmPassword(e.target.value);
                    }
                }
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
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
        </div>

        <button
        className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-4 items-center justify-center gap-x-4 w-full disabled:bg-gray-500'
        onClick={handleOtp}
        disabled={disabledOtpButton}
        >
            <p className="text-[1.1rem]">
                Send OTP
            </p>
            <PiSignInBold size={26}></PiSignInBold>
        </button>

        <label htmlFor="">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-2'
            >Your OTP <span className='text-pink-200'>*</span></p>
            <input type='text'
            value={otp}
                onChange={(e) => {
                    setOtp(e.target.value);
                }}
            placeholder='Enter your OTP'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            />
        </label>


        <button
        className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-2 items-center justify-center gap-x-4 disabled:bg-gray-500'
        onClick={submitHandler}
        disabled={disabledSignupButton}
        >
            <p className="text-[1.1rem]">
                Create Account
            </p>
            <FaUser size={26}></FaUser>
        </button>

      </div>

    </div>
  )
}

export default SignupForm