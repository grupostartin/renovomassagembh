const FALLBACK_URI = 'https://share.google/jmwzEries0xE3eP6o';
const DEFAULT_PLACE_QUERY =
  'Renovo Massagem, R. José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470';
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 30;
const GOOGLE_REQUEST_TIMEOUT_MS = 8_000;

let windowStartedAt = Date.now();
let requestCount = 0;
let resolvedPlaceId;
let requestInFlight = null;

class ConfigurationError extends Error {}

class GoogleRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function isConfigured() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return Boolean(apiKey && apiKey !== 'YOUR_GOOGLE_PLACES_API_KEY');
}

function createResponseBody(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store, max-age=0',
      Pragma: 'no-cache',
      ...headers,
    },
  });
}

function sendJson(response, body, status = 200, headers = {}) {
  if (!response || typeof response.setHeader !== 'function' || typeof response.end !== 'function') {
    return createResponseBody(body, status, headers);
  }

  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'private, no-store, max-age=0');
  response.setHeader('Pragma', 'no-cache');

  for (const [name, value] of Object.entries(headers)) {
    response.setHeader(name, value);
  }

  response.end(JSON.stringify(body));
  return undefined;
}

function getAbortSignal() {
  return typeof AbortSignal.timeout === 'function'
    ? AbortSignal.timeout(GOOGLE_REQUEST_TIMEOUT_MS)
    : undefined;
}

async function requestGoogle(url, apiKey, fieldMask, init = {}) {
  const result = await fetch(url, {
    ...init,
    signal: getAbortSignal(),
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
      ...init.headers,
    },
  });

  if (!result.ok) {
    const details = await result.text().catch(() => '');
    throw new GoogleRequestError(
      `Google Places respondeu com status ${result.status}${
        details ? `: ${details.slice(0, 300)}` : ''
      }`,
      result.status,
    );
  }

  return result.json();
}

function getConfiguredPlaceId() {
  const value = process.env.GOOGLE_PLACE_ID?.trim();
  if (!value || value === 'YOUR_GOOGLE_PLACE_ID') return undefined;

  // Links compartilhados e IDs /g/ não são Place IDs da Places API.
  if (value.startsWith('http') || value.startsWith('/g/') || value.includes('share.google')) {
    return undefined;
  }

  return value.replace(/^places\//, '');
}

async function getPlaceId(apiKey) {
  const configuredPlaceId = getConfiguredPlaceId();
  if (configuredPlaceId) return configuredPlaceId;
  if (resolvedPlaceId) return resolvedPlaceId;

  const textQuery = process.env.GOOGLE_PLACE_QUERY?.trim() || DEFAULT_PLACE_QUERY;
  const result = await requestGoogle(
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
    throw new GoogleRequestError(
      'O perfil da Renovo Massagem não foi encontrado pelo Google Places.',
      404,
    );
  }

  resolvedPlaceId = place.id;
  return resolvedPlaceId;
}

async function loadGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY') {
    throw new ConfigurationError(
      'A integração com o Google Maps ainda precisa da chave da Places API.',
    );
  }

  const placeId = await getPlaceId(apiKey);
  const details = await requestGoogle(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(
      placeId,
    )}?languageCode=pt-BR&regionCode=BR`,
    apiKey,
    'id,displayName,rating,userRatingCount,reviews,googleMapsUri',
  );

  const googleMapsUri = details.googleMapsUri || FALLBACK_URI;
  const reviews = (details.reviews ?? [])
    .map((review, index) => {
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
    .filter(Boolean);

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

async function handleRequest() {
  const now = Date.now();
  if (now - windowStartedAt >= WINDOW_MS) {
    windowStartedAt = now;
    requestCount = 0;
  }

  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    return {
      status: 429,
      headers: { 'Retry-After': '60' },
      body: {
        configured: isConfigured(),
        message: 'Muitas solicitações de avaliações. Tente novamente em instantes.',
        googleMapsUri: FALLBACK_URI,
      },
    };
  }

  requestCount += 1;

  try {
    if (!requestInFlight) {
      requestInFlight = loadGoogleReviews().finally(() => {
        requestInFlight = null;
      });
    }

    return { status: 200, headers: {}, body: await requestInFlight };
  } catch (error) {
    if (error instanceof ConfigurationError) {
      return {
        status: 503,
        headers: {},
        body: {
          configured: false,
          message: error.message,
          googleMapsUri: FALLBACK_URI,
        },
      };
    }

    console.error(
      '[Google Reviews] Falha na consulta:',
      error instanceof Error ? `${error.name}: ${error.message}` : 'Erro desconhecido',
    );
    return {
      status: 502,
      headers: {},
      body: {
        configured: true,
        message: 'As avaliações do Google Maps estão temporariamente indisponíveis.',
        googleMapsUri: FALLBACK_URI,
      },
    };
  }
}

export default async function handler(request, response) {
  try {
    if (request?.method !== 'GET') {
      return sendJson(
        response,
        { message: 'Método não permitido.' },
        405,
        { Allow: 'GET' },
      );
    }

    const result = await handleRequest();
    return sendJson(response, result.body, result.status, result.headers);
  } catch (error) {
    console.error(
      '[Google Reviews] Falha inesperada:',
      error instanceof Error ? `${error.name}: ${error.message}` : 'Erro desconhecido',
    );
    return sendJson(
      response,
      {
        configured: isConfigured(),
        message: 'A função de avaliações encontrou uma falha inesperada.',
        googleMapsUri: FALLBACK_URI,
      },
      500,
    );
  }
}
