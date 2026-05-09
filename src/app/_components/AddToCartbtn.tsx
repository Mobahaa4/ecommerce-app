"use client";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { addProductToCart } from "../_actions/cart.Action";
import { toast } from "sonner";
import { cartContext } from "../_contexts/CartContextProvider";

export default function AddToCartbtn({ productId }: { productId: string }) {
  
  const context = useContext(cartContext)

  if (!context) {
    throw new Error("No cartContext")
  }

const { setcartItemsNum, settotalPriceOfCart, setcartProducts, setcartId } = context

  async function handleAddToCart() {
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
      <Button
        onClick={handleAddToCart}
        className="text-white bg-emerald-600 h-10 w-10 text-3xl font-extrabold rounded-full text-center cursor-pointer"
      >
        +
      </Button>
    </>
  );
}
