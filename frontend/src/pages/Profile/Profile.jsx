import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {
  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap text-white pt-16'>

        <div className=" w-full bg-gray-900 px-4 py-3 flex flex-wrap gap-4 items-center justify-center border border-gray-800 rounded-md md:flex-col md:max-w-[250px] md:justify-start md:pt-10">

            <Link to="/profile" className=" md:w-full">
                <button className='py-[8px] bg-richblack-800 px-[12px] rounded-[8px] border border-richblack-700 w-full'>
                    Profile
                </button>
            </Link>

            <NavLink to="/profile/change" className=" md:w-full">
                <button className='py-[8px] bg-blue-800 px-[12px] rounded-[8px] border border-richblack-700 w-full'>
                    Change Profile
                </button>
            </NavLink>

            <NavLink to="/profile/password" className=" md:w-full">
                <button className='py-[8px] bg-orange-600 px-[12px] rounded-[8px] border border-richblack-700 w-full'>
                    Change Password
                </button>
            </NavLink>

            <NavLink to="/profile/delete" className=" md:w-full">
                <button className='py-[8px] bg-red-600 px-[12px] rounded-[8px] border border-richblack-700 w-full'>
                    Delete Account
                </button>
            </NavLink>

        </div>
        <div className=" flex-1 md:min-w-[400px] bg-gray-900 md:min-h-[70vh] px-4 py-8 rounded-md border border-gray-800">
            <Outlet></Outlet>
        </div>

    </div>
  )
}

export default Profile