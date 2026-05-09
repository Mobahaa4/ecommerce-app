import React from "react";
import { TfiReload } from "react-icons/tfi";
import { FaEye, FaStar } from "react-icons/fa6";
import { ProductType } from "../../types/productTypes";
import Link from "next/link";
import AddToCartbtn from "./AddToCartbtn";
import AddToWhishlistbtn from "./AddToWhishlistbtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface ProductTypeProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductTypeProps) {
  return (
    <div className="bg-white p-3 rounded-xl border relative transition hover:shadow-lg hover:-translate-y-1.5 duration-300">
      <div className="absolute top-4 right-1 gap-2 flex flex-col">

        <AddToWhishlistbtn productId={product._id}/>

        <Button className="bg-white shadow-2xl border text-gray-700 h-8 w-8 rounded-full cursor-pointer flex items-center justify-center hover:text-emerald-500 transition duration-300">
          <TfiReload/>
        </Button>

        <Link href={`/Product/${product._id}`} className="bg-white shadow-2xl border text-gray-700 h-8 w-8 rounded-full cursor-pointer flex items-center justify-center hover:text-emerald-500 transition duration-300">
          <FaEye/>
        </Link>

      </div>

      {product.priceAfterDiscount && (
        <>
          <div className="absolute top-4 left-2 bg-red-500 rounded-md">
            <span className="text-white text-sm p-2 ">- {Math.round( 100 - (product.priceAfterDiscount * 100) / product.price )}%</span>
          </div>
        </>
      )}

      <Image width={200} height={200} src={product.imageCover} alt={product.title} className="w-full" />
      <p className="text-gray-500 text-xs font-medium mt-3">
        {product.category.name}
      </p>
      <h3 className="text-gray-600 text-2xl font-medium">
        {product.title.split(" ", 2).join(" ").concat(" ....")}
      </h3>

      {product.ratingsAverage > 0 ? (
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.round(product.ratingsAverage) }).map(
            (rate, index) => (
              <div key={index}>
                <FaStar className="text-yellow-400 h-4 w-4" />
              </div>
            ),
          )}
          <p className="text-gray-500 text-xs font-medium">
            {product.ratingsAverage}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-xs font-medium">No reviews yet</p>
      )}

      <div className="flex items-center justify-between">
        {product.priceAfterDiscount ? (
          <div className="flex items-center gap-2.5">
            <h4 className="text-xl text-emerald-600 font-extrabold mt-3">
              {product.priceAfterDiscount} EGP
            </h4>
            <h4 className="text-sm text-gray-500 line-through font-medium mt-5">
              {product.price} EGP
            </h4>
          </div>
        ) : (
          <h4 className="text-xl font-extrabold mt-3">{product.price} EGP</h4>
        )}
        <AddToCartbtn productId={product._id}/>
      </div>
    </div>
  );
}
