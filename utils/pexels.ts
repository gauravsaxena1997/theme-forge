// src/utils/pexels.ts
import { PEXELS_API_KEY, PEXELS_API_URL } from '../constants';

export const fetchPexelsImages = async (query: string, count: number): Promise<string[]> => {
    try {
        const response = await fetch(`${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=${count}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        if (!response.ok) {
            console.error('Failed to fetch from Pexels API');
            return [];
        }
        const data = await response.json();
        return data.photos.map((photo: any) => photo.src.large);
    } catch (error) {
        console.error('Error fetching Pexels images:', error);
        return [];
    }
};
