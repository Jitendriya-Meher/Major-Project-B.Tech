
import React from 'react';
import logo from "../assets/WhatsApp Image 2024-03-15 at 22.54.27_5ad83739.jpg";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { logOutAuth } from '../store/Slices/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';


const NavBar = () => {

    const {isLoggedin, isAdmin, token, baseURL} = useSelector(state=>state.auth);
    const { carts} = useSelector((state) => (state.cart));
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutUser = async () => {
        try{
            const res = await axios.post(`${baseURL}/api/user/logout`,{
                carts
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
    }

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto flex-wrap gap-y-4 gap-x-8'>

     <Link to='/' className=' mx-auto flex gap-1 justify-center items-center text-white text-xl font-semibold'>
        <img src={logo} alt='logo' width={64} height={64} className=' rounded-full' loading='lazy'></img>
        <span>shopaholics.in</span>
     </Link>

     <nav className='navbar mx-auto'>
        <ul className='flex gap-x-6 text-gray-400 flex-wrap items-center justify-center'>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact Us</NavLink>
            </li>
        </ul>
     </nav>

     <div className="flex item-center justify-center gap-x-4 text-richblack-100 nav flex-wrap mx-auto gap-y-4 items-center">
        {
            !isLoggedin &&
            <NavLink to="/login">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Log in</button>
            </NavLink>
        }
        {
            !isLoggedin &&
            <NavLink to="/signup">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Sign up</button>
            </NavLink>
        }

        {
            isAdmin &&
            <NavLink to="/admin">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Admin</button>
            </NavLink>
        }
        {
            isLoggedin &&
            <NavLink to="/dashboard">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Shop</button>
            </NavLink>
        }
        {
            isLoggedin &&
            <NavLink to="/profile">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Profile</button>
            </NavLink>
        }
        {
            isLoggedin &&
            <NavLink to="/cart">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Cart</button>
            </NavLink>
        }
        {
            isLoggedin &&
            <button onClick={logoutUser}
                className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700'>Log Out</button>
        }
     </div>

    </div>
  )
}

export default NavBar
