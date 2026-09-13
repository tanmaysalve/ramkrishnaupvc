import type { ActivityType, Document, Request, RequestActivity } from '../types'
import { storage } from './storageService'

export const requestService = {
  create(request: Omit<Request, 'id'|'requestNumber'|'createdAt'|'updatedAt'>, userId: string) {
    const now = new Date().toISOString()
    const created: Request = { ...request, id: crypto.randomUUID(), requestNumber: storage.nextRequestNumber(), createdAt: now, updatedAt: now }
    storage.saveRequests([...storage.getRequests(), created])
    requestService.activity(created.id, userId, 'REQUEST_CREATED', 'created this request.')
    return created
  },
  update(id: string, patch: Partial<Request>, userId: string, description = 'updated request details.') {
    const list = storage.getRequests(); const old = list.find(r => r.id === id); if (!old) return null
    const updated = { ...old, ...patch, updatedAt: new Date().toISOString() }
    storage.saveRequests(list.map(r => r.id === id ? updated : r))
    requestService.activity(id, userId, 'REQUEST_UPDATED', description)
    return updated
  },
  status(id: string, status: Request['status'], userId: string) {
    const r = storage.getRequests().find(x => x.id === id); if (!r) return null
    const updated = { ...r, status, updatedAt: new Date().toISOString() }
    storage.saveRequests(storage.getRequests().map(x => x.id === id ? updated : x))
    requestService.activity(id, userId, 'STATUS_CHANGED', `changed status: ${r.status.replaceAll('_',' ')} → ${status.replaceAll('_',' ')}`, r.status, status)
    return updated
  },
  assign(id: string, assignedTo: string, userId: string) {
    const r = storage.getRequests().find(x => x.id === id); if (!r) return null
    storage.saveRequests(storage.getRequests().map(x => x.id === id ? { ...x, assignedTo, updatedAt: new Date().toISOString() } : x))
    const target = storage.getUsers().find(u => u.id === assignedTo)?.displayName ?? assignedTo
    const previous = storage.getUsers().find(u => u.id === r.assignedTo)?.displayName ?? 'Unassigned'
    requestService.activity(id, userId, r.assignedTo ? 'REASSIGNED' : 'ASSIGNED', `${r.assignedTo ? 'reassigned' : 'assigned'} this request: ${previous} → ${target}`)
  },
  activity(requestId: string, userId: string, type: ActivityType, description: string, oldValue?: string, newValue?: string, documentId?: string) {
    const a: RequestActivity = { id: crypto.randomUUID(), requestId, userId, type, description, oldValue, newValue, documentId, createdAt: new Date().toISOString() }
    storage.saveActivities([...storage.getActivities(), a])
    const r = storage.getRequests().find(x => x.id === requestId)
    if (r) storage.saveRequests(storage.getRequests().map(x => x.id === requestId ? { ...x, updatedAt: a.createdAt } : x))
    return a
  },
  comment(requestId: string, userId: string, text: string) { return requestService.activity(requestId, userId, 'COMMENT', `commented: “${text}”`) },
  addDocument(requestId: string, userId: string, file: File) {
    const doc: Document = { id: crypto.randomUUID(), requestId, fileName: file.name, contentType: file.type || 'application/octet-stream', size: file.size, uploadedBy: userId, uploadedAt: new Date().toISOString() }
    storage.saveDocuments([...storage.getDocuments(), doc])
    requestService.activity(requestId, userId, 'DOCUMENT_UPLOADED', `uploaded ${file.name}`, undefined, undefined, doc.id)
    return doc
  },
  deleteDocument(id: string, userId: string) {
    const doc = storage.getDocuments().find(d => d.id === id); if (!doc) return
    storage.saveDocuments(storage.getDocuments().filter(d => d.id !== id))
    requestService.activity(doc.requestId, userId, 'REQUEST_UPDATED', `removed document ${doc.fileName}`)
  }
}