import * as z from "zod"
export const SignUpSchema = z.object({
    name : z.string("Enter your name").max(20).nonempty(),
    email : z.email("Enter your Email").nonempty(),
    password : z.string("Enter your Password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword : z.string("Enter rePassword").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    phone : z.string("Enter your phone")
}).refine( function(values) {
    return values.rePassword === values.password
},{
    error : "password and repassword are not the same",
    path : ["rePassword"]
})

export type signupDataType = z.infer<typeof SignUpSchema>