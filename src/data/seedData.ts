import type { Customer, Request, RequestActivity, Site, User } from '../types'
import { storage } from '../services/storageService'

const ago = (days: number, hours = 0) => new Date(Date.now() - (days * 86400000 + hours * 3600000)).toISOString()

export function initializeDemoData() {
  if (localStorage.getItem(storage.keys.initialized)) return
  const users: User[] = [
    { id: 'u1', username: 'admin', password: 'Admin@123', displayName: 'Admin', role: 'ADMIN' },
    { id: 'u2', username: 'sales1', password: 'Sales@123', displayName: 'Sales 1', role: 'SALES_USER' },
    { id: 'u3', username: 'sales2', password: 'Sales@123', displayName: 'Sales 2', role: 'SALES_USER' },
    { id: 'u4', username: 'sales3', password: 'Sales@123', displayName: 'Sales 3', role: 'SALES_USER' },
  ]
  const customers: Customer[] = [
    { id: 'c1', name: 'Rahul Sharma', customerType: 'INDIVIDUAL', phone: '+91 98201 44521', email: 'rahul.sharma@example.com', city: 'Mumbai', state: 'Maharashtra', createdAt: ago(40) },
    { id: 'c2', name: 'ABC Resorts', companyName: 'ABC Resorts Pvt Ltd', customerType: 'RESORT', phone: '+91 98202 11789', email: 'projects@abcrestorts.example', city: 'Alibaug', state: 'Maharashtra', createdAt: ago(36) },
    { id: 'c3', name: 'Design Studio Mumbai', companyName: 'Design Studio Mumbai', customerType: 'INTERIOR_DESIGNER', phone: '+91 98190 23145', email: 'studio@example.com', city: 'Mumbai', state: 'Maharashtra', createdAt: ago(30) },
    { id: 'c4', name: 'XYZ Commercial Pvt Ltd', companyName: 'XYZ Commercial Pvt Ltd', customerType: 'COMMERCIAL', phone: '+91 98921 55331', city: 'Thane', state: 'Maharashtra', createdAt: ago(27) },
    { id: 'c5', name: 'Mehta Builders', companyName: 'Mehta Builders', customerType: 'BUILDER', phone: '+91 98195 90871', email: 'office@example.com', city: 'Navi Mumbai', state: 'Maharashtra', createdAt: ago(22) },
    { id: 'c6', name: 'Neha Kapoor', customerType: 'INDIVIDUAL', phone: '+91 98330 11229', city: 'Mumbai', state: 'Maharashtra', createdAt: ago(18) },
    { id: 'c7', name: 'Harbour View Contractors', customerType: 'CONTRACTOR', phone: '+91 98765 22018', city: 'Panvel', state: 'Maharashtra', createdAt: ago(15) },
    { id: 'c8', name: 'Green Valley Homes', companyName: 'Green Valley Homes', customerType: 'COMMERCIAL', phone: '+91 99012 33441', city: 'Pune', state: 'Maharashtra', createdAt: ago(10) },
  ]
  const sites: Site[] = [
    { id: 's1', customerId: 'c2', name: 'Alibaug Resort', address: 'Coastal Road', city: 'Alibaug', state: 'Maharashtra', contactPerson: 'Amit Shah', contactPhone: '+91 98200 10001', createdAt: ago(35) },
    { id: 's2', customerId: 'c3', name: 'Bandra Residence', address: 'Bandra West', city: 'Mumbai', state: 'Maharashtra', createdAt: ago(29) },
    { id: 's3', customerId: 'c4', name: 'Thane Office', address: 'Ghodbunder Road', city: 'Thane', state: 'Maharashtra', createdAt: ago(25) },
    { id: 's4', customerId: 'c5', name: 'Panvel Villas', address: 'New Panvel', city: 'Panvel', state: 'Maharashtra', createdAt: ago(20) },
    { id: 's5', customerId: 'c8', name: 'Pune Clubhouse', address: 'Baner', city: 'Pune', state: 'Maharashtra', createdAt: ago(9) },
  ]
  const descriptions = [
    'uPVC sliding windows for a new residence.',
    'uPVC windows and doors for resort rooms and common areas.',
    'Full-height uPVC glazing requirement for a residential project.',
    'Office partition and window requirement.',
    'uPVC doors and casement windows for villas.',
    'Service visit for existing window hardware.',
    'Quotation request for premium sliding windows.',
    'Replacement of selected glass window units.',
    'Commercial project window package requirement.',
    'Site measurement and installation requirement.',
    'New enquiry for low-maintenance uPVC doors.',
    'Modification request for existing sliding track.',
    'Window requirement for clubhouse renovation.',
    'Follow-up on previously discussed project.',
    'uPVC casement windows for a sea-facing residence.',
    'Installation coordination for confirmed order.',
    'Complaint regarding window alignment.',
    'New commercial enquiry from Google Ads.',
    'Interior designer enquiry for multiple openings.',
    'Builder requirement for phased window supply.',
    'New homeowner enquiry via WhatsApp.',
    'Service request for door locking hardware.',
    'Site visit requested for a villa project.',
    'Requirements discussion for office renovation.',
  ]
  const statusList = ['NEW','CONTACTED','SITE_VISIT','REQUIREMENTS','FOLLOW_UP','QUOTATION_PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','NEW','CONTACTED','SITE_VISIT','REQUIREMENTS','FOLLOW_UP','CONFIRMED','IN_PROGRESS','COMPLETED','NEW','SITE_VISIT','QUOTATION_PENDING','NEW','CONTACTED','SITE_VISIT','REQUIREMENTS'] as const
  const sourceList = ['GOOGLE_ADS','WHATSAPP','WEBSITE','REFERRAL','PHONE','GOOGLE_ADS','EXISTING_CUSTOMER','WALK_IN'] as const
  const priorityList = ['MEDIUM','HIGH','LOW','URGENT','HIGH','MEDIUM'] as const
  const requests: Request[] = descriptions.map((description, i) => {
    const customer = customers[i % customers.length]
    const site = sites.find(s => s.customerId === customer.id)
    const creator = users[1 + (i % 3)]
    const assigned = users[1 + ((i + 1) % 3)]
    const created = ago(25 - Math.floor(i * 0.8), i % 8)
    return {
      id: `r${i+1}`, requestNumber: `RK-2026-${String(i+1).padStart(5,'0')}`,
      customerId: customer.id, siteId: site?.id, createdBy: creator.id, assignedTo: assigned.id,
      source: sourceList[i % sourceList.length], requestType: i % 4 === 0 ? 'NEW_ENQUIRY' : i % 4 === 1 ? 'PRODUCT_REQUIREMENT' : i % 4 === 2 ? 'QUOTATION_REQUEST' : 'SERVICE',
      productCategory: i % 5 === 0 ? 'UPVC_DOORS' : i % 4 === 0 ? 'CASEMENT_WINDOWS' : 'UPVC_WINDOWS',
      description, quantity: 6 + (i * 3) % 28, priority: priorityList[i % priorityList.length],
      status: statusList[i], expectedDate: new Date(Date.now() + ((i % 12) + 2) * 86400000).toISOString().slice(0,10),
      remarks: i % 3 === 0 ? 'Customer expects a prompt site visit.' : undefined, createdAt: created, updatedAt: ago(Math.max(0, 12 - Math.floor(i/2)), i % 5)
    }
  })
  const activities: RequestActivity[] = requests.flatMap((r, i) => [
    { id: `a${i}c`, requestId: r.id, userId: r.createdBy, type: 'REQUEST_CREATED', description: `${users.find(u => u.id === r.createdBy)?.displayName} created this request.`, createdAt: r.createdAt },
    ...(i % 3 === 0 ? [{ id: `a${i}s`, requestId: r.id, userId: r.assignedTo!, type: 'STATUS_CHANGED' as const, description: `${users.find(u => u.id === r.assignedTo)?.displayName} changed status to ${r.status.replaceAll('_',' ')}.`, newValue: r.status, createdAt: r.updatedAt }] : [])
  ])
  storage.saveUsers(users); storage.saveCustomers(customers); storage.saveSites(sites); storage.saveRequests(requests); storage.saveActivities(activities); storage.saveDocuments([])
  localStorage.setItem(storage.keys.initialized, 'true')
}