"use client"

import { apiClient } from "@/lib/api-client";
import { ProductInterface } from "@/models/Product.model"
import { useEffect, useState } from "react"
import ImageGallery from "./components/ImageGallery";

export default function Home() {
  const [products,setProducts] = useState<ProductInterface[]>([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const data = await apiClient.getProducts();
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
   
  },[])
  return (
    <main className=" mx-auto px-4 py-8 max-w-[1200px] ">
      <h1 className="text-3xl text-center font-medium mt-10 mb-8">Newly Added</h1>
      <ImageGallery products={products} />
      <h1 className="text-3xl text-center font-medium mb-14 mt-28">Popular Collections Added</h1>
      <ImageGallery products={products} />
    </main>
  );
}

