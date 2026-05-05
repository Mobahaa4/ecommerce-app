import React from 'react'
import { getAllBrands } from '../_actions/brands.Action'
import { BrandType } from '@/types/productTypes'
import Image from 'next/image'

export default async function page() {
    const brands = await getAllBrands()
    return (
        <div className='md:px-20 container mx-auto'>
            <div className='grid  grid-cols-2 md:grid-cols-6 gap-6 mx-auto py-10'>
                {brands.data.map( (brand : BrandType) => 
                    <div key={brand._id} className='col-span-1 border-2 shadow-2xs rounded-md p-3 bg-white hover:-translate-y-1.5 transition duration-300 hover:shadow-xl'>
                        
                        <div className='bg-gray-100 px-5 py-10 rounded-md'>
                        <Image width={400} height={400} src={brand.image} alt={brand.name} className='w-full' />
                        </div>

                        <p className='text-center mt-5 font-bold'> {brand.name} </p>

                    </div>
            
            )}

            </div>
        </div>
    )
}
