export interface Product {
  id: number
  name: string
  price: number
}

export function filterProducts(products: Product[], query: string): Product[] {
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}
