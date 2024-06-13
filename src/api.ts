import { ApiRequest, ApiResponse, GridElement } from './types';

const api = async ({ page, per_page }: ApiRequest): Promise<ApiResponse> => {
    const dataFetch = await fetch('/data.json', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const data: GridElement[] = await dataFetch.json();
    const count = data.length;

    let processedData: GridElement[] = [];

    if (page && per_page) {
        const start = page * per_page - 1;
        const end = start + per_page;

        processedData = data.slice(start, end);
    }

    return { data: processedData, count };
};

export default api;
