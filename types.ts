
export type UserRole = 'client' | 'master' | 'guest';
export type SubscriptionTier = 'free' | 'plus';

export interface SystemSettings {
  isEscrowMandatory: boolean;
  escrowThreshold: number; // e.g., 500 BGN
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  rating?: number; // Only set by the specific client
  clientReview?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: string; // e.g., 'kv.m', 'point', 'hour'
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  partnerPrice: number; // Discounted price for client
  imageUrl: string;
}

export interface CommissionRecord {
  id: string;
  date: string;
  itemName: string;
  amount: number;
  projectName: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  type: 'offer' | 'protocol' | 'contract';
  description: string;
}

export interface InsuranceOption {
  id: string;
  providerName: string;
  coverageAmount: number;
  pricePerYear: number;
  logoUrl: string;
}

export interface PartnerCoupon {
  id: string;
  partnerName: string;
  website: string;
  discountPercentage: number;
  code: string;
  category: string;
  logoUrl: string;
}

export interface Master {
  id: string;
  name: string;
  email: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  isAvailable: boolean;
  hourlyRate?: number;
  imageUrl: string;
  description: string;
  tags: string[];
  
  // Verification & B2B Fields
  eik: string; 
  insuranceUrl?: string; 
  certificates: string[]; 
  gallery: GalleryItem[];
  services: ServiceItem[];
  
  // Monetization
  subscriptionTier: SubscriptionTier;
}

export interface Offer {
  id: string;
  masterId: string;
  masterName: string;
  masterRating: number;
  price: number;
  duration: string; 
  comment: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Project {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'dispute';
  amount: number;
  escrowSecured: boolean;
  masterName?: string;
  date: string;
  furnitureDiscountActive: boolean;
  offers?: Offer[];
  hasWarranty?: boolean; // New field for Quality Fund Logic
}

export interface Lead {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  description: string;
  date: string;
  isHighPriority?: boolean; 
  isPlusOnly?: boolean; // New field: Visible only to PLUS members
  imagesCount: number;
}

export interface StatItem {
  label: string;
  value: string | number;
  trend?: string;
  positive?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  POST_REQUEST = 'POST_REQUEST',
  DASHBOARD_CLIENT = 'DASHBOARD_CLIENT',
  DASHBOARD_MASTER = 'DASHBOARD_MASTER',
}

// Request Wizard Types
export type ProjectScope = 'small' | 'medium' | 'large';

export interface ServiceRequestDraft {
  category: string;
  description: string;
  location: string;
  scope: ProjectScope;
  images: File[];
  isPublic: boolean;
  targetMasterId?: string;
}
