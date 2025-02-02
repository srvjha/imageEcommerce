"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, Search, User } from "lucide-react";
import { useNotification } from "./Notification";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import pictron from '../../public/pictron-images/pictron1.png'
import { FaUser } from "react-icons/fa";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [showAdmin,setShowAdmin] = useState(true);
  const [showDropDown,setShowDropDown] = useState(false);
  const [isScrolled,setIsScrolled] = useState(false)
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/register"]; // Routes without a header
  const showHeader = !hideHeaderRoutes.includes(pathname);
  console.log("showHeader:: ",showHeader)

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };


  useEffect(()=>{
   const handleScroll = () =>{
     if(window.scrollY > 0 ){
      setIsScrolled(true);
      console.log("goes down ",window.scrollY)
    }
    else if(window.scrollY === 0) {
      setIsScrolled(false);
      console.log("goes up ",window.scrollY)
    }
  }
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[])



  return (
    showHeader ? (
      <div   
      className={`relative flex justify-center items-center sticky top-0 z-[60] h-16 px-6 py-10 transition-all duration-300 ${isScrolled ? "bg-white/20 h-20 backdrop-blur-xl" : ""}`}>
       <div className="flex-1 flex-grow px-2 lg:flex-none -mt-2 ">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
          >
            <Image
            src={pictron}
            width={140}
            height={140}
            alt="Picture of the author"
          />
          </Link>
        </div>

        <div className={`flex flex-1 justify-end  items-center ${isScrolled ? "justify-end":""}`}>
        <div className={`relative w-full max-w-4xl  ${isScrolled ? "max-w-lg" :""}`}>
        <input
          type="text"
          className="w-full h-full p-3 pl-12 rounded-xl border shadow-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
          <Search width={20} height={20} />
        </span>
      </div>


        <div className={`flex  justify-end p-2 items-center   h-full w-1/3 ${isScrolled ? "hidden":""}`}>
          <ul className="flex justify-center items-center gap-2 text-lg  text-white font-extrabold ">
            <li className="header-btn">Explore</li>
            <li className="header-btn"> Pricing</li>
            <li className="header-btn">About</li>
          </ul>
        </div>
        </div>

        
        <div className={`flex flex-none  justify-end h-16 w-24 p-2 ${isScrolled ? "hidden":""}`}>
          <div className="flex gap-2 justify-center items-center">
              <div
                tabIndex={0}
                role="button"
                className=" flex justify-start items-center relative group"
              >
                <FaUser className="w-12 h-12  text-black bg-gray-200 rounded-full p-2 hover:cursor-pointer"/>
                <ul
               tabIndex={0}
               className=" absolute hidden bg-white  group-hover:block z-[1] shadow-lg bg-base-100  text-black rounded-xl w-44 top-12 -right-6  py-2"
             >
               {session ? (
                 <>
                   <li className="px-4 py-1 ">
                     <span className="text-sm opacity-70">
                       {session.user?.email?.split("@")[0]}
                     </span>
                   </li>
                   <div className="divider my-1"></div>
                   {session.user?.role === "admin" && (
                     <li>
                       <Link
                         href="/admin"
                         className="px-4 py-2 hover:bg-base-200 block w-full hover:bg-black hover:text-white"
                         onClick={() =>
                           showNotification(
                             "Welcome to Admin Dashboard",
                             "info"
                           )
                         }
                       >
                         Admin Dashboard
                       </Link>
                     </li>
                   )}
                   <li>
                     <Link
                       href="/orders"
                       className="px-4 py-2 hover:bg-base-200 block w-full hover:bg-black hover:text-white"
                     >
                       My Orders
                     </Link>
                   </li>
                   <li>
                     <button
                       onClick={handleSignOut}
                       className="px-4 py-2 text-red-600 hover:bg-base-200 w-full text-left"
                     >
                       Sign Out
                     </button>
                   </li>
                 </>
               ) : (
                 <li>
                   <Link
                     href="/login"
                     className="px-4 py-2 hover:bg-base-200 block w-full hover:bg-black hover:text-white"
                     onClick={() =>
                       showNotification("Please sign in to continue", "info")
                     }
                   >
                     Login
                   </Link>
                 </li>
               )}
             </ul>
             
              </div>
              
             
             
            </div>
      
      
      </div>
    </div>
    ):(null)
   
  );
}
