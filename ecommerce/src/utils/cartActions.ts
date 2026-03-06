export interface CartProduct {
  id: number
  name: string
  price: number
  quantity?: number
}

export function addProduct(cart: CartProduct[], product: CartProduct): CartProduct[] {
  const existing = cart.find(p => p.id === product.id)

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1
    return [...cart]
  }

  return [...cart, { ...product, quantity: 1 }]
}
