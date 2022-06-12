import { IProduct } from "./IProduct";

export interface IProductCardProps {
    product: IProduct;
    onWishlistCountChange: () => void;
    onCartCountChange: () => void;
    onIsLoggedIn: () => boolean;
    onIsAdmin: () => boolean;
    onProductsChange: () => void;
    onWishlistItemsChange: () => void;
    onCartItemsChange: () => void;
}