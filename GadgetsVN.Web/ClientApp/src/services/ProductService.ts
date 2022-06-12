import { Urls, Product } from '../configs/ApplicationConstants';
import identityService from './IdentityService';

export class ProductService {
    public async createProduct(product: object) {
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
            const fetchResponse = await fetch(`${Urls.Default}${Product.Create}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async getProdcuts() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Product.GetAll}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async deleteProduct(id: number) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
            body: JSON.stringify(id)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Product.Delete}${id}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async updateProduct(product: any) {
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
            const fetchResponse = await fetch(`${Urls.Default}${Product.Update}${product.id}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async getSearchedProducts(searchTerm: string) {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Product.Search}${searchTerm}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async getFilteredProducts(brand: string, category: string, priceFrom: number, priceTo: number, priceSort: string) {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(
                `${Urls.Default}${Product.Filter}brand=${brand}&category=${category}&priceFrom=${priceFrom}&priceTo=${priceTo}&priceSort=${priceSort}`,
                headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }
}
const productService = new ProductService();

export default productService;