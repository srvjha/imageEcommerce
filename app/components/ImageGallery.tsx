import {  ProductInterface } from "@/models/Product.model";
import ProductCard from "./ProductCard";
import { SyncLoader } from "react-spinners";

interface ImageGalleryProps {
  products: ProductInterface[];
}

export default function ImageGallery({ products }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-14 ">
      {products.map((product) => (
        <ProductCard key={product._id?.toString()} product={product} />
      ))}

      {products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">
           <SyncLoader
          color="#18a5d6"
          />
          </p>
        </div>
      )}
    </div>
  );
}
