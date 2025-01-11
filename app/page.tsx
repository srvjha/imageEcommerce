"use client"

import { apiClient } from "@/lib/api-client";
import { ProductInterface } from "@/models/Product.model"
import { useEffect, useState } from "react"

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
    <div>page</div>
  )
}

