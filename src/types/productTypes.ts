export interface ProductType {
    id : string,
    title : string,
    imageCover : string,
    description : string,
    price : number,
    images : string[],
    ratingsAverage : number,
    priceAfterDiscount? : number,
    category : CategoryType,
    brand : BrandType,
}

export interface CategoryType {
    id : string,
    name : string,
    slug : string,
    image : string
}
export interface BrandType {
    id : string,
    name : string,
    slug : string,
    image : string
}