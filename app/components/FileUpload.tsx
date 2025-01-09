"use client";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";

export default function FileUpload ({onSuccess}:{onSuccess: (response:IKUploadResponse) => void})  {
    const [uploading,setUploading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    const onError = (err:{message:string})=>{
        setError(err.message);
        setUploading(false)
    }
    const handleSuccess = (response:IKUploadResponse)=>{
        console.log(response);
        setUploading(false);
        setError(null);
        onSuccess(response);
    }

    const handleStartUpload = ()=>{
        setUploading(true);
        setError(null);
    }
  return (
    <div className=" space-y-2">
        FileUpload
        <IKUpload
        fileName="product-image.png"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        validateFile={(file:File)=>{
            const validTypes =   ["image/png", "image/jpeg", "image/jpg","image/webp"]
            if(!validTypes.includes(file.type)){
                setError("Invalid file type");
                return false;
            }if(file.size > 5 * 1024 * 1024){
                // 5 mb
                setError("File size is too large");
            }
                return true;
        }}
        />
        {uploading && (
            <div className="text-center text-lg text-gray-600">Uploading...</div>
        )}
        {error && (
            <div className="text-center text-lg text-red-600">{error}</div>
        )}
    </div>
  )
}

