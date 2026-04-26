import React from 'react'
import { getAllBrands } from '../_actions/brands.Action'
import { BrandType } from '@/types/productTypes'

export default async function page() {
    const brands = await getAllBrands()
    return (
        <div className='px-20 mx-auto'>
            <div className='flex flex-wrap justify-between w-full  mx-auto gap-7 py-10'>
                {brands.data.map( (brand : BrandType) => 
                    <div key={brand.id} className=' md:w-1/6 sm:w-1/3 border-2 shadow-2xs rounded-md p-3 bg-white hover:-translate-y-1.5 transition duration-300 hover:shadow-xl'>
                        
                        <div className='bg-gray-100 px-5 py-10 rounded-md'>
                        <img src={brand.image} alt={brand.name} className='w-full' />
                        </div>

                        <p className='text-center mt-5 font-bold'> {brand.name} </p>



                    </div>
            
            )}

            </div>
        </div>
    )
}
