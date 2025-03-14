export interface Product {
    title:string,
    imageCover:string,
    price:number,
    id:string,
    ratingsAverage:number,
    category: Category,
    description?:string,
    images?:string[],
}

interface Category{
    _id:string,
    name:string,
}
