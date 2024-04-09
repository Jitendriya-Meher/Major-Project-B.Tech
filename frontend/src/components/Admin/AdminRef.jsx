import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminRef = () => {
  return (
    <div className=' flex items-center justify-center flex-col h-full text-3xl gap-4'>
        <p>
            Hii Admin
        </p>
        <div className="">
            <img src="./user-gear.png" alt="" />
        </div>
        <p>
            Manage All Products and Orders Here...
        </p>
    </div>
  )
}

export default AdminRef