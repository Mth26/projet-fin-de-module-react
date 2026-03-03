import api from "./api"
import { Product, Category } from "../types"

export const productService = {
    async getAll(search?: string): Promise<Product[]> {
        const params = search ? { search } : {}
        const response = await api.get("/products", { params })
        return response.data
    },

    async getById(id: number): Promise<Product> {
        const response = await api.get(`/products/${id}`)
        return response.data
    },

    async getByCategory(categoryId: number): Promise<Product[]> {
        const response = await api.get(`/products?categoryId=${categoryId}`)
        return response.data
    },

    async getCategories(): Promise<Category[]> {
        const response = await api.get("/categories")
        return response.data
    }
}
