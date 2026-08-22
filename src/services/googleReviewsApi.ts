import type { GoogleReviewsResponse } from '../types';
import { GOOGLE_REVIEWS_URL } from '../data/siteData';

interface GoogleReviewsErrorBody {
  message?: string;
  configured?: boolean;
  googleMapsUri?: string;
}

export class GoogleReviewsApiError extends Error {
  status: number;
  configured: boolean;
  googleMapsUri: string;

  constructor(
    message: string,
    status: number,
    configured = false,
    googleMapsUri = GOOGLE_REVIEWS_URL,
  ) {
    super(message);
    this.name = 'GoogleReviewsApiError';
    this.status = status;
    this.configured = configured;
    this.googleMapsUri = googleMapsUri;
  }
}

let activeRequest: Promise<GoogleReviewsResponse> | null = null;

async function requestGoogleReviews(): Promise<GoogleReviewsResponse> {
  const response = await fetch('/api/google-reviews', { cache: 'no-store' });
  const body: GoogleReviewsResponse | GoogleReviewsErrorBody | null = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = body as GoogleReviewsErrorBody | null;
    throw new GoogleReviewsApiError(
      errorBody?.message ?? 'Não foi possível carregar as avaliações do Google Maps.',
      response.status,
      errorBody?.configured,
      errorBody?.googleMapsUri,
    );
  }

  return body as GoogleReviewsResponse;
}

export function getGoogleReviews(): Promise<GoogleReviewsResponse> {
  if (!activeRequest) {
    activeRequest = requestGoogleReviews().finally(() => {
      activeRequest = null;
    });
  }

  return activeRequest;
}
