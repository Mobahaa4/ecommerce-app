import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

import React from 'react'

export default async  function getmyToken() {

    const myCokkies = await cookies()
    const myTokenFromCokkies = myCokkies.get("next-auth.session-token")?.value
    if(myTokenFromCokkies == null){
        return null
    }
    const myTokenAfterDecoded = await decode({token : myTokenFromCokkies, secret : process.env.NEXTAUTH_SECRET!})
    return myTokenAfterDecoded.realtoken
    
}
