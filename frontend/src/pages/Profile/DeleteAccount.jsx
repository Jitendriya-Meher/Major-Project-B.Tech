import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutAuth } from '../../store/Slices/authSlice';


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

const DeleteAccount = () => {

    const {baseURL,token} = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disabledButton, setDisableButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    async function deleteHandler() {

        setDisableButton(true);

        const conf = window.confirm("Are you sure you want to delete your account?");

        if( !conf){
            setDisableButton(false);
            return;
        }

        try{
            if( !password){
                toast.error("Please enter your password");
                setDisableButton(false);
                return; 
            }

            const res = await axios.post(`${baseURL}/api/user/delete`,{
                password:password
            },{
                headers:{
                    Authorization: token
                }
            });
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                navigate("/login");
                dispatch(logOutAuth());
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }

        setDisableButton(false);
    }

  return (
    <div className=' w-full'>

        <div className=" w-full p-1">

            <div className=" text-center">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" sx={{ width: 200, height: 200 }}/>
                </StyledBadge>
            </div>

            <h1 className=' my-8 text-2xl'>
                Are you sure you want to delete your Account?
            </h1>

            <label htmlFor="a" className='relative mt-1'>
                <p
                className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Password <span
                className='text-pink-200'>*</span></p>
                <input type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                id="a" required
                placeholder='Enter Your Password'
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

            <button
            className='bg-red-600 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center justify-center gap-x-2 disabled:bg-gray-500 w-full'
            disabled={disabledButton}
            onClick={deleteHandler}
            >
                <p className="text-[1.1rem]">
                    Delete Your Account
                </p>
                <FaUser size={26}></FaUser>
            </button>

        </div>

    </div>
  )
}

export default DeleteAccount