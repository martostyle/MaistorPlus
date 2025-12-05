export type UserRole = 'client' | 'master' | 'guest';

export interface Master {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  hourlyRate?: number;
  imageUrl: string;
  description: string;
  tags: string[];
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
  DASHBOARD_CLIENT = 'DASHBOARD_CLIENT',
  DASHBOARD_MASTER = 'DASHBOARD_MASTER',
}