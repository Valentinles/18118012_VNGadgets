import { Urls, Identity } from '../configs/ApplicationConstants';
import { AdminRole } from '../configs/ApplicationConstants';

export class IdentityService {
    public async login(credentials: object) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Identity.Login}`, settings);
            const data = await fetchResponse.json();
            console.log(data);
            return data;
        } catch (e) {
            return e;
        }
    }

    public async register(credentials: object) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Identity.Register}`, settings);
            const data = await fetchResponse.json();
            console.log(data);
            return data;
        } catch (e) {
            return e;
        }
    }

    public storeToken(token: string) {
        localStorage.setItem('token', token);
    }
    
    public getStoredToken() {
        return localStorage.getItem('token');
    }

    public removeToken() {
        localStorage.removeItem('token');
    }

    public storeAdminRole(roles: string[]) {
        if(roles.indexOf(AdminRole) != -1) {
            localStorage.setItem('role', AdminRole);
        }
    }
    
    public getUserAdminRole() {
        return localStorage.getItem('role');
    }

    public removeUserAdminRole() {
        localStorage.removeItem('role');
    }
}
const identityService = new IdentityService();

export default identityService;