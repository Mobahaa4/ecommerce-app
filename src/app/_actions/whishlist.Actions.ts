"use server"

import { UserWhishlistResType } from "@/types/whishlist.type"
import getmyToken from "../utils/getmyToken"

export async function addToWhishlist( id : string ){
    const Token = await getmyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            token : Token as string
        },
        body : JSON.stringify( { productId : id } )
    })
    const finalRes = await res.json()
    return finalRes
}

export async function DeleteFromWhishlist( id : string ){
    const Token = await getmyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        method : "DELETE",
        headers : {
            token : Token as string
        }
    })
    const finalRes = await res.json()
    return finalRes
}

export async function getLoggedUserWhishlist() : Promise <UserWhishlistResType>{
    const Token = await getmyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
        headers : {
            token : Token as string
        }
    })
    const finalRes = await res.json()
    return finalRes
}