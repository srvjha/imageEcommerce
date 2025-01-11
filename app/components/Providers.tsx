"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";
import { NotificationProvider } from "./Notification";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({children}:{children:React.ReactNode}){
    const authenticator = async () =>{
        try {
            const res = await fetch("/api/imagekit-auth");
            if (!res.ok) {
               
                throw new Error(`Failed to authenticate`);
              }
              return res.json();
        } catch (error) {
            throw error
        }

    }

    return (
       <SessionProvider refetchInterval={5 * 60}>
       <NotificationProvider>
         <ImageKitProvider 
        urlEndpoint={urlEndpoint} 
        publicKey={publicKey} 
        authenticator={authenticator}
        >
        {children}
        
      </ImageKitProvider>
      </NotificationProvider>
     </SessionProvider>
    )
}