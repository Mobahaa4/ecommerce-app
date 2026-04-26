"use server"

import { cookies } from "next/headers"
import { loginDataType } from "./Login.schema"

export default async function LoginAction(values : loginDataType) {
        
        try {
            const res = await fetch ("https://ecommerce.routemisr.com/api/v1/auth/signin",{
            body : JSON.stringify(values),
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
        })

        const finalRes = await res.json()

        const myCookies = await cookies()
        myCookies.set("token", finalRes.token, {
            httpOnly : true ,
            secure : true ,
            sameSite : "strict",
            maxAge : 60 * 60 * 24
        })

        return res.ok
        
        } catch (error) {
            console.log(error)
        }

        

}
