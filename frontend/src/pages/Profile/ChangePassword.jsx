import React, { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));

const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: '',
        password:"",
        confirmPassword:""
    });

    const {baseURL,token} = useSelector((state) => (state.auth));

    function changeHandler(e){
        const {name,value} = e.target;
        setFormData( (prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const [showPassword,setShowPassword] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);
    const [showPassword3,setShowPassword3] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const navigate = useNavigate();

    async function submitHandler(e){

        e.preventDefault();
        setDisabledButton(true);

        const conf = window.confirm("Are you sure you want to change your password?");

        if( !conf){
            setDisabledButton(false);
            return;
        }

        try{

            if( formData.password !== formData.confirmPassword){
                setDisabledButton(false);
                toast.error("password and confirm password does not match");
                return;
            }

            if( !formData.oldPassword || !formData.password){
                setDisabledButton(false);
                toast.error("Please enter all required fields");
                return;
            }

            const res = await axios.patch(`${baseURL}/api/user/edit/password`,{
                oldPassword: formData.oldPassword,
                password: formData.password
            },{
                headers:{
                    Authorization: token
                }
            });
            const data = await res.data;
            
            if( data.success){
                toast.success(data.message);
                navigate("/profile");
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error("please try again");
        }

        setDisabledButton(false);
    }

  return (
    <form action="" onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-2 mt-6'>

            <div className=" text-center -mt-4">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }}/>
                </StyledBadge>
            </div>

        <h1 className=' text-2xl text-center'>
            Change Password
        </h1>

        <label htmlFor="a" className='relative mt-1'>
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Old Password <span
            className='text-pink-200'>*</span></p>
            <input type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={changeHandler}
            id="a" required
            placeholder='Enter Your Old Password'
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

        <label htmlFor="b" className='relative mt-1'>
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>New Password <span
            className='text-pink-200'>*</span></p>
            <input type={showPassword2 ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={changeHandler}
            id="b" required
            placeholder='Enter New Password'
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

        <label htmlFor="c" className='relative mt-1'>
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Confirm New Password <span
            className='text-pink-200'>*</span></p>
            <input type={showPassword3 ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
            id="c" required
            placeholder='Confirm New Password'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
            />

            <span onClick={
                () => {
                    setShowPassword3(!showPassword3);
                }
            }
            className='absolute right-3 top-[38px] cursor-pointer'
            >
                {showPassword3 ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'></AiOutlineEyeInvisible>) : (<AiOutlineEye fontSize={24} fill='#afb2bf'></AiOutlineEye>)}
            </span>
            
        </label>

        <button
        className='bg-orange-600 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-12 items-center justify-center gap-x-2 disabled:bg-gray-500'
        disabled={disabledButton}
        >
            <p className="text-[1.1rem]">
                Change Password
            </p>
            <PiSignInBold size={26}></PiSignInBold>
        </button>

    </form>
  )
}

export default ChangePassword