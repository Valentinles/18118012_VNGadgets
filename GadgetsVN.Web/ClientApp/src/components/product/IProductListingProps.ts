import { IProduct } from "./IProduct";

export interface IProductListingProps {
    onWishlistCountChange: () => void;
    onCartCountChange: () => void;
    onIsLoggedIn: () => boolean;
    onIsAdmin: () => boolean;
    onSearch: () => string;
    onProductsChange: () => void;
    onWishlistItemsChange: () => void;
    onCartItemsChange: () => void;
    products: IProduct[];
}