"use server"

import { shippingAddressType } from "@/types/orders.type"
import getmyToken from "../utils/getmyToken"

export async function createCashOrder(cartId : string, shippingAdress : shippingAddressType) {
    const Token = await getmyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{
        method : "POST",    
        headers : {
            token : Token as string,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify( shippingAdress )
    })
    const finalRes = await res.json()
    return finalRes
}
export async function createVisaOrder(cartId : string, shippingAdress : shippingAddressType) {
    const Token = await getmyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        method : "POST",    
        headers : {
            token : Token as string,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify( shippingAdress )
    })
    const finalRes = await res.json()
    return finalRes
}