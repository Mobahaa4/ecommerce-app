import { ProductType } from "./productTypes"

export interface cartResType {
    status : string,
    message : string,
    numOfCartItems : number,
    cartId : string,
    data : data
}
export interface data {
    cartOwner : string,
    createdAt : string,
    updatedAt : string,
    totalCartPrice : number,
    products : cartItemType[]
}
export interface cartItemType {
    count : number,
    price : number,
    product : ProductType
}

