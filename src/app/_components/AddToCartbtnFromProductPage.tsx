"use client";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { addProductToCart } from "../_actions/cart.Action";
import { toast } from "sonner";
import { cartContext } from "../_contexts/CartContextProvider";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartbtnFromProductPage({ productId }: { productId: string }) {
    
    const context = useContext(cartContext)

    if (!context) {
        throw new Error("No cartContext")
    }

const { setcartItemsNum, settotalPriceOfCart, setcartProducts, setcartId } = context

    async function handleAddToCartFromProductPage() {
        const res = await addProductToCart(productId);
        if (res.status == "success") {
        toast.success(res.message, {
            position: "top-center",
        });
        setcartItemsNum(res.numOfCartItems);
        settotalPriceOfCart(res.data.totalCartPrice);
        setcartProducts(res.data.products);
        if (res.cartId) setcartId(res.cartId)
        
        } else {
        toast.error(res.message, {
            position: "top-center",
        });
        }
    }
    
    return (
        <>
            <Button className="h-8 bg-emerald-500 hover:bg-emerald-600 transition duration-200 text-white rounded-lg 
                    flex items-center justify-center w-full md:w-1/2 cursor-pointer text-lg py-6 mt-5 font-medium " onClick={handleAddToCartFromProductPage} >
                <FaShoppingCart /> Add to Cart 
            </Button>
        </>
    );
}
