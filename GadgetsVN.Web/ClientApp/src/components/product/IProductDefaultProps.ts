import { IProduct } from "./IProduct";

export interface IProductDefaultProps{
    product: IProduct;
    onProductsChange: () => void;
}