"use client"

import React, { useContext } from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import logo from "@/images/freshCart.png"
import { CiHeart } from "react-icons/ci"
import { FaCartShopping } from "react-icons/fa6"
import { ImProfile } from "react-icons/im"
import { IoIosSearch } from "react-icons/io"
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cartContext } from "../_contexts/CartContextProvider"
import { PiSignOutFill } from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdKeyboardArrowDown } from "react-icons/md"
import Image from "next/image"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

    export default function Navbar() {
        const session = useSession()

        const context = useContext(cartContext)
    
        if (!context) {
        throw new Error("cartContext must be used inside provider")
        }

        const {cartItemsNum, whishlistItemsNum} = context

        function handelLogout(){
            signOut({
                redirect : true,
                callbackUrl : "/login"
            })
        }

        
    return <>

        <div className="md:container mx-auto md:px-20">
            <NavigationMenu className="gap-30 md:grid md:grid-cols-5 py-3 md:gap-5 relative">


                <div className="col-span-2 md:col-span-1">
                    <Image width={200} height={200} src={logo.src} alt="freshCart Logo"/>
                </div>


                    <div className="hidden md:flex col-span-2 justify-between items-center relative">
                        <input type="text" className="border border-gray-200 w-full pt-3 pe-12 ps-5 pb-3  rounded-3xl" placeholder="Search for products, brands and more..." />
                        <Button className="bg-emerald-600 text-white absolute right-1 w-8 h-8 rounded-full text-center flex justify-center items-center cursor-pointer "> <IoIosSearch className="h-3.5 w-3.5" /> </Button>
                    </div>


            <NavigationMenuList className="md:col-span-2 md:flex justify-between items-center mx-auto">
                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/">Home</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden md:block" >
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/cart">Cart</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden md:block">
                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-transparent border-0 p-0 hover:bg-transparent focus:bg-transparent ring-0  active:bg-transparent">Categories <MdKeyboardArrowDown /> </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-40">

                                <DropdownMenuItem className=" hover:bg-green-100 hover:text-emerald-600  text-gray-500 text-md">
                                    <Link href="/categories"> All Categories </Link>
                                </DropdownMenuItem> 

                                <DropdownMenuItem className=" hover:bg-green-100 hover:text-emerald-600  text-gray-500 text-md">Electronics</DropdownMenuItem>

                                <DropdownMenuItem className=" hover:bg-green-100 hover:text-emerald-600  text-gray-500 text-md">Women&apos;s Fashion</DropdownMenuItem>

                                <DropdownMenuItem className=" hover:bg-green-100 hover:text-emerald-600  text-gray-500 text-md">Men&apos;s Fashion</DropdownMenuItem>

                                <DropdownMenuItem className=" hover:bg-green-100 hover:text-emerald-600  text-gray-500 text-md">Beauty & Health</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/brands">Brands</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>



                    <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                        <div className="relative">

                        <Link className="bg-transparent hover:bg-transparent" href="/wishlist"> 
                            <CiHeart/> 
                        </Link>

                        { whishlistItemsNum > 0 && <>
                            <span className="bg-red-500 text-white font-medium text-xs rounded-xl px-1 absolute top-0.5 right-0.5">
                                {whishlistItemsNum}
                            </span>
                        </> }


                        </div>

                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                        <div className="relative">
                            <Link className="bg-transparent hover:bg-transparent" href="/cart">
                                <FaCartShopping className="w-10 h-10" />
                            </Link>

                            {cartItemsNum > 0 && <>
                            <span className="bg-green-500 text-white text-xs font-medium rounded-xl px-1 absolute top-0.5 right-0.5">
                                {cartItemsNum}
                            </span>
                            </>}
                        </div>

                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/brands"> <ImProfile/> </Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    {session.status === "unauthenticated" ? 
                    <>
                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/login"> Login </Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link className="bg-transparent hover:bg-transparent" href="/signup"> Signup </Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>

                    </> :
                    <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Button className="bg-black hover:bg-black" onClick={handelLogout}> Logout </Button>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                    }

                    <div className="md:hidden flex flex-col gap-4 ">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="w-8 h-8 rounded-full bg-green-500 text-white"> <RxHamburgerMenu /> </Button>
                            </SheetTrigger>
                            <SheetContent showCloseButton={false} className="mx-auto px-3">
                                <SheetHeader className="px-0 py-3">
                                    <SheetTitle className="w-full"> <Image width={200} height={200} src={logo.src} alt="freshCart Logo"/> </SheetTitle>
                                </SheetHeader>

                                <div className="flex col-span-2 justify-between items-center relative">
                                    <input type="text" className="border border-gray-200 w-full pt-3 pe-12 ps-5 pb-3 text-xl rounded-3xl" placeholder="Search for products,brands......" />
                                    <Button className="bg-emerald-600 text-white absolute right-1 w-8 h-8 rounded-full text-center flex justify-center items-center cursor-pointer "> <IoIosSearch className="h-3.5 w-3.5" /> </Button>
                                </div>

                                <div className="flex flex-col gap-4 p-4 text-xl text-gray-700">
                                    <Link className="bg-transparent hover:bg-transparent" href="/">Home</Link>
                                    <Link className="bg-transparent hover:bg-transparent" href="/cart">Cart</Link>
                                    <Link className="bg-transparent hover:bg-transparent" href="/categories">Categories </Link>
                                    <Link className="bg-transparent hover:bg-transparent" href="/brands">Brands</Link>
                                </div>

                                <Separator className=' bg-gray-400 opacity-20'/>

                                <div> 
                                    <div className="p-4 flex items-center justify-between">
                                        <Link className="bg-transparent hover:bg-transparent flex text-xl gap-2 items-center" href="/wishlist"> 
                                            <CiHeart className="bg-red-100 text-red-600 h-8 w-8 p-2  rounded-full"/> Whishlist
                                        </Link>
                                        <div>
                                            { whishlistItemsNum > 0 && <>
                                                <span className="bg-red-500 text-white font-medium text-xl rounded-xl px-2.5">
                                                    {whishlistItemsNum}
                                                </span>
                                            </> }
                                        </div>

                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <Link className="bg-transparent hover:bg-transparent flex text-xl gap-2 items-center" href="/cart"> 
                                            <FaCartShopping className="bg-green-100 text-green-600 font-medium h-8 w-8 p-2  rounded-full"/> Cart
                                        </Link>
                                        <div>
                                            { cartItemsNum > 0 && <>
                                                <span className="bg-green-500 text-white text-xl rounded-xl px-2.5">
                                                    {cartItemsNum}
                                                </span>
                                            </> }
                                        </div>
                                    </div>
                                </div>

                                <Separator className=' bg-gray-400 opacity-20'/>

                                {session.status === "unauthenticated" ? 
                                <div>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                        <div className="flex justify-center items-center px-4 py-3 bg-green-700 text-white rounded-lg text-lg font-semibold">
                                            <Link className="bg-transparent hover:bg-transparent" href="/login"> Login </Link>
                                        </div>

                                        <div className="flex justify-center items-center px-4 py-3 bg-white text-green-700 border-2 border-green-700 rounded-lg text-lg font-semibold">
                                            <Link className="bg-transparent hover:bg-transparent" href="/signup"> Signup </Link>
                                        </div>
                                    </div>
                                </div>

                                :
                                    <div className="p-4">
                                        <Button className="bg-transparent hover:bg-transparent flex gap-2 p-0" onClick={handelLogout}> 
                                            <div className="flex items-center justify-center p-2 bg-red-50 rounded-full">
                                                <PiSignOutFill className="text-red-600"/>
                                            </div>
                                            <p className="text-red-500 text-xl font-semibold">LogOut</p>
                                        </Button>
                                    </div>

                                }

                            </SheetContent>
                        </Sheet>
                    </div>





            </NavigationMenuList>
            </NavigationMenu>
        </div>

        </>
    
    }

