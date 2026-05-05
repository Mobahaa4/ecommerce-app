"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { loginDataType,  LoginSchema} from './Login.schema' 
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {signIn} from "next-auth/react"
import Image from 'next/image'
import grocery from "@/images/grocery.png"
import Link from 'next/link'
import { FaClock, FaFacebook, FaGoogle, FaLock, FaStar, FaTruck, FaUsers } from 'react-icons/fa6'

import { FaShieldAlt } from 'react-icons/fa'



export default function Page() {
    // const router = useRouter()

    const form = useForm( {
        defaultValues : {
            email : "",
            password : ""
        },
        resolver : zodResolver(LoginSchema)
    })

    async function handleLogin (values : loginDataType){

        signIn("credentials",{
            redirect : true,
            callbackUrl : "/",
            email: values.email,
            password: values.password    //important and it doesn't appear when ctrl+space (sending values with spread)
        })

    // const loginOk = await LoginAction(values)

    //     if(loginOk){
    //         toast.success("Login Sucessfully",{
    //             position : "top-center",
    //             richColors : true
    //         })
    //         router.push("/")
    //     } else {
    //             toast.error("Failed to Login",{
    //             position : "top-center",
    //             richColors : true
    //         })
    //     }


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

          <p className="text-3xl font-bold text-center mb-1">
            <span className="text-emerald-600">Fresh</span>
            <span className="text-gray-900">Cart</span>
          </p>
          <p className="text-md font-bold text-gray-900 text-center mb-1">Welcome Back!</p>
          <p className="text-xs text-gray-500 text-center mb-5">
            Sign in to continue your fresh shopping experience
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

          <form onSubmit={form.handleSubmit(handleLogin)}>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    className="px-3 py-3 text-lg"
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
                  <div className="flex justify-between items-center mb-1.5">
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                      Password
                    </FieldLabel>
                    <a href="#" className="text-sm text-emerald-600 hover:underline">Forgot Password?</a>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your password"
                    autoComplete="off"
                    type="password"
                    className="w-full px-3 py-2.5 text-lg text-gray-900 rounded-lg border outline-none transition-all duration-150 bg-white placeholder:text-gray-400"
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
              Log In
            </Button>
          </form>


          <p className="text-center text-md text-gray-500 mt-4">
            New to FreshCart?
            <Link href="/signup" className="text-emerald-600 font-medium hover:underline mx-1">Create an account</Link>
          </p>


          <div className="flex flex-wrap justify-center gap-4 mt-3.5">
            <span className="flex gap-1 items-center text-xs text-gray-400"> <FaLock className='text-gray-400 text-md'/> SSL Secured</span>
            <span className="flex gap-1 items-center text-xs text-gray-400"> <FaUsers className='text-gray-400 text-md'/> 50K+ Users</span>
            <span className="flex gap-1 items-center text-xs text-gray-400"> <FaStar className='text-gray-400 text-md'/> 4.9 Rating</span>
          </div>

        </div>
      </div>

    </div>
        </>
    )
}
