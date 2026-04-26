"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getLoggedUser } from "../_actions/cart.Action";
import { cartItemType, cartResType } from "@/types/cart.type";
import { UserWhishlistResType } from "@/types/whishlist.type";


export const cartContext = createContext({});
export default function CartContextProvider( {children , userCart, userWishlist }: {children: ReactNode , userCart : cartResType, userWishlist : UserWhishlistResType}) {
    
    const [cartId, setcartId] = useState(userCart?.cartId)
    const [cartItemsNum, setcartItemsNum] = useState<number>(userCart?.numOfCartItems);
    const [totalPriceOfCart, settotalPriceOfCart] = useState<number>(userCart?.data?.totalCartPrice);
    const [cartProducts, setcartProducts] = useState<cartItemType[]>(userCart?.data?.products);
    const [whishlistItemsNum, setwhishlistItemsNum] = useState<number>(userWishlist?.count)
    const [whishlistItems, setwhishlistItems] = useState(userWishlist?.data)
    
    
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
        <cartContext.Provider value={{ cartItemsNum, setcartItemsNum, totalPriceOfCart, settotalPriceOfCart, cartProducts, setcartProducts, cartId, whishlistItemsNum, setwhishlistItemsNum, whishlistItems, setwhishlistItems }}>
        {children}
        </cartContext.Provider>
    );
}
