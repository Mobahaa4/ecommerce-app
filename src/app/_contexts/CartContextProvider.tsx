"use client";

import React, { createContext, ReactNode, useState } from "react";
import { cartItemType, cartResType } from "@/types/cart.type";
import { UserWhishlistResType, whishlistItemType } from "@/types/whishlist.type";

type CartContextType = {
    cartItemsNum: number
    setcartItemsNum: React.Dispatch<React.SetStateAction<number>>

    totalPriceOfCart: number
    settotalPriceOfCart: React.Dispatch<React.SetStateAction<number>>

    cartProducts: cartItemType[]
    setcartProducts: React.Dispatch<React.SetStateAction<cartItemType[]>>

    whishlistItemsNum: number
    setwhishlistItemsNum: React.Dispatch<React.SetStateAction<number>>

    whishlistItems: whishlistItemType[]
    setwhishlistItems: React.Dispatch<React.SetStateAction<whishlistItemType[]>>

    cartId: string
    setcartId: React.Dispatch<React.SetStateAction<string>>
}

export const cartContext = createContext<CartContextType | null> (null)
export default function CartContextProvider( {children , userCart, userWishlist }: {children: ReactNode , userCart : cartResType, userWishlist : UserWhishlistResType}) {
    
    const [cartId, setcartId] = useState<string>(userCart?.cartId ?? "")
    const [cartItemsNum, setcartItemsNum] = useState<number>(userCart?.numOfCartItems);
    const [totalPriceOfCart, settotalPriceOfCart] = useState<number>(userCart?.data?.totalCartPrice);
    const [cartProducts, setcartProducts] = useState<cartItemType[]>(userCart?.data?.products);
    const [whishlistItemsNum, setwhishlistItemsNum] = useState<number>(userWishlist?.count)
    const [whishlistItems, setwhishlistItems] = useState<whishlistItemType[]>(userWishlist?.data)
    
    
    // async function getloggedUserFromApi() {
    //     const userCart = await getLoggedUser();
    //     setuserCartData(userCart)
    //     setcartItemsNum(userCart.numOfCartItems)
    //     settotalPriceOfCart(userCart.data.totalCartPrice)
    //     setcartProducts(userCart.data.products)
    // }

    // useEffect(() => {
    //     getloggedUserFromApi();
    // }, []);
    
    return (
        <cartContext.Provider value={{ cartItemsNum, setcartItemsNum, totalPriceOfCart, settotalPriceOfCart, cartProducts, setcartProducts, cartId, setcartId, whishlistItemsNum, setwhishlistItemsNum, whishlistItems, setwhishlistItems }}>
        {children}
        </cartContext.Provider>
    );
}
