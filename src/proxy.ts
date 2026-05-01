
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"


export default async function proxy ( request : NextRequest ) {
    const protectedRoutes = ["/cart", "/brands", "/wishlist", "/payment"]
    const authRoutes = ["/login", "/signup"]

    //1)getPathname
    const  myPath = request.nextUrl.pathname;

    //1)getToken
    const jwt = await getToken( {
        req : request,
        secret : process.env.NEXTAUTH_SECRET,
        secureCookie : process.env.NODE_ENV == "production"
    }
    
    )
    const token = jwt?.realtoken;

    if (!token && protectedRoutes.some( (path) => myPath.startsWith(path) )){
        return NextResponse.redirect(new URL("/login", request.url))   //full URL    
    }

    if (token && authRoutes.some( (path) => myPath.startsWith(path) )){
        return NextResponse.redirect(new URL("/", request.url))   //full URL    
    }
    
    return NextResponse.next()
    
}
// when we go to peoxy and when we don't
export const config = {
    matcher : [
        "/brands/:path*",
        "/payment/:path*",
        "/login",
        "/signup"
    ],
}