import { Urls, Wishlist } from '../configs/ApplicationConstants';
import identityService from './IdentityService';

export class WishlistService {
    public async getMyWishlistItems() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Wishlist.MyWishlist}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async getWishlistItemsCount() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Wishlist.WishlistCount}`, headers);
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
            const fetchResponse = await fetch(`${Urls.Default}${Wishlist.AddItem}`, settings);
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
            const fetchResponse = await fetch(`${Urls.Default}${Wishlist.RemoveItem}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async isWishlisted(id: number) {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            }
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Wishlist.IsWishlisted}${id}`, headers);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }
}
const wishlistService = new WishlistService();

export default wishlistService;