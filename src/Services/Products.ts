import { ProductType } from "../types/productTypes";

export async function getAllProducts(): Promise<ProductType[] | undefined> {
    try {

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products",{
            cache : "force-cache",
        });
        const finalres = await res.json();
        return finalres.data;

    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id : string): Promise<ProductType | undefined> {
    try {

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
            cache : "force-cache"
        });
        const finalres = await res.json();
        return finalres.data;

    } catch (error) {
        console.log(error)
    }
}
