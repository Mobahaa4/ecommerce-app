"use client"
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { FaLongArrowAltLeft, FaRegTrashAlt, FaShoppingCart } from 'react-icons/fa'
import { cartContext } from '../_contexts/CartContextProvider'
import { whishlistItemType } from '@/types/whishlist.type'
import { addProductToCart } from '../_actions/cart.Action'
import { DeleteFromWhishlist, getLoggedUserWhishlist } from '../_actions/whishlist.Actions'
import { toast } from 'sonner'
import Link from 'next/link'

export default function Wishlistpage() {

    const {whishlistItemsNum, setwhishlistItemsNum, whishlistItems, setwhishlistItems, setcartItemsNum, settotalPriceOfCart, setcartProducts } = useContext(cartContext)


    async function handdleDeleteFromWhishlist(id : string){
        const deleteRes = await DeleteFromWhishlist(id)
        const whishlist = await getLoggedUserWhishlist()
        if (deleteRes.status == "success"){
            setwhishlistItems(whishlist.data)
            setwhishlistItemsNum(whishlist.count)

            toast.success(`${deleteRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${deleteRes.message}`,{
                position : "top-center"
            })
        }
    }

    async function handleAddToCartFromWhishlist(id : string) {
        const res = await addProductToCart(id)
        if (res.status == "success"){

            toast.success(`${res.message}`,{
                position : "top-center"
            })
            setcartItemsNum(res.numOfCartItems);
            settotalPriceOfCart(res.data.totalCartPrice);
            setcartProducts(res.data.products);
            
        }else{
            toast.error(`${res.message}`,{
                position : "top-center"
            })
        }
        
    }


    return <> 
    <div className='min-h-screen bg-gray-100'>
        {whishlistItems.map(  (item : whishlistItemType) => 
        
            <div key={item.id} className='flex flex-col p-3 h-70 w-8/12 mx-auto  my-3 '>

                <div className=" bg-white border-2 border-gray-100 rounded-xl p-5 md:flex gap-5">
                    
                    <img src={item.imageCover} alt={item.title} className='md:h-50 md:w-40 w-full object-cover' />

                    <div className="flex-1 flex flex-col gap-3 min-w-0 mt-3 md:mt-0 px-2 md:px-0">
                        <p className="text-sm font-semibold text-gray-900"> {item.title} </p>
                        <div className="flex items-center gap-2">
                        <span className="bg-green-50 text-green-700 text-xs font-semibold rounded-full"> {item.category.name} </span>

                        </div>
                        <p className="text-sm font-semibold text-gray-900"> {item.price} <span className="text-xs font-normal text-gray-400">per unit</span></p>

                        <div className="flex items-center gap-3 my-1.5">
                                <Button className="h-8  bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center w-1/2 cursor-pointer" onClick={ () => handleAddToCartFromWhishlist(item.id) } >
                                    <FaShoppingCart /> Add to Cart 
                                </Button>

                                <Button className="h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center w-1/2 cursor-pointer" onClick={ () => handdleDeleteFromWhishlist(item.id) } >
                                    <FaRegTrashAlt className='text-red-600' /> 
                                </Button>
                        </div>

                    </div>
                </div>

            </div>

        )}

        {whishlistItemsNum > 0 ? 
        <Link href="/" className="text-violet-500 flex items-center gap-1 w-8/12 mx-auto hover:underline px-4"><FaLongArrowAltLeft /> Continue Shopping </Link> : ""
        }

    </div>

    </>

    
}
