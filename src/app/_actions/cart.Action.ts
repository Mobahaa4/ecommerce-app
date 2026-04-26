"use server"
import getmyToken from "../utils/getmyToken"
import { cartResType } from "@/types/cart.type"

export async function addProductToCart( id : string) : Promise<cartResType>{
    const Token = await getmyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        method : "POST",
        body : JSON.stringify( { productId : id  } ) ,
        headers : {
            "Content-Type" : "application/json",
            token : Token as string
        },
    })
    const finalRes = await res.json()
    return finalRes
}

export async function getLoggedUser() : Promise<cartResType>{
    const Token = await getmyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        headers : {
            token : Token as string
        }
    })
    const finalRes = await res.json()
    return finalRes
}


export async function deleteCartItem(id : string){
    const Token = await getmyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method : "DELETE",
        headers : {
            token : Token as string
        }
    })
    const finalRes = await res.json()
    return finalRes
}
export async function updateCartItem(id : string, count : number) : Promise<cartResType> {
    const Token = await getmyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method : "PUT",
        headers : {
            token : Token as string,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({ count })
        
    })
    const finalRes = await res.json()
    return finalRes
}

export async function clearCart() {
    const Token = await getmyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        method : "DELETE",
        headers : {
            token : Token as string
        }
    })
    const finalRes = await res.json()
    return finalRes
}