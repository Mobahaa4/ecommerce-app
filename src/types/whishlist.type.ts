import { BrandType, CategoryType } from "./productTypes"

export interface UserWhishlistResType{
    status: string,
    count : number,
    data  : whishlistItemType[]
}
export interface whishlistItemType{
    brand : BrandType,
    category : CategoryType,
    imageCover : string,
    price : number,
    title : string,
    _id : string
}