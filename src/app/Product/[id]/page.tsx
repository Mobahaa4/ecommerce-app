
import { Button } from '@/components/ui/button'
import { getProductById } from '@/Services/Products'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { MdOutlineElectricBolt } from 'react-icons/md'

export default async function page({params} : Promise<object>) {

    const myParams = await params
    const singleProduct = await getProductById(myParams.id)
    
    return (
        <div className='container mx-auto mt-5 md:grid md:grid-cols-4 lg:grid-cols-4 gap-10'>
            <div className=' md:col-span-1 p-4 border-1 md:mb-0 rounded-xl mb-3'>
                <img className='w-full' src={singleProduct?.imageCover} alt={singleProduct?.title} />
            </div>
            <div className='md:col-span-3 p-4 border-1 rounded-xl'>
                <div className='flex gap-2'>
                    <span className='text-xs p-2 text-emerald-700 bg-emerald-100 rounded-3xl'>{singleProduct?.category.name}</span>
                    <span className='text-xs p-2 text-black bg-gray-100 rounded-3xl'>{singleProduct?.brand.name}</span>
                </div>

                <p className='text-3xl font-bold my-3'>{singleProduct?.title}</p>
            
                {singleProduct?.ratingsAverage !== undefined ? (
                    <div className="flex items-center gap-1">
                    {Array.from({ length: Math.round(singleProduct?.ratingsAverage) }).map(
                        (rate, index) => (
                        <div key={index}>
                            <FaStar className="text-yellow-400 h-4 w-4" />
                        </div>
                        ),
                    )}
                    <p className="text-gray-500 text-xs font-medium">
                        {singleProduct?.ratingsAverage}
                    </p>
                    </div>
                ) : (
                    <p className="text-gray-500 text-xs font-medium">No reviews yet</p>
                )}

                {singleProduct?.priceAfterDiscount !== undefined ? (
                <div className="flex items-center gap-2.5">
                    <h4 className="text-3xl text-emerald-600 font-extrabold my-5">
                    {singleProduct?.price} EGP
                    </h4>
                    <h4 className="text-xl text-gray-500 line-through font-medium mt-5">
                    {singleProduct?.price} EGP
                    </h4>
                </div>
                ) : (
                <h4 className="text-3xl font-extrabold my-5">{singleProduct?.price} EGP</h4>
                )}
                <p className='mt-7 text-gray-600 text-lg font-medium'>{singleProduct?.description}</p>

                <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
                    <Button className='flex items-center w-full md:w-1/2 text-lg py-6 mt-5 font-medium text-white bg-emerald-600'> <FaShoppingCart /> Add to Cart</Button>
                    <Button className='flex items-center w-full md:w-1/2 text-lg py-6 md:mt-5 font-medium text-white'> <MdOutlineElectricBolt /> Buy Now</Button>
                </div>

                <div className='flex justify-center items-center gap-3'>
                    <Button className='flex items-center w-10/12 md:w-11/12 text-lg py-4 md:py-6 mt-6 font-medium text-black bg-white border-gray-200 border-1'> <FaHeart /> Add to Whislist</Button>
                    <Button className='flex items-center w-2/12 md:w-1/12 text-lg py-4 md:py-6 mt-6 font-medium text-white'> <MdOutlineElectricBolt /> </Button>
                </div>









            </div>

            


        </div>
    )
}
