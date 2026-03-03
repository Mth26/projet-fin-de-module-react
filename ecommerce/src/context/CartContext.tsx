import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { cartService } from "../services/cart.service"

// liste des stylos
const stylosData = [
    { id: 1, name: "Stylo plume Roméo et Juliette", category: "Stylos Plume", price: 890, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 2, name: "Stylo plume Château de Versailles", category: "Stylos de Collection", price: 1250, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 3, name: "Stylo bille Writers Edition Grimm", category: "Stylos Bille", price: 650, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 4, name: "Feutre Fin StarWalker PolarGreen", category: "Feutres Fins", price: 420, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 5, name: "Stylo plume Meisterstück Gold", category: "Stylos Plume", price: 980, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 6, name: "Stylo bille Montblanc Heritage", category: "Stylos Bille", price: 550, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 7, name: "Stylo plume Bohème Bleu", category: "Stylos Plume", price: 1100, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 8, name: "Feutre Fin Starwalker Midnight", category: "Feutres Fins", price: 380, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 9, name: "Stylo plume Leonardo da Vinci", category: "Stylos de Collection", price: 1450, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
]

interface LocalCartItem {
    id: number
    productId: number
    quantity: number
    product: {
        id: number
        name: string
        price: number
        image: string
    }
}

interface CartContextType {
    items: LocalCartItem[]
    cartId: number | null
    itemCount: number
    total: number
    isLoading: boolean
    addToCart: (productId: number) => Promise<void>
    removeFromCart: (productId: number) => Promise<void>
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth()
    const [items, setItems] = useState<LocalCartItem[]>([])
    const [cartId, setCartId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // recup le panier quand on se connecte
    useEffect(() => {
        const loadCart = async () => {
            if (isAuthenticated && user) {
                setIsLoading(true)
                try {
                    const cart = await cartService.getCart(user.id)
                    setCartId(cart.id)

                    const cartItems: LocalCartItem[] = (cart.Products || [])
                        .map(item => {
                            const stylo = stylosData.find(s => s.id === item.ProductId) || stylosData[0]
                            return {
                                id: item.id,
                                productId: item.ProductId,
                                quantity: item.quantity,
                                product: {
                                    id: stylo.id,
                                    name: stylo.name,
                                    price: stylo.price,
                                    image: stylo.image
                                }
                            }
                        })
                        .filter(item => item.productId <= 9)

                    setItems(cartItems)
                } catch (error) {
                    console.error("erreur panier:", error)
                    setItems([])
                } finally {
                    setIsLoading(false)
                }
            } else {
                setItems([])
                setCartId(null)
            }
        }

        loadCart()
    }, [isAuthenticated, user])

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

    const addToCart = async (productId: number) => {
        if (!cartId) {
            throw new Error("Panier non initialisé")
        }

        setIsLoading(true)

        try {
            await cartService.addProduct(cartId, productId)

            const stylo = stylosData.find(s => s.id === productId)
            if (!stylo) {
                throw new Error("Produit non trouvé")
            }

            setItems(currentItems => {
                const existingItem = currentItems.find(item => item.productId === productId)

                if (existingItem) {
                    return currentItems.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                } else {
                    return [...currentItems, {
                        id: Date.now(),
                        productId: stylo.id,
                        quantity: 1,
                        product: {
                            id: stylo.id,
                            name: stylo.name,
                            price: stylo.price,
                            image: stylo.image
                        }
                    }]
                }
            })
        } catch (error) {
            console.error("erreur ajout:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const removeFromCart = async (productId: number) => {
        if (!cartId) return

        setIsLoading(true)

        try {
            await cartService.removeProduct(cartId, productId)
            setItems(currentItems => currentItems.filter(item => item.productId !== productId))
        } catch (error) {
            console.error("erreur suppression:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider value={{
            items,
            cartId,
            itemCount,
            total,
            isLoading,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
