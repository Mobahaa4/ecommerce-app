"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useContext } from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaRegTrashAlt } from 'react-icons/fa';
import { FaCartShopping, FaMinus, FaPlus, FaShield } from 'react-icons/fa6';
import { MdLocalShipping } from 'react-icons/md';
import { cartContext } from '../_contexts/CartContextProvider';
import { cartItemType } from '@/types/cart.type';
import { toast } from 'sonner';
import { clearCart, deleteCartItem, updateCartItem } from '../_actions/cart.Action';
import Image from 'next/image';
import { BsBoxSeamFill } from "react-icons/bs";

export default function CartPage() {

    const context = useContext(cartContext)

    if (!context) {
    throw new Error("cartContext must be used inside provider")
    }

    const {cartItemsNum ,totalPriceOfCart, cartProducts, setcartItemsNum, settotalPriceOfCart, setcartProducts, setcartId} = context

    async function handleDelete( id : string,){
        const deleteRes = await deleteCartItem( id )
        if (deleteRes.status == "success"){
            setcartItemsNum(deleteRes.numOfCartItems)
            settotalPriceOfCart(deleteRes.data.totalCartPrice)
            setcartProducts(deleteRes.data.products)
            toast(`${deleteRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${deleteRes.message}`,{
                position : "top-center"
            })
        }
    }

    async function handleUpdate( id:string, count : number){
        const updateRes = await updateCartItem(id, count)
        if (updateRes.status == "success"){
            setcartItemsNum(updateRes.numOfCartItems)
            settotalPriceOfCart(updateRes.data.totalCartPrice)
            setcartProducts(updateRes.data.products)
            toast.success(`${updateRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${updateRes.message}`,{
                position : "top-center"
            })
        }
    }

    async function handleClearCart() {
        const clearRes = await clearCart()
        if (clearRes.status == "success"){
            setcartItemsNum(clearRes.numOfCartItems)
            settotalPriceOfCart(clearRes.data.totalCartPrice)
            setcartProducts(clearRes.data.products)
            setcartId("")
            toast.success(`${clearRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${clearRes.message}`,{
                position : "top-center"
            })
        }
    }

    return <>
    
        {cartItemsNum > 0 ?

        <div className="min-h-[60vh] bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-6">

                <p className="text-sm text-gray-500 mb-5">

                <> You have <span className="text-green-700 font-semibold"> {cartItemsNum} items </span> in your cart </> 
                </p>
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className='flex-1 flex flex-col gap-3 min-w-0 w-full lg:w-80 '>
                        {cartProducts?.map( (item : cartItemType) =>      
                        <>  
                        <div key={item.product._id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-5">
                            
                            <Image width={120} height={120} src={item.product.imageCover} alt={item.product.title} className='h-30 w-30 object-center object-cover' />

                            <div className="flex-1 flex flex-col gap-2">
                                <p className="text-sm font-semibold text-gray-900">{item.product.title}</p>
                                <div className="flex items-center gap-2">
                                <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.product.category.name}</span>

                                </div>
                                <p className="text-sm font-semibold text-gray-900">{item.price} <span className="text-xs font-normal text-gray-400">per unit</span></p>

                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <Button className="w-8 h-8 text-xs bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => handleUpdate( item.product._id, item.count - 1)}> < FaMinus/> </Button>
                                        <span className="w-9 h-8 flex items-center justify-center text-sm font-semibold border-x border-gray-200 text-gray-900">{item.count}</span>
                                        <Button className="w-8 h-8 text-xs bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => handleUpdate( item.product._id, item.count + 1)}> <FaPlus/> </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                        <p className="text-xs text-gray-400">Total</p>
                                        <p className="text-sm font-semibold text-gray-900">{item.price * item.count}</p>
                                        </div>
                                        <Button className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center cursor-pointer " onClick={ () => handleDelete(item.product._id) }>
                                            <FaRegTrashAlt className='text-red-600' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </>)}

                        <>
                        <div className='flex justify-between items-center'>
                            <Link href="/" className='text-violet-500 flex items-center gap-1' > <FaLongArrowAltLeft />Continue Shopping</Link>
                            <Button className='text-red-600 bg-transparent flex items-center border border-red-400 p-3 rounded-md cursor-pointer' onClick={ () => handleClearCart() } ><FaRegTrashAlt />Clear Cart</Button>
                        </div> </> 
                    </div>

                    <>
                    <div className="w-full lg:w-80  bg-white border border-gray-200 rounded-xl overflow-hidden lg:top-6">

                    
                        <div className="bg-green-700 px-5 py-4 flex items-center gap-3">
                                <FaCartShopping className='text-white' />
                        <div>
                            <p className="text-white text-sm font-semibold">Order Summary</p>
                            <p className="text-white/70 text-xs">{cartItemsNum} items in your cart</p>
                        </div>
                        </div>

                        <div className="px-5 py-4 flex flex-col gap-4">

                        
                        <div className="bg-green-50 border border-green-200 rounded-lg px-3.5 py-2.5 flex items-center gap-2.5">
                            <MdLocalShipping className='text-green-700 text-lg' />
                            <div>
                            <p className="text-green-700 text-xs font-semibold">Free Shipping!</p>
                            <p className="text-green-600 text-xs">You qualify for free delivery</p>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-semibold text-gray-900">{totalPriceOfCart}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-semibold text-green-700">FREE</span>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-gray-900">{totalPriceOfCart} <span className="text-xs font-normal text-gray-400">EGP</span></span>
                        </div>


                        <div className="flex gap-2">
                            <input
                            type="text"
                            placeholder="Apply Promo Code"
                            className="flex-1 h-9 border border-gray-300 rounded-lg px-3 text-xs text-gray-900 outline-none focus:border-green-600"
                            />
                            <button className="h-9 px-3 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                            Apply
                            </button>
                        </div>

                        
                        <Link href="/payment" className="w-full h-11 bg-green-700 hover:bg-green-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                            <FaShield />
                            Secure Checkout
                        </Link>

                        
                        <div className="flex justify-center gap-5">
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                            <FaShield className='text-green-700 text-lg' />
                            Secure Payment
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MdLocalShipping className='text-blue-700 text-lg' />
                            Fast Delivery
                            </span>
                        </div>

                        <p className="text-xs text-gray-400">
                            <Link href="/" className="text-green-700 hover:underline flex items-center justify-center gap-1"> <FaLongArrowAltLeft /> Continue Shopping</Link>
                        </p>

                        </div>
                    </div>
                    </> 
                </div>

            </div>
        </div> 

        : 
        <div className='flex justify-center items-center'>
            <div className=' flex flex-col items-center justify-center text-center max-w-md min-h-[60vh] '>
                <div className='flex text-center items-center justify-center mb-6'>
                    <div className='bg-gray-50 flex justify-center items-center rounded-full w-35 h-35'>
                        <BsBoxSeamFill className='text-4xl text-gray-300' />
                    </div>
                </div>
                    <p className='text-2xl font-bold mb-2'>Your Cart is Empty</p>
                    <p className='text-md text-gray-500 mb-5'>Looks like you haven&apos;t added anything to your cart yet.Start exploring our products!</p>

                    <Link href="/" className='text-white text-xl font-bold flex items-center gap-1.5 justify-center mt-5 p-3 rounded-xl w-1/2 bg-green-400 transition duration-200 hover:bg-green-700'>
                        Start Shopping <FaLongArrowAltRight />
                    </Link>
            </div>
        </div>
        
        }
    
    </>
    
}

