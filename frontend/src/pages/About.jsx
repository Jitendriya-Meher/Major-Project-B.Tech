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

            <p className='text-[0.9rem] leading-[1.2rem] mt-4 text-justify text-gray-300'>
            This is a note-taking site developed using the MERN stack—MongoDB, Express.js, React, and Node.js—offers a robust and efficient platform for users to organize and manage their notes in a dynamic and responsive environment. The MongoDB database provides a scalable and flexible structure for storing notes, allowing for seamless expansion as users create and accumulate content. Express.js serves as the backend framework, facilitating the creation of a secure and performant API that connects the frontend and the database.
            <br />
            <br />
            The React.js frontend delivers a modern and interactive user interface, enabling users to intuitively create, edit, and organize their notes. The component-based architecture of React enhances the development process, fostering modular design and reusability. Through the use of React's state management, the application provides a responsive and real-time experience for users, ensuring that changes are immediately reflected without the need for page reloads.
            <br />
            <br />
            Node.js powers the server-side logic, ensuring swift and non-blocking operations. Its event-driven architecture aligns seamlessly with the dynamic nature of a note-taking site, enabling concurrent handling of multiple user interactions. The MERN stack's full-stack JavaScript environment streamlines development, fostering code consistency and collaboration across the frontend and backend.
            <br />
            <br />
            As users navigate the note-taking site, they experience a fluid and engaging interface that leverages the MERN stack's capabilities. The site incorporates features such as folder organization, real-time collaboration, and multimedia support. The seamless integration of the MERN technologies ensures a scalable, efficient, and user-friendly note-taking experience, embodying the synergy of these technologies to create a cohesive and powerful application.
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
