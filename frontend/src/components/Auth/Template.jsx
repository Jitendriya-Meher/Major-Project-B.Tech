import React from 'react';
import frameImage from "./frame.png";
import LoginFromForm from './LoginFrom';
import SignupForm from './SignupForm';

const Template = (props) => {

    const {title,description1,description2,image,formType} = props;

  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap-reverse'>

        <div className="w-11/12 max-w-[450px] mx-auto">
            <h1 className='text-richblack-5 font-semibold text-[1.8rem] leading-[2.3rem]'>{title}</h1>
            <p className='text-[0.9rem] leading-[1.2rem] mt-4'>
                <span className='text-richblack-100'>{description1}</span>
                <br />
                <span className='text-blue-500 italic'>
                    {description2}
                </span>
            </p>

            {
                formType === "signup" ? <SignupForm></SignupForm> : <LoginFromForm></LoginFromForm>
            }

        </div>

        <div className="relative w-11/12 max-w-[450px] mx-auto hidden md:block">
            <img src={frameImage} width={558} height={504} loading='lazy' alt=""
            className=''
             />
            <img src={image} width={558} height={504} loading='lazy' alt="" 
                className='absolute -top-4 right-4'
            />
        </div>
      
    </div>
  )
}

export default Template
