"use client"
import React, { useContext, useState } from 'react'
import { addToWhishlist, getLoggedUserWhishlist } from '../_actions/whishlist.Actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cartContext } from '../_contexts/CartContextProvider'
import { FaHeart } from 'react-icons/fa6'

export default function AddToWhishlistbtn({ productId }: { productId: string }) {

    const context = useContext(cartContext)

    if (!context) {
    throw new Error("cartContext must be used inside provider")
    }
    const {setwhishlistItemsNum, setwhishlistItems} = context

    const [liked, setliked] = useState(false)
    
    async function handleAddToWhishlist(){

        const addRes = await addToWhishlist(productId)
        const whishlist = await getLoggedUserWhishlist()
        if (addRes.status == "success"){
            setwhishlistItems(whishlist.data)
            setwhishlistItemsNum(whishlist.count)
            setliked(true)

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
        
        { liked ? 

        <Button onClick={handleAddToWhishlist} 
        className="
        bg-white shadow-2xl border h-8 w-8 rounded-full 
        cursor-pointer flex items-center justify-center 
        text-red-500"
        >
        <FaHeart />
        </Button>   : 

        <Button onClick={handleAddToWhishlist} 
        className="
        bg-white shadow-2xl border text-gray-700 h-8 w-8 rounded-full 
        cursor-pointer flex items-center justify-center 
        hover:text-red-500 transition duration-300"
        >
        <FaHeart />
        </Button>

        }

        </>


    )
}
