export type Role = 'user' | 'companion' | 'admin';

export type BookingState = 'draft' | 'pending' | 'accepted' | 'in_progress' | 'completed';

export type EmotionalRating = {
  label: string;
  score: number;
};

export type CompanionProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  district: string;
  ratePerHour: number;
  tags: string[];
  trustScore: number;
  intro: string;
  nextSlot: string;
  isOnline: boolean;
  isVerified: boolean;
  distance: number;
  emotionalRatings: EmotionalRating[];
  reviewCount: number;
  averageRating: number;
  avatarPlaceholder: string;
};

export type QuickFilter = {
  id: string;
  label: string;
};

export type OnlineService = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  icon: string;
};

export type TabItem = {
  id: string;
  label: string;
  icon: string;
  iconOutline: string;
};

export type RoleOption = {
  id: Role;
  label: string;
  subtitle: string;
};

export type BookingTimelineItem = {
  state: BookingState;
  label: string;
  note: string;
};

export type IncidentItem = {
  id: string;
  title: string;
  detail: string;
};
