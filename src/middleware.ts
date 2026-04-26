import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import React from 'react'

export default async function middleware ( req : NextRequest ) {

    const jwt = await getToken( {req} )

    if (jwt){
        return NextResponse.next()
    }

    return NextResponse.redirect("http://localhost:3000/login")   //full URL    
}
export const config = {
    matcher : ["/shop", "/brands"]
}