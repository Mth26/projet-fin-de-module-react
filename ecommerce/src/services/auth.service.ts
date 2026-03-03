import api from "./api"
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from "../types"

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post("/users/signin", credentials)
        return response.data
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        await api.post("/users", credentials)
        // auto login apres inscription
        const loginResponse = await api.post("/users/signin", {
            emailAddress: credentials.emailAddress,
            password: credentials.password
        })
        return loginResponse.data
    },

    async getProfile(userId: number): Promise<User> {
        const response = await api.get(`/users/${userId}`)
        return response.data
    },

    async updateProfile(userId: number, data: Partial<User>): Promise<User> {
        const response = await api.put(`/users/${userId}`, data)
        return response.data
    },

    logout(): void {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    },

    getStoredUser(): User | null {
        const user = localStorage.getItem("user")
        return user ? JSON.parse(user) : null
    },

    getStoredToken(): string | null {
        return localStorage.getItem("token")
    },

    isAuthenticated(): boolean {
        return !!this.getStoredToken()
    }
}
