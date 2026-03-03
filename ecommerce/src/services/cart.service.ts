import api from "./api"
import { Cart } from "../types"

export const cartService = {
    async getCart(userId: number): Promise<Cart> {
        const response = await api.get(`/carts/user/${userId}`)
        return response.data
    },

    async addProduct(cartId: number, productId: number): Promise<Cart> {
        const response = await api.post(`/carts/${cartId}/products/${productId}`)
        return response.data
    },

    async removeProduct(cartId: number, productId: number): Promise<Cart> {
        const response = await api.delete(`/carts/${cartId}/products/${productId}`)
        return response.data
    },

    async updateQuantity(cartId: number, productId: number, quantity: number): Promise<Cart> {
        const response = await api.put(`/carts/${cartId}/products/${productId}`, { quantity })
        return response.data
    }
}
