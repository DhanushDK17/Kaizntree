import webApiService from '../utils/axios'
export const auth = {
    register: async (userDetails) => {
        await webApiService.post('/auth/register/', userDetails)
    },
    login: async (userDetails) => {
        await webApiService.post('/auth/token/', userDetails)
    },
    checkAuth: async () => {
        try {
            const response = await fetch('/api/check-session/', { credentials: 'include' });
            if (response.ok) {
              const data = await response.json();
              return data.isAuthenticated;
            }
            return false;
        } catch (error) {
            console.error('Error checking authentication', error);
            return false;
        }
    }
}