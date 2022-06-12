import { Urls, Category } from '../configs/ApplicationConstants';
import identityService from './IdentityService';

export class CategoryService {
    public async getCategories() {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + identityService.getStoredToken()
            },
        };
        try {
            const fetchResponse = await fetch(`${Urls.Default}${Category.GetAll}`, headers);
            return await fetchResponse.json();
        } catch (e) {
            return e;
        }
    }
}
const categoryService = new CategoryService();

export default categoryService;