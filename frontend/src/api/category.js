import webApiService from '../utils/axios'
export const category = {
    create: async (name) => {
        const response = await webApiService.post('api/app/category/', { name })
        return response.data
    }
}