import React, { useState } from 'react'
import frameImage from "../assets/frame.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoIosSend } from "react-icons/io";
import { toast } from 'react-toastify';
import image from '../assets/Online Shop.png';

const Contact = () => {

    const auth = useSelector(state=>state.auth);

    const [email, setEmail] = useState(auth.email);
    const [username, setUsername] = useState(auth.username);
    const [message, setMessage] = useState('');

    const handleContact = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`${auth.baseURL}/api/contact`,{
                email,message,username
            });
            const result = res.data;

            if( result.success){
                toast.success(result.message);
                setMessage('');
            }
            else{
                toast.error(result.message);
            }
        }
        catch(err){
            toast.error("please try again...");
        }
    }
    
  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap-reverse'>

        <div className="w-11/12 max-w-[570px] mx-auto">
            <h1 className='text-richblack-5 font-semibold text-[1.8rem] leading-[2.3rem]'>
              Ask Your Query here...
            </h1>
            <p className='text-[0.9rem] leading-[1.2rem] mt-4'>
                <span className='text-richblack-100'>
                For any inquiries or feedback regarding the MERN Ecommerce project, please don't hesitate to reach out to our team. You can contact us via email at jitenkvk@gmail.com | samikshya.nanda.4848@gmail.com or submit a message through our online contact form. We're committed to providing prompt and helpful assistance to ensure the continued success of this ecommerce platform.
                </span>
                <br />
                
            </p>

            <form action=""
            className='flex flex-col w-full gap-y-4 mt-6'
            onSubmit={handleContact}
            >

                <label htmlFor="a">
                    <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                        Email Address 
                    <span className='text-pink-200'> *</span>
                    </p>
                    <input type="email" name="email"
                    id="a" required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder='Enter your email address'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                    />
                </label>

                <label htmlFor="b">
                    <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                        User Name
                    <span className='text-pink-200'> *</span>
                    </p>
                    <input type="text" name="text"
                    id="b" required
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    placeholder='Enter your Name'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1'
                    />
                </label>

                <label htmlFor="b">
                    <p className='text-[0.88rem] text-richblack-5 mb-1 leading-[1.38rem]'>
                        Enter your message
                    <span className='text-pink-200'> *</span>
                    </p>
                    <textarea type="text" name="title"
                    id="b" required
                    rows={7}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    placeholder='Enter your message'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 pb-[20px]'
                    ></textarea>
                </label>

                

                <button
                className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center  justify-center gap-2'
                >
                    <p className=' text-[1.1rem]'>Send message</p> 
                    <IoIosSend size={26}/>
                </button>

            </form>

        </div>

        <div className="relative w-11/12 max-w-[450px] mx-auto hidden md:block">
            <img src={frameImage} width={558} height={504} loading='lazy' alt=""
            className=' relative -top-2'
             />
            <img src={image} width={558} height={504} loading='lazy' alt="" 
                className='absolute top-4 right-4'
            />
        </div>
      
    </div>
  )
}

export default Contact
