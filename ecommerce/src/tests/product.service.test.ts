import { describe, it, expect, vi } from 'vitest'
import { productService } from '../services/product.service'
import api from '../services/api'

vi.mock('../services/api')

describe('productService', () => {
  it('getAll retourne des produits', async () => {
    const fakeProduits = [
      { id: 1, name: 'Produit 1', price: 10 },
      { id: 2, name: 'Produit 2', price: 20 }
    ]
    vi.mocked(api.get).mockResolvedValue({ data: fakeProduits })

    const resultat = await productService.getAll()
    expect(resultat).toEqual(fakeProduits)
  })

  it('getById retourne un produit', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { id: 1, name: 'Test', price: 10 } })
    const resultat = await productService.getById(1)
    expect(resultat.id).toBe(1)
  })
})
