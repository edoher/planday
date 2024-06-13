export type GridElement = {
    title: string;
    description: string;
    imagePath: string;
};

export type ApiRequest = {
    per_page?: number;
};

export type ApiResponse = GridElement[];
