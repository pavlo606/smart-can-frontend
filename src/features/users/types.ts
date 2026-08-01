const UserRole = {
  User: 'User',
  Admin: 'Admin',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type SortOrder = 'asc' | 'desc'

export interface UsersQuery {
  search: string
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}

export interface UsersResponse {
  items: User[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}
