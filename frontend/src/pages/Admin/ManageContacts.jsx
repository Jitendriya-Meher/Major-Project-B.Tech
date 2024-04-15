import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageContacts = () => {

    const [contacts, setContacts] = useState([]);
    const auth = useSelector((s) => (s.auth));

    const getAllContacts = async () => {
        try{
            const res = await axios.get(`${auth.baseURL}/api/contact/all`,{
                headers:{
                    Authorization : auth.token
                }
            });
            const data = await res.data;
            
            if( data.success){
                toast.success(data.message);
                setContacts(data.contacts);
            }
            else{
                toast.error(data.message);
            }

        }
        catch(err){
            toast.error(err.message);
        }
    }

    const deleteMessage = async (id) => {
        
        const conf = window.confirm('Are you sure you want to delete this message?');

        if( !conf){
            return;
        }

        try{
            const res = await axios.delete(`${auth.baseURL}/api/contact/${id}`,{
                headers:{
                    Authorization: auth.token 
                }
            });
            const data = await res.data;

            if( data.success){
                toast.success(data.message);
                getAllContacts();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getAllContacts();
    },[]);

  return (
    <div className=' text-center text-white text-3xl'>

        <h1 className=' mb-4 font-mono'>
            All Contacts
        </h1>

        <div className=" font-mono">

            {
                contacts.map((user) => (
                    <div className=' mx-8 mb-3 bg-gray-800/80 py-3 px-6 border border-gray-700 rounded-md flex flex-wrap flex-col gap-2'>
                    <div className=" flex items-center justify-between text-lg flex-wrap gap-2">
                        <div className=' flex flex-col gap-1 items-start justify-center  border border-slate-600/60 bg-gray-800/80 p-2 rounded-md'>
                            <p>
                                {user.username}
                            </p>
                            <p>
                                {user.email}
                            </p>
                        </div>
                        <div className=" flex items-center justify-center gap-3">
                            <Link to={`/admin/contact/${user._id}`}>
                                <button className=' bg-blue-800 px-2 py-1 border border-blue-700 rounded-md hover:bg-blue-900/50 text-gray-300 hover:text-white transition-all duration-200 font-serif text-lg text-left'>
                                    Reply
                                </button>
                            </Link>
                            <button className=' bg-red-800 px-2 py-1 border border-red-700 rounded-md hover:bg-red-900/50 text-gray-300 hover:text-white transition-all duration-200 font-serif text-lg text-left'
                            onClick={() => {
                                deleteMessage(user._id);
                            }}>
                                    Delete
                            </button>
                        </div>
                    </div>
                    <div className=" text-sm mt-2 border bg-slate-800/80 border-gray-700 rounded-md">
                        <p className=' text-start p-2'>
                            {
                                user.message.length > 100 ? 
                                `${user.message.substring(0,100)}...`:
                                `${user.message}`
                            }
                        </p>
                    </div>
                </div>
                ))
            }

        </div>
    </div>
  )
}

export default ManageContacts
