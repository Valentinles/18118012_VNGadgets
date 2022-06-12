import { IProduct } from "../product/IProduct";

export interface IMyWishlist {
    onWishlistCountChange: () => void;
    onIsLoggedIn: () => boolean;
    onCartCountChange: () => void;
    onIsAdmin: () => boolean;
    onProductsChange: () => void;
    wishlistedItems: IProduct[];
    onCartItemsChange: () => void;
}