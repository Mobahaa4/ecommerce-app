import { BrandTypeRes } from "@/types/brand.type"

export async function getAllBrands() : Promise<BrandTypeRes>{
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
    const finalRes = await res.json()
    return finalRes
}