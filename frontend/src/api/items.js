import webApiService from "../utils/axios"

export const item = {
    fetchItems: async ({page, count}) => {
        const items = await webApiService.get(`api/app/items/`)
        return items.data
    }
}