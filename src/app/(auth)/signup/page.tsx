"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupDataType, SignUpSchema } from './Signup.schema' 
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { FaClock, FaFacebook, FaGoogle, FaLock, FaStar, FaTruck, FaUsers } from 'react-icons/fa6'
import { FaShieldAlt } from 'react-icons/fa'
import grocery from "@/images/grocery.png"
import Image from 'next/image'


export default function Page() {
    const router = useRouter()

    const form = useForm( {
        defaultValues : {
            name : "",
            email : "",
            password : "",
            rePassword : "",
            phone : ""
        },
        resolver : zodResolver(SignUpSchema)
    })

    async function handleSignup (values : signupDataType){
        try {
            const res = await fetch ("https://ecommerce.routemisr.com/api/v1/auth/signup",{
            body : JSON.stringify(values),
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
        })
        const finalRes = await res.json()
        console.log(finalRes)

        if(res.ok){
            toast.success("Sign up Successfully",{
                position : "top-center",
                richColors : true
            })
            router.push("/login")
        } else {
                toast.error("Failed to Sign up",{
                position : "top-center",
                richColors : true
            })
        }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

        <div className="flex flex-col md:flex-row md:min-h-screen my-10 overflow-hidden md:px-20 gap-5  bg-white">

        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 px-6">
            <div className="bg-white p-2 mb-5 rounded-xl">
            <Image src={grocery} width={500} height={500} alt='fresh cart grocery' />.
            </div>
            <h2 className="text-lg font-bold text-gray-900 text-center  mb-2">
            FreshCart — Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-xs text-gray-500 text-center  leading-relaxed mb-4">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            <span className="flex gap-1 items-center text-xs text-gray-600"> <FaTruck className='text-emerald-600 text-md'/> Free Delivery</span>
            <span className="flex gap-1 items-center text-xs text-gray-600"> <FaShieldAlt className='text-emerald-600 text-md'/> Secure Payment</span>
            <span className="flex gap-1 items-center text-xs text-gray-600"> <FaClock className='text-emerald-600 text-md'/> 24/7 Support</span>
            </div>
        </div>


        <div className="flex flex-1 items-center justify-center bg-white px-6">
            <div className="w-full">

            <p className="text-2xl font-bold text-center mb-1">
                <span className="text-emerald-600">Fresh</span>
                <span className="text-gray-900">Cart</span>
            </p>
            <p className="text-xs text-gray-500 text-center mb-5">
                Sign up to continue your fresh shopping experience
            </p>


            <button type="button" className="flex items-center justify-center gap-2.5 w-full py-3 px-3 mb-2.5 border border-gray-300 rounded-lg bg-white text-xs font-medium text-gray-800 hover:bg-gray-50">
                <FaGoogle className='text-red-500 text-md' />  Continue with Google

            </button>
            <button type="button" className="flex items-center justify-center gap-2.5 w-full py-3 px-3 mb-3 border border-gray-300 rounded-lg bg-white text-xs font-medium text-gray-800 hover:bg-gray-50">
                <FaFacebook className='text-blue-600 text-md' />  Continue with Facebook
            </button>


            <div className="flex justify-center items-center gap-2 my-3">
                <span className="text-xs text-gray-400">OR CONTINUE WITH EMAIL</span>
            </div>

            <form onSubmit={form.handleSubmit(handleSignup)}>

                <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-3">
                    <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Name
                    </FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Name"
                        autoComplete="off"
                        className="px-3 py-3 text-xs"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    </Field>
                )}
                />

                <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-3">
                    <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Email Address
                    </FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        className="px-3 py-3 text-xs"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    </Field>
                )}
                />

                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-3">
                    <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Password
                    </FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        className="px-3 py-3 text-xs"
                        type='password'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    </Field>
                )}
                />

                <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-3">
                    <div className="flex justify-between items-center">
                        <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-gray-700">
                        rePassword
                        </FieldLabel>
                    </div>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter the repassword"
                        autoComplete="off"
                        type="password"
                        className="w-full px-3 py-2.5 text-xs text-gray-900 rounded-lg border outline-none transition-all duration-150 bg-white placeholder:text-gray-400"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-3">
                    <div className="flex justify-between items-center">
                        <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-gray-700">
                        Phone
                        </FieldLabel>
                    </div>
                    <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter yout Phone"
                        autoComplete="off"
                        type="text"
                        className="w-full px-3 py-2.5 text-xs text-gray-900 rounded-lg border outline-none transition-all duration-150 bg-white placeholder:text-gray-400"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="fc-keep" className="w-3.5 h-3.5 accent-[#16a34a] cursor-pointer" />
                <label htmlFor="fc-keep" className="text-xs text-gray-700 cursor-pointer select-none">
                    Keep me signed in
                </label>
                </div>


                <Button className="w-full py-3 rounded-lg text-md font-semibold text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
                Sign Up
                </Button>
            </form>




            <div className="flex flex-wrap justify-center gap-4 mt-3.5">
                <span className="flex gap-1 items-center text-xs text-gray-400"> <FaLock className='text-gray-400 text-md'/> SSL Secured</span>
                <span className="flex gap-1 items-center text-xs text-gray-400"> <FaUsers className='text-gray-400 text-md'/> 50K+ Users</span>
                <span className="flex gap-1 items-center text-xs text-gray-400"> <FaStar className='text-gray-400 text-md'/> 4.9 Rating</span>
            </div>

            </div>
        </div>

        </div>

        {/* <div className='bg-amber-100 p-5 w-10/12 mx-auto rounded-2xl '>
            <h1 className='text-3xl my-2 mx-auto'>Sign Up</h1>

            <form onSubmit={form.handleSubmit(handleSignup)}>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userName</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Name"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userEmail</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Email"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userPassword</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your password"
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>rePassword</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter the rePassword"
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userPhone</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Phone"
                            autoComplete="off"
                            type='tel'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button className='w-full my-2 bg-black text-white text-xl cursor-pointer'> Submit </Button>
            </form>
        </div> */}
        </>
    )
}
