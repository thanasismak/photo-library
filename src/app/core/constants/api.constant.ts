export const API_BASE = 'https://picsum.photos';

// Example endpoints
export const API_ENDPOINTS = {
    RANDOM_IMAGE: (width = 200, height = 300) => `${API_BASE}/${width}/${height}`,
    PHOTO_LIST: (page = 1, limit = 24) => `${API_BASE}/v2/list?page=${page}&limit=${limit}`,
    PHOTO_BY_ID: (id: string, width = 1200, height = 800) => `${API_BASE}/id/${id}/${width}/${height}`,
};