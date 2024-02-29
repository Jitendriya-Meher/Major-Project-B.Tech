import React, { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { logInAuth } from '../../store/Slices/authSlice';

const LoginFromForm = () => {

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const dispatch = useDispatch();
    const {baseURL} = useSelector((state) => (state.auth));

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
    const [disabledButton, setDisabledButton] = useState(false);

    const navigate = useNavigate();

    async function submitHandler(e){

        e.preventDefault();
        setDisabledButton(true);

        try{

            const userPayload = {
                password: formData.password,
                email: formData.email
            };

            const res = await axios.post(`${baseURL}/api/auth/login`,userPayload);
            const data = await res.data;

            if( data.success){
                navigate("/dashboard");
                toast.success(data.message);

                const payload = {
                    email: data.existingUser.email,
                    username: data.existingUser.username,
                    token: data.token,
                    address: data.existingUser.address,
                    phone: data.existingUser.phone,
                    isAdmin: data.existingUser.isAdmin
                };
                dispatch(logInAuth(payload));
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

        <label htmlFor="a">
            <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
            Email Address
             <span className='text-pink-200'> *</span>
             </p>
            <input type="email" name="email"
            value={formData.email}
            onChange={changeHandler}
            id="a" required
            placeholder='Enter email address'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
            />
        </label>

        <label htmlFor="b" className='relative mt-1'>
            <p
            className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>Password <span
            className='text-pink-200'>*</span></p>
            <input type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={changeHandler}
            id="b" required
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

            <Link to="/forgot-password">
                <p className='text-sm mt-1 text-blue-100 ml-auto absolute right-0'>Forget PassWord</p>
            </Link>
            
        </label>

        <button
        className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-12 items-center justify-center gap-x-2 disabled:bg-gray-500'
        disabled={disabledButton}
        >
            <p className="text-[1.1rem]">
                Sign In
            </p>
            <PiSignInBold size={26}></PiSignInBold>
        </button>

    </form>

  )
}

export default LoginFromForm
