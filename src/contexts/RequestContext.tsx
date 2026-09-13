import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Customer, Document, Request, RequestActivity, Site } from '../types'
import { storage } from '../services/storageService'

interface Ctx {
  requests: Request[]; customers: Customer[]; sites: Site[]; activities: RequestActivity[]; documents: Document[]; refresh: () => void
}
const RequestContext = createContext<Ctx | null>(null)
export function RequestProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0)
  const refresh = () => setTick(x => x + 1)
  useEffect(() => {}, [tick])
  return <RequestContext.Provider value={{ requests: storage.getRequests(), customers: storage.getCustomers(), sites: storage.getSites(), activities: storage.getActivities(), documents: storage.getDocuments(), refresh }}>{children}</RequestContext.Provider>
}
export function useRequests() { const value = useContext(RequestContext); if (!value) throw new Error('useRequests must be used inside RequestProvider'); return value }