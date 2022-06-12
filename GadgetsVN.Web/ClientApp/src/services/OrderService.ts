import { Order, Urls } from '../configs/ApplicationConstants';
import identityService from './IdentityService';

export class OrderService {
    public async getMyOrders() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Order.MyOrders}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async getAllOrders() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Order.AllOrders}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }

    public async createOrder(order: any) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
            body: JSON.stringify(order)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Order.CreateOrder}`, settings);
            return fetchResponse.status;
        } catch (e) {
            return e;
        }
    }

    public async exportUserOrders() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            return await fetch(`${Urls.Default}${Order.ExportUserOrders}`, headers);
        } catch (e) {
            return e;
        }
    }

    public async exportAllOrders() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            return await fetch(`${Urls.Default}${Order.ExportAllOrders}`, headers);
        } catch (e) {
            return e;
        }
    }
}
const orderService = new OrderService();

export default orderService;