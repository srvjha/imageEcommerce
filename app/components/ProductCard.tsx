import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IMAGE_VARIANTS, ProductInterface } from "@/models/Product.model";
import { Eye } from "lucide-react";


export default function ProductCard({ product }: { product: ProductInterface }) {
  console.log("product: ",product)
  const lowestPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0]?.price || 0
  );

  return (
    <div className="card w-[290px] bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-0 pt-0">
        <Link
          href={`/products/${product._id}`}
          className="relative group w-full"
        >
          <div
            className="rounded-t-xl overflow-hidden relative w-full"
            style={{
              aspectRatio:
                IMAGE_VARIANTS.SQUARE.dimensions.width /
                IMAGE_VARIANTS.SQUARE.dimensions.height,
            }}
          >
            <IKImage
              path={product.imageUrl}
              alt={product.name}
              loading="eager"
              transformation={[
                {
                  height: IMAGE_VARIANTS.SQUARE.dimensions.height.toString(),
                  width: IMAGE_VARIANTS.SQUARE.dimensions.width.toString(),
                  cropMode: "extract",                
                  quality: "80",
                },
              ]}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/products/${product._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{product.name}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="card-actions justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold">
              From  ₹{(Number(lowestPrice.toFixed(2)) * 100).toFixed(2)}
            </span>
            <span className="text-xs text-base-content/50">
              {product.variants.length} sizes available
            </span>
          </div>

          <Link
            href={`/products/${product._id}`}
            className="btn btn-primary btn-sm gap-2"
          >
            <div className="flex bg-black text-white px-2 py-3 hover:bg-gray-900 justify-center items-center rounded-xl mt-1 gap-1">
           
            View Options
            <Eye className="w-4 h-4 mt-1" />
            </div>
           
          </Link>
        </div>
      </div>
    </div>
  );
}
