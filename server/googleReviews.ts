import type { GoogleReview, GoogleReviewsResponse } from '../src/types.ts';

export const GOOGLE_REVIEWS_FALLBACK_URI = 'https://share.google/jmwzEries0xE3eP6o';

const DEFAULT_PLACE_QUERY =
  'Renovo Massagem, R. José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470';

interface GoogleLocalizedText {
  text?: string;
  languageCode?: string;
}

interface GoogleAuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

interface GooglePlacesReview {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: GoogleLocalizedText;
  originalText?: GoogleLocalizedText;
  rating?: number;
  authorAttribution?: GoogleAuthorAttribution;
  publishTime?: string;
  flagContentUri?: string;
  googleMapsUri?: string;
}

interface GooglePlaceDetails {
  id?: string;
  displayName?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlacesReview[];
}

interface GoogleTextSearchResponse {
  places?: Array<{
    id?: string;
    displayName?: GoogleLocalizedText;
    formattedAddress?: string;
  }>;
}

export class GooglePlacesConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GooglePlacesConfigurationError';
  }
}

export class GooglePlacesRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'GooglePlacesRequestError';
    this.status = status;
  }
}

let resolvedPlaceId: string | undefined;

async function requestGoogle<T>(
  url: string,
  apiKey: string,
  fieldMask: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new GooglePlacesRequestError(
      `Google Places respondeu com status ${response.status}${details ? `: ${details.slice(0, 300)}` : ''}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

async function getPlaceId(apiKey: string): Promise<string> {
  const configuredPlaceId = process.env.GOOGLE_PLACE_ID?.trim();
  if (configuredPlaceId) return configuredPlaceId;
  if (resolvedPlaceId) return resolvedPlaceId;

  const textQuery = process.env.GOOGLE_PLACE_QUERY?.trim() || DEFAULT_PLACE_QUERY;
  const result = await requestGoogle<GoogleTextSearchResponse>(
    'https://places.googleapis.com/v1/places:searchText',
    apiKey,
    'places.id,places.displayName,places.formattedAddress',
    {
      method: 'POST',
      body: JSON.stringify({
        textQuery,
        languageCode: 'pt-BR',
        regionCode: 'BR',
        pageSize: 1,
      }),
    },
  );

  const place = result.places?.[0];
  if (!place?.id) {
    throw new GooglePlacesRequestError(
      'O perfil da Renovo Massagem não foi encontrado pelo Google Places.',
      404,
    );
  }

  resolvedPlaceId = place.id;
  console.info(`[Google Reviews] Place ID encontrado: ${resolvedPlaceId}`);
  return resolvedPlaceId;
}

export async function loadGoogleReviews(): Promise<GoogleReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY') {
    throw new GooglePlacesConfigurationError(
      'A integração com o Google Maps ainda precisa da chave da Places API.',
    );
  }

  const placeId = await getPlaceId(apiKey);
  const details = await requestGoogle<GooglePlaceDetails>(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR&regionCode=BR`,
    apiKey,
    'id,displayName,rating,userRatingCount,reviews,googleMapsUri',
  );

  const googleMapsUri = details.googleMapsUri || GOOGLE_REVIEWS_FALLBACK_URI;
  const reviews: GoogleReview[] = (details.reviews ?? [])
    .map((review, index): GoogleReview | null => {
      const text = review.text?.text?.trim() || review.originalText?.text?.trim() || '';
      if (!text) return null;

      return {
        id: review.name || `${review.publishTime ?? 'review'}-${index}`,
        authorName: review.authorAttribution?.displayName || 'Cliente Google Maps',
        authorUri: review.authorAttribution?.uri,
        authorPhotoUri: review.authorAttribution?.photoUri,
        rating: Math.max(1, Math.min(5, Math.round(review.rating ?? 5))),
        text,
        relativePublishTimeDescription:
          review.relativePublishTimeDescription || 'Avaliação publicada no Google Maps',
        publishTime: review.publishTime,
        googleMapsUri: review.googleMapsUri || googleMapsUri,
        flagContentUri: review.flagContentUri,
      };
    })
    .filter((review): review is GoogleReview => review !== null);

  return {
    source: 'google-places',
    placeId: details.id || placeId,
    placeName: details.displayName?.text || 'Renovo Massagem',
    rating: details.rating ?? 0,
    userRatingCount: details.userRatingCount ?? 0,
    googleMapsUri,
    orderBy: 'relevance',
    reviews,
  };
}
