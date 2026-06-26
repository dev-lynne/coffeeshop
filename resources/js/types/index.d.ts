export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    slug: string;
    image_path: string | null;
    stock: number;
    is_active: boolean;
    is_featured: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
