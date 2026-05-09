"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { shippingAddressType } from '@/types/orders.type'
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createCashOrder, createVisaOrder } from '../_actions/orders.Action'
import { cartContext } from '../_contexts/CartContextProvider'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type FormValues = {
    details: string
    phone: string
    city: string
    postalCode: string
    type: "cash" | "visa"
}
export default  function Page() {

        const context = useContext(cartContext)
        const router = useRouter()
    
        if (!context) {
        throw new Error("cartContext must be used inside provider")
        }
        

        const {cartId, setcartId, cartItemsNum, setcartItemsNum, settotalPriceOfCart, setcartProducts} = context

        const form = useForm<FormValues>( {
            defaultValues : {
                details: "",
                phone: "",
                city: "",
                postalCode: "",
                type : "cash"
            }
        })

        async function handlePayment(values : FormValues){
            if (!cartId || cartItemsNum <= 0) {
                toast.error("Your cart is empty. Add products before checkout.", { position: "top-center" })
                router.push("/cart")
                return
            }

            const userData : shippingAddressType = {
                shippingAddress : {
                    details : values.details,
                    phone : values.phone,
                    city : values.city,
                    postalCode : values.postalCode,
                }
            }

            if(values.type == "cash"){
                const cashRes = await createCashOrder(cartId, userData)
                if(cashRes.status == "success"){
                    setcartItemsNum(0)
                    settotalPriceOfCart(0)
                    setcartProducts([])
                    setcartId("")
                    toast.success(cashRes.message,{
                    position : "top-center"
                    })
                }else{
                    toast.error(cashRes.message,{
                    position : "top-center"
                    })
                }
            } else if(values.type == "visa"){
                const visaRes = await createVisaOrder(cartId, userData)
                const checkoutUrl = visaRes?.session?.url
                if (!checkoutUrl) {
                    toast.error(visaRes?.message ?? "Checkout failed. Please try again.", { position: "top-center" })
                    router.push("/cart")
                    return
                }
                window.open(checkoutUrl, "_blank")
            }

        }
    return (
        <>
        <div className='md:h-screen p-5 md:w-6/12 mx-auto rounded-xl '>
            <h1 className='text-5xl text-center my-2 mx-auto'>Payment</h1>
            <form onSubmit={form.handleSubmit(handlePayment)}>

                <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>Address Details</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Address Details"
                            autoComplete="off"
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
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Phone"
                            autoComplete="off"

                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>City</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your City"
                            autoComplete="off"

                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="postalCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Postal Code"
                            autoComplete="off"

                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                
                <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>Payment Method</FieldLabel>

                            <div className="flex-col gap-4">

                                    <label className="flex my-2 w-full p-1.5 border border-black items-center gap-2 rounded-lg">
                                    <input
                                        type="radio"
                                        value="cash"
                                        checked={field.value === "cash"}
                                        onChange={field.onChange}
                                    />
                                    Cash on Delivery
                                    </label>

                                    <label className="flex w-full mt-2 p-1.5 border border-black items-center gap-2 rounded-lg">
                                    <input
                                        type="radio"
                                        value="visa"
                                        checked={field.value === "visa"}
                                        onChange={field.onChange}
                                    />
                                    Pay Online(Visa)
                                    </label>

                            </div>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                
                <Button className='w-full p-3 my-2 bg-blue-600 text-white text-xl cursor-pointer'> Pay Now </Button>
            </form>
        </div>
        </>
    )
}
