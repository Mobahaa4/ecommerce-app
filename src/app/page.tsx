import React, { lazy, Suspense } from "react";
import ProductCard from "./_components/ProductCard";
import { getAllProducts } from "../Services/Products";
import Slider from "./_components/Slider";
import homeSliderImage from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import { Oval } from "react-loader-spinner";
import getmyToken from "./utils/getmyToken";
const ShopByCategoryLazyComp = lazy( () => import("./_components/ShopByCategory") )


export default async function Home() {
  const products = await getAllProducts();
  const Images = [homeSliderImage.src, homeSliderImage.src, homeSliderImage.src]

  return (
    <>
      <Slider listOfImages={Images} slidesPerView={1}/>

      <Suspense fallback ={   
        <div className="my-6 container mx-auto md:px-20 flex items-center justify-center">
          <Oval
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
          }>
        <ShopByCategoryLazyComp/>
      </Suspense>

      <div className="container mx-auto md:p-20">
        <h2 className="text-4xl mt-15 font-bold">
          Featured <span className="text-emerald-600">Products</span>
        </h2>

        <div className="container mx-auto grid lg:grid-cols-5 md:grid-cols-4 gap-5 ">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
