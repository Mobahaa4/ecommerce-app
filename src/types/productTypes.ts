export interface ProductType {
    _id : string,
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
    _id : string,
    name : string,
    slug : string,
    image : string
}
export interface BrandType {
    _id : string,
    name : string,
    slug : string,
    image : string
}