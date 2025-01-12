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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit Shop</h1>
      <ImageGallery products={products} />
    </main>
  );
}

