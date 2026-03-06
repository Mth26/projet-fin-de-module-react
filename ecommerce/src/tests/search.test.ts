import { describe, it, expect } from 'vitest'
import { filterProducts, Product } from '../utils/search'

describe('filterProducts', () => {
  const produits: Product[] = [
    { id: 1, name: 'iPhone 15', price: 999 },
    { id: 2, name: 'Samsung Galaxy', price: 899 },
    { id: 3, name: 'iPad Pro', price: 1099 }
  ]

  it('recherche simple', () => {
    const resultat = filterProducts(produits, 'iPhone')
    expect(resultat).toHaveLength(1)
  })

  it('insensible a la casse', () => {
    const resultat = filterProducts(produits, 'IPHONE')
    expect(resultat[0].name).toBe('iPhone 15')
  })

  it('retourne vide si pas de resultat', () => {
    expect(filterProducts(produits, 'Nokia')).toHaveLength(0)
  })
})
