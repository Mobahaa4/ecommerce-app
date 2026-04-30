import React from 'react'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'



export default async  function getmyToken() {

    const myCokkies = await cookies()
    const myTokenFromCokkies = myCokkies.get("next-auth.session-token")?.value
    if(myTokenFromCokkies == null){
        return null
    }
    const myTokenAfterDecoded = await decode({token : myTokenFromCokkies, secret : process.env.NEXTAUTH_SECRET!})
    return myTokenAfterDecoded?.realtoken
    
}
