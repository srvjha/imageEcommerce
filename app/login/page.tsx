"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import Image from "next/image";
import pictron from '../../public/pictron-images/pictron.png'
import { Eye, EyeClosed, EyeOff, Lock, Mail } from "lucide-react";
import { ToastContainer,toast } from "react-toastify";
import lowQuality from '../../public/login-register-bg/low.jpg';
import highQuality from '../../public/login-register-bg/high.jpg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();
  const [showPassword,setShowPassword] = useState(false);
  const [bgImage,setBgImage] = useState(lowQuality);

  useEffect(() => {
     setTimeout(()=>{
      setBgImage(highQuality)
     },5000)

  }, []);

  //const bgImage = "https://images.pexels.com/photos/1259713/pexels-photo-1259713.jpeg?cs=srgb&dl=pexels-johnny-chen-335518-1259713.jpg&fm=jpg"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({email,password})
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Login successful!",);
      router.push("/");
    }
  };

  return (
    <div 
    className={`min-h-screen bg-[url(${bgImage})] bg-cover p-2`}>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        
        />
    <div className="max-w-md mx-auto backdrop-blur-sm bg-white/10 p-8 w-full rounded-lg mt-32 mr-32 h-[470px]">
      <div className = "flex items-center justify-center  -mt-4"><Image
            src={pictron}
            width={130}
            height={130}
            alt="Picture of the author"
          /></div>
      <h1 className="text-2xl font-extrabold mb-4 ">Continue with Login</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
      <div className="relative">   
      <label htmlFor="email" className=" hidden">
          Email
        </label>     
        <div className="relative z-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Mail className="text-black "/>
          </span>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-14 text-black pl-10 pr-4 py-2 border-2 border-black rounded-lg bg-transparent placeholder-black font-bold focus:outline-none"
            placeholder="Email Address"
          />
        </div>
      </div>

      <div className="mt-4">
      <label htmlFor="password" className=" hidden">
          Password
        </label> 
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="text-black"/>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-14 text-black pl-10 pr-4 py-2 border-2 border-black rounded-lg bg-transparent placeholder-black font-bold focus:outline-none"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            {showPassword ? (
            <EyeOff/>
            ) : (
              <Eye/>
            )}
          </button>
        </div>
      </div>

        <button
          type="submit"
          className="w-full bg-black text-white mt-2 py-2 rounded hover:bg-black/80"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-100">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-black hover:text-gray-600">
            Register
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}
