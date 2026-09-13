export type Role = 'ADMIN' | 'SALES_USER'
export type CustomerType = 'INDIVIDUAL' | 'RESORT' | 'INTERIOR_DESIGNER' | 'COMMERCIAL' | 'BUILDER' | 'CONTRACTOR' | 'OTHER'
export type RequestSource = 'GOOGLE_ADS' | 'WHATSAPP' | 'WEBSITE' | 'PHONE' | 'REFERRAL' | 'WALK_IN' | 'EXISTING_CUSTOMER' | 'OTHER'
export type RequestType = 'NEW_ENQUIRY' | 'PRODUCT_REQUIREMENT' | 'QUOTATION_REQUEST' | 'SERVICE' | 'INSTALLATION' | 'COMPLAINT' | 'MODIFICATION' | 'OTHER'
export type ProductCategory = 'UPVC_WINDOWS' | 'UPVC_DOORS' | 'SLIDING_WINDOWS' | 'CASEMENT_WINDOWS' | 'GLASS_WINDOWS' | 'PARTITIONS' | 'CABINS' | 'CEILINGS' | 'COMMERCIAL_PROJECT' | 'OTHER'
export type RequestStatus = 'NEW' | 'CONTACTED' | 'SITE_VISIT' | 'REQUIREMENTS' | 'FOLLOW_UP' | 'QUOTATION_PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type ActivityType = 'REQUEST_CREATED' | 'REQUEST_UPDATED' | 'ASSIGNED' | 'REASSIGNED' | 'STATUS_CHANGED' | 'COMMENT' | 'DOCUMENT_UPLOADED' | 'PRIORITY_CHANGED'

export interface User {
  id: string; username: string; password: string; displayName: string; role: Role;
}

export interface Customer {
  id: string; name: string; companyName?: string; customerType: CustomerType; phone: string;
  alternatePhone?: string; email?: string; address?: string; city?: string; state?: string; pincode?: string; createdAt: string;
}

export interface Site {
  id: string; customerId: string; name: string; address?: string; city?: string; state?: string;
  pincode?: string; contactPerson?: string; contactPhone?: string; notes?: string; createdAt: string;
}

export interface Request {
  id: string; requestNumber: string; customerId: string; siteId?: string; createdBy: string; assignedTo?: string;
  source: RequestSource; requestType: RequestType; productCategory?: ProductCategory; description: string;
  quantity?: number; priority: Priority; status: RequestStatus; expectedDate?: string; remarks?: string; createdAt: string; updatedAt: string;
}

export interface RequestActivity {
  id: string; requestId: string; userId: string; type: ActivityType; description: string;
  oldValue?: string; newValue?: string; documentId?: string; createdAt: string;
}

export interface Document {
  id: string; requestId: string; fileName: string; contentType: string; size: number;
  uploadedBy: string; uploadedAt: string;
}