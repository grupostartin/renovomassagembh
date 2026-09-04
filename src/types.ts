export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  sessionOptions: {
    durationMinutes: number;
    price?: number;
    note?: string;
  }[];
  benefits: string[];
  indications: string[];
  image: string;
  recommendedFor: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  publishTime?: string;
  googleMapsUri: string;
  flagContentUri?: string;
}

export interface GoogleReviewsResponse {
  source: 'google-places';
  placeId: string;
  placeName: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  orderBy: 'relevance';
  reviews: GoogleReview[];
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

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityResponse {
  mode: 'demo' | 'google-calendar';
  date: string;
  slots: AvailabilitySlot[];
  settings: {
    timeZone: string;
    bufferMinutes: number;
    minimumLeadMinutes: number;
    bookingWindowDays: number;
    today: string;
  };
}

export interface CreateBookingRequest {
  serviceId: string;
  durationMinutes: number;
  date: string;
  startTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
}

export interface ConfirmedBooking {
  id: string;
  status: 'confirmed';
  serviceId: string;
  serviceTitle: string;
  durationMinutes: number;
  date: string;
  startTime: string;
  endTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
}

export interface CreateBookingResponse {
  mode: 'demo' | 'google-calendar';
  booking: ConfirmedBooking;
}
