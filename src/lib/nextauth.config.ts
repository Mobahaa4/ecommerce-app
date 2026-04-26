import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const nextAuthConfig : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "fresh cart",

            credentials: {
            username: {},
            password: {}
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
                
                if(finalRes.message === "success"){
                    return {
                        name : finalRes.user.name,
                        email : finalRes.user.email,
                        realTokenFromBackend : finalRes.token
                    }
                }
                
                } catch (error) {
                    return null
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
                params.token.realtoken = params.user.realTokenFromBackend
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