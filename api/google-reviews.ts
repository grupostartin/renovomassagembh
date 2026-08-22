import {
  GOOGLE_REVIEWS_FALLBACK_URI,
  GooglePlacesConfigurationError,
  loadGoogleReviews,
} from '../server/googleReviews.ts';

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 30;

let windowStartedAt = Date.now();
let requestCount = 0;
let requestInFlight: ReturnType<typeof loadGoogleReviews> | null = null;

function isConfigured() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return Boolean(apiKey && apiKey !== 'YOUR_GOOGLE_PLACES_API_KEY');
}

function json(body: unknown, status = 200, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      Pragma: 'no-cache',
      ...extraHeaders,
    },
  });
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'GET') {
      return json(
        { message: 'Método não permitido.' },
        405,
        { Allow: 'GET' },
      );
    }

    const now = Date.now();
    if (now - windowStartedAt >= WINDOW_MS) {
      windowStartedAt = now;
      requestCount = 0;
    }

    if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
      return json(
        {
          configured: isConfigured(),
          message: 'Muitas solicitações de avaliações. Tente novamente em instantes.',
          googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
        },
        429,
        { 'Retry-After': '60' },
      );
    }

    requestCount += 1;

    try {
      if (!requestInFlight) {
        requestInFlight = loadGoogleReviews().finally(() => {
          requestInFlight = null;
        });
      }

      return json(await requestInFlight);
    } catch (error) {
      if (error instanceof GooglePlacesConfigurationError) {
        return json(
          {
            configured: false,
            message: error.message,
            googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
          },
          503,
        );
      }

      console.error('[Google Reviews] Falha ao carregar avaliações na Vercel:', error);
      return json(
        {
          configured: true,
          message: 'As avaliações do Google Maps estão temporariamente indisponíveis.',
          googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
        },
        502,
      );
    }
  },
};
