import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editAuth } from '../../store/Slices/authSlice';

const ChangeProfile = () => {

    const auth = useSelector((state) => (state.auth));
    const dispatch = useDispatch();

    const [username,setUsername] = useState(auth.username);
    const [email,setEmail] = useState(auth.email);
    const [phone, setPhone] = useState(auth.phone);
    const [location, setLocation] = useState(auth.address);

    const [disabledButton, setDisableButton] = useState(false);

    const navigate = useNavigate();
    
    async function submitHandler(){

        setDisableButton(true);

        const conf = window.confirm("Are you sure you want to change profile?");

        if( !conf){
            setDisableButton(false);
            return;
        }

        if( !username || !email || !location || !phone){
            toast.error("please enter all required fields");
            setDisableButton(false);
            return;
        }

        const userPayload = {
            username,
            email: email,
            phone,
            address: location,
        };

        try{

            const res = await axios.patch(`${auth.baseURL}/api/user/edit`,userPayload,{
                headers:{
                    Authorization: auth.token
                }
            });

            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                navigate("/profile");
                dispatch(editAuth(userPayload));
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error("please try again");
            return;
        }  

        setDisableButton(false);
    }

  return (

    <div className='w-full'>

    <h1 className=' text-2xl text-center'>
      Change Profile
    </h1>
      
      <div className='w-full mt-5 flex flex-col gap-y-4'>

        <div className="gap-x-4 justify-between w-full md:flex">

            <label className="w-full" htmlFor='a'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'
                >User Name <span className='text-pink-200'>*</span></p>
                <input type="text"
                required
                placeholder='Enter User Name'
                id='a'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
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

        <label htmlFor="y">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-1'
            >Phone Number <span className='text-pink-200'>*</span></p>
            <input type="number"
            minLength={10}
            maxLength={10}
            min={1000000000}
            max={9999999999}
            required
            id='y'
            value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                }}
            placeholder='Enter your phone number'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            />
        </label>

        <label htmlFor="z">
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem] mt-1'
            >Your Location <span className='text-pink-200'>*</span></p>
            <input type='text'
            required
            id='z'
            value={location}
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
            placeholder='Enter your location'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px] border-b-[1px] outline-1 mb-1'
            />
        </label>

        <button
        className='bg-blue-600 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-2 items-center justify-center gap-x-4 disabled:bg-gray-500'
        onClick={submitHandler}
        disabled={disabledButton}
        >
            <p className="text-[1.1rem]">
                Change Profile
            </p>
            <FaUser size={26}></FaUser>
        </button>

      </div>

    </div>
  )
}

export default ChangeProfile