import { describe, it, expect } from 'vitest'
import { calculateCartTotal, CartItem } from '../utils/cart'

describe('calculateCartTotal', () => {
  it('calcule le total pour plusieurs produits', () => {
    const panier: CartItem[] = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ]
    const resultat = calculateCartTotal(panier)
    expect(resultat).toBe(35)
  })

  it('retourne 0 pour un panier vide', () => {
    const panier: CartItem[] = []
    expect(calculateCartTotal(panier)).toBe(0)
  })

  it('quantité multiple', () => {
    const panier: CartItem[] = [{ price: 25, quantity: 4 }]
    expect(calculateCartTotal(panier)).toBe(100)
  })
})