import React from 'react'
import { FaFacebookF, FaTruck, FaTwitter, FaYoutube } from 'react-icons/fa6'
import logo from "@/images/freshCart.png"
import Image from 'next/image'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoLogoInstagram } from 'react-icons/io'
import { Separator } from '@/components/ui/separator'
import { IoShieldHalfOutline } from "react-icons/io5";
import Link from 'next/link'
import { MdHeadsetMic } from 'react-icons/md'
import { TfiReload } from 'react-icons/tfi'

export default function Footer() {
    return (
        <div className='mt-10'>
            <div className='bg-emerald-50'>
                <div className='md:container md:mx-auto md:w-10/12'>
                    <div className='py-5 px-2 md:grid md:grid-cols-4 grid grid-cols-2 gap-4'>
                        <div>
                            <div className='flex gap-3'>
                                <div className='bg-emerald-100 rounded-lg w-12 h-12 flex justify-center items-center'>
                                    <FaTruck className='text-emerald-600 text-xl' />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>Free Shipping</p>
                                    <p className='text-sm text-gray-500'>On orders over 500 EGP</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex gap-3'>
                                <div className='bg-emerald-100 rounded-lg w-12 h-12 flex justify-center items-center'>
                                    <TfiReload className='text-emerald-600 text-xl' />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>Easy Returns</p>
                                    <p className='text-sm text-gray-500'>14-day return policy</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex gap-3'>
                                <div className='bg-emerald-100 rounded-lg w-12 h-12 flex justify-center items-center'>
                                    <IoShieldHalfOutline  className='text-emerald-600 text-xl' />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>Secure Payemnt</p>
                                    <p className='text-sm text-gray-500'>100% secure checkout</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex gap-3'>
                                <div className='bg-emerald-100 rounded-lg w-12 h-12 flex justify-center items-center'>
                                    <MdHeadsetMic  className='text-emerald-600 text-xl' />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>24/7 Support</p>
                                    <p className='text-sm text-gray-500'>Contact us anytime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gray-900'>
                <div className='md:container md:mx-auto md:w-10/12'>
                    <div className='py-15 px-5 md:grid md:grid-cols-6 flex flex-col gap-10'>

                        <div className='md:col-span-2'>
                            <Image width={200} height={200} src={logo.src} alt="freshCart Logo" className='bg-white py-3 px-4 rounded-lg'/>
                            <p className='mt-4 text-gray-400 text-sm'>
                                FreshCart is your one-stop destination for quality products. 
                                From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
                            </p>

                            <div className='flex flex-col gap-2 mt-3'>
                                <div className='flex gap-2 items-center'>
                                    <FaPhoneAlt className='text-emerald-500'/>
                                    <p className='text-sm text-gray-400'>+1(800)123-4567</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <FaPhoneAlt className='text-emerald-500'/>
                                    <p className='text-sm text-gray-400'>support@freshcart.com</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <FaPhoneAlt className='text-emerald-500'/>
                                    <p className='text-sm text-gray-400'>123 Commerce Street,New York,NY 10001</p>
                                </div>
                            </div>

                            <div className='flex gap-2 mt-4'>

                                <div className='p-2 rounded-4xl border bg-gray-800'>
                                    <FaFacebookF className='text-gray-400'/>
                                </div>
                                <div className='p-2 rounded-4xl border bg-gray-800'>
                                    <FaTwitter className='text-gray-400'/>
                                </div>
                                <div className='p-2 rounded-4xl border bg-gray-800'>
                                    <IoLogoInstagram className='text-gray-400'/>
                                </div>
                                <div className='p-2 rounded-4xl border bg-gray-800'>
                                    <FaYoutube className='text-gray-400'/>
                                </div>

                            </div>
                        </div>

                        <div className='md:p-3'>
                            <h2 className='text-white font-semibold text-2xl'>Shop</h2>
                            <div className='flex flex-col gap-3 mt-6'>
                                <p className='text-gray-400 text-sm'>All Products</p>
                                <p className='text-gray-400 text-sm'>Categoriesd</p>
                                <p className='text-gray-400 text-sm'>Brands</p>
                                <p className='text-gray-400 text-sm'>Electronics</p>
                                <p className='text-gray-400 text-sm'>Men&apos;s Fashion</p>
                                <p className='text-gray-400 text-sm'>Women&apos;s Fashion</p>
                            </div>
                        </div>

                        <div className='md:p-3'>
                            <h2 className='text-white font-semibold text-2xl'>Account</h2>
                            <div className='flex flex-col gap-3 mt-6'>
                                <p className='text-gray-400 text-sm'>My Account</p>
                                <p className='text-gray-400 text-sm'>Order History</p>
                                <Link href="/wishlist" className='text-gray-400 text-sm'>Whishlist</Link>
                                <Link href="/cart" className='text-gray-400 text-sm'>Shopping Cart</Link>
                                <Link href="/login" className='text-gray-400 text-sm'>Sign In</Link>
                                <Link href="/signup" className='text-gray-400 text-sm'>Create Account</Link>
                            </div>
                        </div>

                        <div className='md:p-3'>
                            <h2 className='text-white font-semibold text-2xl'>Support</h2>
                            <div className='flex flex-col gap-3 mt-6'>
                                <p className='text-gray-400 text-sm'>Contact Us</p>
                                <p className='text-gray-400 text-sm'>Help Center</p>
                                <p className='text-gray-400 text-sm'>Shopping Info</p>
                                <p className='text-gray-400 text-sm'>Returns & Funds</p>
                                <p className='text-gray-400 text-sm'>Track Order</p>
                            </div>
                        </div>

                        <div className='md:p-3'>
                            <h2 className='text-white font-semibold text-2xl'>Legal</h2>
                            <div className='flex flex-col gap-3 mt-6'>
                                <p className='text-gray-400 text-sm'>Privacy Policy</p>
                                <p className='text-gray-400 text-sm'>Terms of Service</p>
                                <p className='text-gray-400 text-sm'>Cookie Policy</p>

                            </div>
                        </div>



                    </div>

                </div>
                <Separator className=' bg-gray-400 opacity-20'/>
                
            </div>




        </div>
    )
}
