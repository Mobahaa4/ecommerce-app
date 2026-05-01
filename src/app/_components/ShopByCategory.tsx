import React from 'react'
import { getAllCategories } from '@/Services/Categories';
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import Image from 'next/image';


export default async function ShopByCategory() {
    const Categories = await getAllCategories();
    return (
        <div className="container mx-auto md:px-20">

        <div className="relative my-6 md:flex md:justify-between md:items-end">
            <h2 className="text-4xl mt-15 font-bold">
            Shop By <span className="text-emerald-600">Catogry</span>
            </h2>
            <Link href="/categories" className="absolute flex items-center gap-1 text-emerald-600 right-2">View All Categories <FaArrowRight /></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 my-10">

            {Categories?.map( (category) => 
                <div key={category._id}  className=" border-2 rounded-xl shadow-xl p-4 pb-10 hover:-translate-y-1.5 hover:scale-105 transition duration-300 hover:shadow-xl">
                    <Image width={200} height={200} src={category.image} className="w-60 h-60 rounded-md mx-auto" alt={category.name}/>
                    <h3 className="text-center font-bold text-xl mt-3"> {category.name} </h3>
                </div> 
            )}

        </div>

        </div>
    )
}
