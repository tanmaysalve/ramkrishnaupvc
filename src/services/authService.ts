import type { User } from '../types'
import { storage } from './storageService'

export const authService = {
  login(username: string, password: string): User | null {
    const user = storage.getUsers().find(u => u.username === username && u.password === password)
    if (user) storage.setCurrentUser(user)
    return user ?? null
  },
  logout() { storage.setCurrentUser(null) },
  currentUser() { return storage.getCurrentUser() }
}