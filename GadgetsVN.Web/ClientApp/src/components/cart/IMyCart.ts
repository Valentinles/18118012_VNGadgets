import { IProduct } from "../product/IProduct";

export interface IMyCart {
    onWishlistCountChange: () => void;
    onIsLoggedIn: () => boolean;
    onCartCountChange: () => void;
    onIsAdmin: () => boolean;
    onProductsChange: () => void;
    cartItems: any[];
    onCartItemsChange: () => void;
}