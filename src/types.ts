export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  benefits: string[];
  indications: string[];
  image: string;
  recommendedFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarUrl: string;
  serviceUsed: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface BookingPreference {
  serviceId: string;
  preferredDay: string;
  preferredPeriod: string;
  clientName: string;
}
