import { IProduct } from '../product/IProduct'

export interface IOrder {
    id: number;
    quantity: number;
    createdOn: Date;
    isFinished: boolean;
    user: any;
    product: IProduct;
}