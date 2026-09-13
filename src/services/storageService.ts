import type { Customer, Document, Request, RequestActivity, Site, User } from '../types'

const keys = {
  users: 'rk_users', customers: 'rk_customers', sites: 'rk_sites', requests: 'rk_requests',
  activities: 'rk_activities', documents: 'rk_documents', currentUser: 'rk_current_user', initialized: 'rk_initialized',
}

function read<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) as T : fallback
}
function write<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)) }

export const storage = {
  keys,
  getUsers: () => read<User[]>(keys.users, []),
  getCustomers: () => read<Customer[]>(keys.customers, []),
  getSites: () => read<Site[]>(keys.sites, []),
  getRequests: () => read<Request[]>(keys.requests, []),
  getActivities: () => read<RequestActivity[]>(keys.activities, []),
  getDocuments: () => read<Document[]>(keys.documents, []),
  getCurrentUser: () => read<User | null>(keys.currentUser, null),
  setCurrentUser: (u: User | null) => u ? write(keys.currentUser, u) : localStorage.removeItem(keys.currentUser),
  saveUsers: (v: User[]) => write(keys.users, v),
  saveCustomers: (v: Customer[]) => write(keys.customers, v),
  saveSites: (v: Site[]) => write(keys.sites, v),
  saveRequests: (v: Request[]) => write(keys.requests, v),
  saveActivities: (v: RequestActivity[]) => write(keys.activities, v),
  saveDocuments: (v: Document[]) => write(keys.documents, v),
  nextRequestNumber: () => {
    const max = storage.getRequests().reduce((m, r) => Math.max(m, Number(r.requestNumber.split('-').at(-1)) || 0), 0)
    return `RK-${new Date().getFullYear()}-${String(max + 1).padStart(5, '0')}`
  }
}