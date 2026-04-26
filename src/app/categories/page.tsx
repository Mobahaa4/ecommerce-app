import { getAllCategories } from '@/Services/Categories'
import { CategoryType } from '@/types/productTypes'
import React from 'react'


export default async function page() {

    const categoriesRes = await getAllCategories()


    return (
        <div className='container mx-auto'>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-5 my-10 mx-auto">
                    {categoriesRes?.map( (category) => 
                    <div key={category.id} className=" border-2 rounded-xl shadow-xl p-4 pb-10 hover:-translate-y-1.5 hover:scale-105 transition duration-300 hover:shadow-xl">
                        <img src={category.image} className="w-60 h-60 rounded-md mx-auto" alt={category.name}/>
                        <h3 className="text-center font-bold text-xl mt-3"> {category.name} </h3>
                    </div> 
                    )}
                </div>
            

            </div>
        // </div>
    )
}
