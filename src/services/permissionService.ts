import type { Request, User } from '../types'

export const permissionService = {
  canViewRequest(user: User, request: Request) {
    return user.role === 'ADMIN' || request.createdBy === user.id || request.assignedTo === user.id
  },
  canAssign(user: User) { return user.role === 'ADMIN' },
  canManageUsers(user: User) { return user.role === 'ADMIN' },
}