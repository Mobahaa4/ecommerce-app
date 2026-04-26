import { CategoryType } from "@/types/productTypes";

export async function getAllCategories(): Promise<CategoryType[] | undefined> {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const finalres = await res.json();
        return finalres.data;

    } catch (error) {
        console.log(error)
    }
}