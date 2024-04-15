import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';

const ReplyContact = () => {

  const { baseURL, token } = useSelector((state) => (state.auth));
  const { id } = useParams();

  const [ contact , setContact] = useState({
    email:"",
    message:"",
    username:''
  });

  const [ response, setResponse ] = useState("");
  const [ disableButton, setDisableButton] = useState(false);

  const getContact = async () => {
    setDisableButton(true);
    try{
      const res = await axios.get(`${baseURL}/api/contact/${id}`,{
        headers:{
          Authorization: token
        }
      });
      const data = await res.data;

      if( data.success){
        toast.success(data.message);
        setContact(data.contact);
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

  useEffect(() => {
    getContact();
  },[]);

  const sendResponse = async () => {
    setDisableButton(true);
    try{
      const res = await axios.post(`${baseURL}/api/admin/contact/${id}`,{
        email: contact.email,
        query: contact.message,
        response
      },{
        headers:{
          Authorization: token
        }
      });
      const data = await res.data;

      if( data.success){
        toast.success(data.message);
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
    <div className=' pt-10 text-left text-3xl text-white w-11/12 max-w-[1120px] mx-auto'>
        <p className=' break-words px-10'>
          UserName : {contact.username}
        </p>
        <p className=' break-words px-10 mt-2'>
          Email : {contact.email}
        </p>
        <div className=" pt-6">
          <p className=' px-10 break-words text-[1.5rem] leading-8 text-left'>
            Query : <span className=' text-blue-300'>
            {contact.message}
            </span>
          </p>
          <div className=" p-10">
            <textarea type="text" name="title"
            id="b" required
            rows={5}
            placeholder='Enter Your Response'
            value={response}
            onChange={(e)=>{
              setResponse(e.target.value);
            }}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] outline-1 pb-[20px] text-md text-[1.5rem]'
            ></textarea>
          </div>
          <div className=" px-10 w-full">
            <button
            className='bg-blue-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] flex mt-8 items-center justify-center gap-x-4 disabled:bg-gray-500 w-full'
            disabled={disableButton}
            onClick={sendResponse}
            >
                <p className="text-[1.1rem]">
                    Send Response
                </p>
                <SendIcon size={26}></SendIcon>
            </button>
          </div>
        </div>
    </div>
  )
}

export default ReplyContact