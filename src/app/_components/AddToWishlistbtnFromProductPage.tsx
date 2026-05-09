"use client"
import React, { useContext, useState } from 'react'
import { addToWhishlist, getLoggedUserWhishlist } from '../_actions/whishlist.Actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cartContext } from '../_contexts/CartContextProvider'
import { FaHeart } from 'react-icons/fa6'
import { CiHeart } from 'react-icons/ci'

export default function AddToWhishlistbtnFromProductPage({ productId }: { productId: string }) {

    const context = useContext(cartContext)

    if (!context) {
    throw new Error("cartContext must be used inside provider")
    }
    const {setwhishlistItemsNum, setwhishlistItems} = context

    
    async function handleAddToWhishlist(){

        const addRes = await addToWhishlist(productId)
        const whishlist = await getLoggedUserWhishlist()
        if (addRes.status == "success"){
            setwhishlistItems(whishlist.data)
            setwhishlistItemsNum(whishlist.count)

            toast.success(`${addRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${addRes.message}`,{
                position : "top-center"
            })
        }

    }


    return (
        <>
            <Button className='flex items-center w-10/12 md:w-11/12 text-lg p-5 mt-6 font-medium cursor-pointer
                    text-black bg-white border-gray-400 border hover:text-green-500 hover:border-green-500' onClick={handleAddToWhishlist}>
            <CiHeart />Add to Whislist</Button>
            
        </>


    )
}
