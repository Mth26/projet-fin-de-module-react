import { describe, it, expect } from 'vitest'
import { authService } from '../services/auth.service'

describe('authService.isAuthenticated', () => {
  it('retourne true si token existe', () => {
    localStorage.setItem('token', 'test-token')
    expect(authService.isAuthenticated()).toBe(true)
    localStorage.clear()
  })

  it('retourne false si pas de token', () => {
    localStorage.clear()
    expect(authService.isAuthenticated()).toBe(false)
  })
})
