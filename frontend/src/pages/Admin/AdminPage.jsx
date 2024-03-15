import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap text-white pt-16'>

        <div className=" w-full bg-gray-900 px-4 py-3 flex flex-wrap gap-4 items-center justify-center border border-gray-800 rounded-md md:flex-col md:max-w-[250px] md:justify-start md:pt-10">

            <NavLink to="/admin/addproducts" className=" md:w-full">
                <button className='py-[8px] px-[12px] rounded-[8px] border border-richblack-700 w-full bg-blue-700'>
                    Add Products
                </button>
            </NavLink>

        </div>
        <div className=" flex-1 md:min-w-[400px] bg-gray-900 md:min-h-[70vh] px-4 py-8 rounded-md border border-gray-800">
            <Outlet></Outlet>
        </div>

    </div>
  )
}

export default AdminPage