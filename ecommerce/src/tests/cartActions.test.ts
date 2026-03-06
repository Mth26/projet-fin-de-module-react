import { describe, it, expect } from 'vitest'
import { addProduct, CartProduct } from '../utils/cartActions'

describe('addProduct', () => {
  it('ajoute un produit au panier', () => {
    const panier: CartProduct[] = []
    const produit: CartProduct = { id: 1, name: 'iPhone', price: 999 }
    const resultat = addProduct(panier, produit)
    expect(resultat).toHaveLength(1)
  })

  it('incremente quantité si produit deja present', () => {
    const panier: CartProduct[] = [{ id: 1, name: 'iPhone', price: 999, quantity: 1 }]
    const resultat = addProduct(panier, { id: 1, name: 'iPhone', price: 999 })
    expect(resultat[0].quantity).toBe(2)
  })
})
