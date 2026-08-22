import type { IncomingMessage, ServerResponse } from 'node:http';
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

function json(
  response: ServerResponse,
  body: unknown,
  status = 200,
  extraHeaders?: Record<string, string>,
) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'private, no-store, max-age=0');
  response.setHeader('Pragma', 'no-cache');

  for (const [name, value] of Object.entries(extraHeaders ?? {})) {
    response.setHeader(name, value);
  }

  response.end(JSON.stringify(body));
}

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== 'GET') {
    json(response, { message: 'Método não permitido.' }, 405, { Allow: 'GET' });
    return;
  }

  const now = Date.now();
  if (now - windowStartedAt >= WINDOW_MS) {
    windowStartedAt = now;
    requestCount = 0;
  }

  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    json(
      response,
      {
        configured: isConfigured(),
        message: 'Muitas solicitações de avaliações. Tente novamente em instantes.',
        googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
      },
      429,
      { 'Retry-After': '60' },
    );
    return;
  }

  requestCount += 1;

  try {
    if (!requestInFlight) {
      requestInFlight = loadGoogleReviews().finally(() => {
        requestInFlight = null;
      });
    }

    json(response, await requestInFlight);
  } catch (error) {
    if (error instanceof GooglePlacesConfigurationError) {
      json(
        response,
        {
          configured: false,
          message: error.message,
          googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
        },
        503,
      );
      return;
    }

    console.error('[Google Reviews] Falha ao carregar avaliações na Vercel:', error);
    json(
      response,
      {
        configured: true,
        message: 'As avaliações do Google Maps estão temporariamente indisponíveis.',
        googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
      },
      502,
    );
  }
}
