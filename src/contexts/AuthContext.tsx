import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { authService } from '../services/authService'

interface AuthContextValue { user: User | null; login: (u: string, p: string) => boolean; logout: () => void }
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.currentUser())
  const login = (u: string, p: string) => { const next = authService.login(u,p); setUser(next); return !!next }
  const logout = () => { authService.logout(); setUser(null) }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside AuthProvider'); return value }