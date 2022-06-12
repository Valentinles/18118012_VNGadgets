import { Urls, Cart } from '../configs/ApplicationConstants';
import identityService from './IdentityService';

export class CartService {
    public async getMyCartItems() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Cart.MyCart}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async getCartItemsCount() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Cart.CartCount}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async addItem(product: object) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
            body: JSON.stringify(product)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Cart.AddItem}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async removeItem(product: object) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
            body: JSON.stringify(product)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Cart.RemoveItem}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async IsItemInCart(id: number) {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            }
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Cart.IsItemInCart}${id}`, headers);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }
}
const cartService = new CartService();

export default cartService;