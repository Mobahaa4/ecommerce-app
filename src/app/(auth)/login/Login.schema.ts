import * as z from "zod"
export const LoginSchema = z.object({
    email : z.email("Enter your Email").nonempty(),
    password : z.string("Enter your Password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")
})

export type loginDataType = z.infer<typeof LoginSchema>