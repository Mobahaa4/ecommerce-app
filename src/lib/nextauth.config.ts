import type { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import "next-auth"

declare module "next-auth" {
    interface User {
        realtokenfrombackend: string
    }

    interface Session {
        user: {
        realtokenfrombackend: string
        } & DefaultSession["user"]
    }
    }

    declare module "next-auth/jwt" {
    interface JWT {
        realtokenfrombackend: string
    }
}

export const nextAuthConfig : NextAuthOptions = {
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
                console.log( finalRes )

                
                if(finalRes.message === "success"){
                    return {
                        id: finalRes.user._id,  
                        name : finalRes.user.name,
                        email : finalRes.user.email,
                        realtokenfrombackend : finalRes.token
                    }
                }

                return null
                
                } catch ( error ) {
                    return null
                }
            },
        })
    ],

    pages : {
        signIn : "/login"
    },
    callbacks : {


        // jwt({ token, user }) {
        //     if (user) {
        //     token.realToken = user.realTokenFromBackend
        //     }
        //     return token
        // },

        // session({ session, token }) {
        //     if (session.user) {
        //         session.user.realToken = token.realTokenFromBackend as string
        //     }
        //     return session
        // }

        jwt(params) {
            if(params.user){
                params.token.realtoken = params.user.realtokenfrombackend
            }
            return params.token
        },

        session(params) {
            return params.session   //don't return the token
        },
    },
    session : {
        maxAge : 60 * 60 * 24
    }
    
    
    
}