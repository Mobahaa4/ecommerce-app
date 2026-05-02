
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode"
import "next-auth"

export const nextAuthConfig : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers : [
        CredentialsProvider({
            name : "fresh cart",

            credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
            },

            async authorize(credentials){
                try {
                    const res = await fetch ("https://ecommerce.routemisr.com/api/v1/auth/signin",{
                    body : JSON.stringify(credentials),
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                })
        
                const finalRes = await res.json()

                const jwt : {id : string} = jwtDecode( finalRes.token )


                if(res.ok){
                    return {
                        id: jwt.id,  
                        name : finalRes.user.name,
                        email : finalRes.user.email,
                        realtokenfrombackend : finalRes.token
                    }
                }

                throw new Error( finalRes.message || "can't login" )

                
                } catch ( error ) {
                    console.log("authorize error", error)
                    throw new Error( (error as Error).message || "can't login" )
                }
            },
        })
    ],

    pages : {
        signIn : "/login"
    },
    callbacks : {

        jwt(params) {
            if(params.user){
                params.token.realtoken = params.user.realtokenfrombackend
                params.token.id = params.user.id
            }
            return params.token
        },

        session({token, session}) {
            if (session.user) {
                session.user.name = token.name as string
                session.user.email = token.email as string
            }
            session.id = token.id
            return session   //don't return the realtoken because it is accessed by client
        },
    },
    session : {
        maxAge : 60 * 60 * 24
    }
    
    
    
}