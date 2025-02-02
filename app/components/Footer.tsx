"use client"
import Image from 'next/image'
import React from 'react'
import pictron from '../../public/pictron-images/pictron1.png'
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiX } from 'react-icons/si';
import { usePathname } from 'next/navigation';

const Footer = () => {
     const pathname = usePathname();
      const hideHeaderRoutes = ["/login", "/register"]; // Routes without a header
      const showFooter = !hideHeaderRoutes.includes(pathname);


  return (
    showFooter ? (
        <>
        <div className='bg-black  flex justify-center items-center gap-4 p-6 text-white w-full h-72'>
        <div className='footer flex-col'>
        <div className=' '>
        <Image
                src={pictron}
                width={140}
                height={140}
                alt="Picture of the author"
              />
        </div>
        <p className=' w-full h-full text-sm p-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A molestias alias possimus, cupiditate harum iusto? Neque autem, odit accusantium distinctio illo minima sapiente quasi nisi nemo vero est similique voluptate ratione rem, vitae nam nobis enim debitis cum sed sunt odio eius? Commodi incidunt, aperiam alias natus illum perspiciatis dolorem!</p>
        </div>
        <div className='footer justify-center p-4 items-end mt-5'> 
             <div className="mt-2 md:mt-0 text-gray-400">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div></div>
        <div className="footer p-4 flex gap-4 flex-col justify-end items-center ">
            <div className=''>
         <span className='text-xl font-extrabold flex '>Follow me:</span>
         <div className='flex space-x-4 mt-2 '>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-600 hover:text-blue-800 text-2xl w-[50px] h-[50px]" />
            </a>
            <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <SiX className="text-white bg-black rounded-full p-1 hover:bg-gray-800 text-2xl  w-[50px] h-[50px]" />
            </a>
            <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 hover:text-pink-700 text-2xl  w-[50px] h-[50px]" />
            </a>
            </div>
            </div>
        </div>
        </div>
        </>
    ):null
   
  )
}

export default Footer