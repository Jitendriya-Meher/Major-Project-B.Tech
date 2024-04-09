import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import { useParams } from 'react-router-dom';

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

const UserOrderChat = () => {

    const { baseURL, token,username } = useSelector((s) => s.auth);
    const [message,setMessage] = useState("");
    const [ messages, setMessages] = useState([]);
    const {id} = useParams();

    const sendMessage = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${baseURL}/api/order/chat/add/${id}`,{
                message,
                isAdminChat:false,
                username

            },{
                headers:{
                    Authorization:token
                }
            });
            const data = await res.data;

            if(data.success){
                toast.success(data.message);
                setMessage("");
                getAllChats();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const getAllChats = async () => {
        try{
            const res = await axios.get(`${baseURL}/api/order/chat/all/${id}`,{
                headers:{
                    Authorization:token
                }
            });
            const data = await res.data;

            if(data.success){
                toast.success(data.message);
                console.log(data);
                setMessages(data.chats);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        getAllChats();
    },[]);

  return (
    <div>
        <h2 className=' text-center text-xl mt-6 text-white'>
            Order Chat
        </h2>
        <form
            action=""
            onSubmit={sendMessage}
            className="flex w-full gap-2 mt-6 mb-2 items-center justify-center"
        >
            <textarea
            name=""
            id=""
            rows="2"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1"
            placeholder="Enter Your Message"
            value={message}
            onChange={(e)=>{
                setMessage(e.target.value);
            }}
            required
            ></textarea>

            <button
            className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-12 py-[8px] flex items-center justify-center gap-x-2 disabled:bg-gray-500"
            // disabled={disabledButton}
            >
            <p className="text-[1.1rem]">Send</p>
            </button>
        </form>

        <div className=" pt-5">
            {
                messages.map((chat) => (
                    <div className={`bg-gray-700/80 flex gap-12 p-3 mt-2 mb-3 text-white font-sans rounded-md ${chat.isAdminChat?"flex-row-reverse":"flex"}`}key={chat._id}>
                        <div className=" flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-sm">
                            <div className=" text-center">
                                <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                                >
                                <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
                                </StyledBadge>
                            </div>
                            <div className=" font-xl">
                                {chat.username}
                            </div>
                        </div>
                        <div className=" bg-gray-800/40 px-4 py-2 rounded-sm flex-1">{chat.message}</div>
                        
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default UserOrderChat