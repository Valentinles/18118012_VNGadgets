export interface IProductCreate {
    brand: string;
    deviceModel: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: string;
    warranty: number;
    quantity: number;
}