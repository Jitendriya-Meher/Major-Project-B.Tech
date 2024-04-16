import React from 'react';
import frameImage from "../assets/frame.png";
import image from "../assets/Online Shop.png"

const About = () => {
  return (
    <div className='flex w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-10 justify-between flex-wrap-reverse'>

        <div className="w-11/12 max-w-[570px] mx-auto">
            <h1 className='text-richblack-5 font-semibold text-[1.8rem] leading-[2.3rem]'>
              About This Project
            </h1>

            <p className='text-[0.9rem] leading-[1.2rem] mt-6 text-justify text-gray-300'>
            This MERN Ecommerce Project is a comprehensive and ambitious endeavor undertaken by Jitendriya Meher and Samikshya Nanda, two fourth-year students from the Computer Science and Engineering (CSE) branch. This major project aims to design and develop a cutting-edge ecommerce website that leverages the power of the MERN (MongoDB, Express.js, React.js, Node.js) stack.
            <br />
            <br />
            We are driven by their passion for technology and entrepreneurship, have come together to create a transformative online shopping platform that caters to the evolving needs of both customers and business owners. Recognizing the growing importance of ecommerce in the digital landscape, they have dedicated their efforts to building a robust, user-friendly, and secure ecommerce solution that will leave a lasting impact.
            <br />
            <br />
            Through this project, We seek to showcase our technical expertise, problem-solving abilities, and commitment to academic integrity. By combining the versatility of the MERN stack with a focus on user experience, security, and responsible development practices, We aspire to deliver a ecommerce platform that sets new standards in the industry.
            <br />
            <br />
            The MERN Ecommerce Project represents a culmination of our academic journey and a testament to our dedication to creating innovative solutions that make a tangible difference. As fourth-year CSE students, We have leveraged our knowledge, skills, and teamwork to bring this ambitious project to life, showcasing our potential as future leaders in the field of web development and digital entrepreneurship.
            </p>

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

export default About
