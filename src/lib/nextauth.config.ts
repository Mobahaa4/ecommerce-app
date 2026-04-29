import type { NextAuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        id: string
        name: string
        email: string
        realtokenfrombackend: string
    }

    interface Session {
        user: {
        realtoken: string
        } & DefaultSession["user"]
    }
    }

    declare module "next-auth/jwt" {
    interface JWT {
        realtoken?: string
    }
}

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "fresh cart",

        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },

        async authorize(credentials) {
            try {
            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/auth/signin",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
                }
            )

            const text = await res.text()

            let data
            try {
                data = JSON.parse(text)
            } catch {
                console.log("Backend did not return JSON:", text)
                return null
            }

            if (data?.message === "success") {
                return {
                id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                realtokenfrombackend: data.token,
                }
            }

            return null
            } catch (err) {
            console.log("Authorize error:", err)
            return null
            }
        },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },

    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.realtoken = user.realtokenfrombackend
        }

        return token
        },

        async session({ session, token }) {
        if (session.user) {
            session.user.realtoken = token.realtoken as string
        }

        return session
        },
    },

    debug: true,
}

































// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import NextAuth, { DefaultSession } from "next-auth"
// import { JWT } from "next-auth/jwt"
// import "next-auth"



// declare module "next-auth" {

//     interface User {
//         realtokenfrombackend: string
//     }

//     interface Session {
//         user: {
//         realtoken: string
//         } & DefaultSession["user"]
//     }
//     }

//     declare module "next-auth/jwt" {

//     interface JWT {
//         realtoken: string
//     }
// }

// export const nextAuthConfig : NextAuthOptions = {
//     providers : [
//         CredentialsProvider({
//             name : "fresh cart",

//             credentials: {
//             email: { label: "Email", type: "text" },
//             password: { label: "Password", type: "password" }
//             },

//             async authorize(credentials){
//                 try {
//                     const res = await fetch ("https://ecommerce.routemisr.com/api/v1/auth/signin",{
//                     body : JSON.stringify(credentials),
//                     method : "POST",
//                     headers : {
//                         "Content-Type" : "application/json"
//                     },
//                 })
        
//                 const finalRes = await res.json()
//                 console.log( finalRes )

                
//                 if(finalRes.message === "success"){
//                     return {
//                         id: finalRes.user._id,  
//                         name : finalRes.user.name,
//                         email : finalRes.user.email,
//                         realtokenfrombackend : finalRes.token
//                     }
//                 }

//                 return null
                
//                 } catch ( error ) {
//                     return null
//                 }
//             },
//         })
//     ],

//     pages : {
//         signIn : "/login"
//     },
//     callbacks : {


//         // jwt({ token, user }) {
//         //     if (user) {
//         //     token.realToken = user.realTokenFromBackend
//         //     }
//         //     return token
//         // },

//         // session({ session, token }) {
//         //     if (session.user) {
//         //         session.user.realToken = token.realTokenFromBackend as string
//         //     }
//         //     return session
//         // }

//         // jwt(params) {
//         //     if(params.user){
//         //         params.token.realtoken = params.user.realtokenfrombackend
//         //     }
//         //     console.log("jwt", params)
//         //     console.log("jwt2", params.user)
//         //     console.log("jwt3", params.token.realtoken)
//         //     return params.token
//         // },
//         jwt({ token, user }) {

//         console.log("USER:", user)

//         if (user) {
//             token.realtoken = user.realtokenfrombackend
//         }

//         console.log("TOKEN:", token)

//         return token
//         },
//         session(params) {
//             console.log("session", params)

//             return params.session   //don't return the token
//         },
//     },
//     session : {
//         maxAge : 60 * 60 * 24
//     }
    
    
    
// }