/*eslint-disable*/
import NextAuth from "next-auth"
import  { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user : {
            name : string,
            email : string,
            image? : string | undefined,
        }
        expires : string,
        id : string
    }

    interface User {
        id: string,  
        name : string,
        email : string,
        realtokenfrombackend : string
    }

}
    
declare module "next-auth/jwt" {
        interface JWT {
            id : string,
            realtoken : string
        }
}
