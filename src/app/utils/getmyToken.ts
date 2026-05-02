import React from 'react'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'



export default async  function getmyToken() {

    const myCookies = await cookies()

    // In production, NextAuth typically prefixes cookies with "__Secure-" (or "__Host-")
    // so we need to check all possible session cookie names.
    const sessionCookie =
        myCookies.get("__Secure-next-auth.session-token")?.value ??
        myCookies.get("__Host-next-auth.session-token")?.value ??
        myCookies.get("next-auth.session-token")?.value

    if (sessionCookie == null) {
        return null
    }

    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
        throw new Error("NEXTAUTH_SECRET is not set. Add it to your Vercel environment variables.")
    }

    const decoded = await decode({ token: sessionCookie, secret })
    return decoded?.realtoken
    
}
