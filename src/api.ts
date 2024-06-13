import { ApiRequest, ApiResponse } from './types';

const api = async (options: ApiRequest): Promise<ApiResponse> => {
    console.log(options);

    const dataFetch = await fetch('/data.json', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const data: ApiResponse = await dataFetch.json();

    return data;
};

export default api;
