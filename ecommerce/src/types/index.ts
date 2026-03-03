export interface User {
    id: number
    emailAddress: string
    firstName: string
    lastName: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

export interface LoginCredentials {
    emailAddress: string
    password: string
}

export interface RegisterCredentials {
    emailAddress: string
    password: string
    firstName: string
    lastName: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface Product {
    id: number
    name: string
    description: string
    price: number
    stock: number
    CategoryId: number
    Images?: ProductImage[]
    Category?: Category
    createdAt?: string
    updatedAt?: string
}

export interface ProductImage {
    id: number
    link: string
    ProductId: number
}

export interface Category {
    id: number
    name: string
    description?: string
}

export interface CartItem {
    id: number
    quantity: number
    ProductId: number
    CartId: number
    Product: Product
}

export interface Cart {
    id: number
    UserId: number
    Products: CartItem[]
    total?: number
}

export interface ApiError {
    message: string
    status?: number
}
