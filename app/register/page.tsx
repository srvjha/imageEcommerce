"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import Image from "next/image";
import pictron from '../../public/pictron-images/pictron.png'
import { Eye, EyeClosed, EyeOff, Lock, Mail } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();
  const [showPassword,setShowPassword] = useState(false)
  
  
  const handleRole = (e: React.MouseEvent<HTMLUListElement>)=>{
    try {
      const target = e.target as HTMLAnchorElement;
      const role = target.textContent as string
      setRole(role);
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,role:role.toLowerCase()}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      );
    }
  };


  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/1259713/pexels-photo-1259713.jpeg?cs=srgb&dl=pexels-johnny-chen-335518-1259713.jpg&fm=jpg')] bg-cover p-2">

    <div className="max-w-md mx-auto backdrop-blur-sm bg-white/10 p-8 w-full rounded-lg mt-32 mr-32 h-[460px]">
    <div className = "flex items-center justify-center  -mt-8"><Image
            src={pictron}
            width={130}
            height={130}
            alt="Picture of the author"
          /></div>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">        
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

      <div className="mt-2">
        
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

      <div className="mt-2">
        
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="text-black"/>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full h-14 text-black pl-10 pr-4 py-2 border-2 border-black rounded-lg bg-transparent placeholder-black font-bold focus:outline-none"
            placeholder="Confirm Password"
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

        
        {/* <div>
        <div className="dropdown" >
          <div tabIndex={0} role="button" className="btn w-full">Select Role</div>
          <ul 
          tabIndex={0} 
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          onClick={(e)=>handleRole(e)}
          >
            <li><a>User</a></li>
            <li><a>Admin</a></li>
          </ul>
        </div>
        </div> */}
        <button
          type="submit"
          className="w-full bg-black text-white mt-2  py-2 rounded hover:bg-black/80"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-100">
          Already have an account?{" "}
          <Link href="/login" className="text-black hover:text-gray-600">
            Login
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}
