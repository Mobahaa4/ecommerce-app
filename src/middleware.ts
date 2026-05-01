import React from 'react'
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import getmyToken from './app/utils/getmyToken'

export default async function middleware ( req : NextRequest ) {

    const jwt = await getmyToken( )

    if (jwt){
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/login", req.url))   //full URL    
}
export const config = {
    matcher : ["/cart", "/brands"]
}