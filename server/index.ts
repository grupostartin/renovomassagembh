import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  BOOKING_ENABLED_IN_PRODUCTION,
  BOOKING_TIME_ZONE,
  BOOKING_WINDOW_DAYS,
  BUFFER_MINUTES,
  MINIMUM_LEAD_MINUTES,
} from '../src/data/bookingConfig.ts';
import {
  BookingValidationError,
  createDemoBooking,
  getAvailability,
  getTodayInBookingTimeZone,
} from './bookingStore.ts';
import {
  GOOGLE_REVIEWS_FALLBACK_URI,
  GooglePlacesConfigurationError,
  loadGoogleReviews,
} from './googleReviews.ts';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '..');
dotenv.config({ path: path.join(projectRoot, '.env.local'), quiet: true });
dotenv.config({ path: path.join(projectRoot, '.env'), quiet: true });

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const isBookingEnabled = !isProduction || BOOKING_ENABLED_IN_PRODUCTION;
const GOOGLE_REVIEWS_WINDOW_MS = 60_000;
const GOOGLE_REVIEWS_MAX_REQUESTS_PER_WINDOW = 30;
let googleReviewsWindowStartedAt = Date.now();
let googleReviewsRequestCount = 0;
let googleReviewsRequestInFlight: ReturnType<typeof loadGoogleReviews> | null = null;

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    mode: 'demo',
    calendarConnected: false,
    bookingEnabled: isBookingEnabled,
    googleReviewsConfigured: Boolean(process.env.GOOGLE_PLACES_API_KEY?.trim()),
  });
});

app.get('/api/google-reviews', async (_request, response) => {
  response.set('Cache-Control', 'private, no-store, max-age=0');
  response.set('Pragma', 'no-cache');

  const now = Date.now();
  if (now - googleReviewsWindowStartedAt >= GOOGLE_REVIEWS_WINDOW_MS) {
    googleReviewsWindowStartedAt = now;
    googleReviewsRequestCount = 0;
  }

  if (googleReviewsRequestCount >= GOOGLE_REVIEWS_MAX_REQUESTS_PER_WINDOW) {
    response.set('Retry-After', '60');
    response.status(429).json({
      configured: Boolean(process.env.GOOGLE_PLACES_API_KEY?.trim()),
      message: 'Muitas solicitações de avaliações. Tente novamente em instantes.',
      googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
    });
    return;
  }

  googleReviewsRequestCount += 1;

  try {
    if (!googleReviewsRequestInFlight) {
      googleReviewsRequestInFlight = loadGoogleReviews().finally(() => {
        googleReviewsRequestInFlight = null;
      });
    }

    const reviews = await googleReviewsRequestInFlight;
    response.json(reviews);
  } catch (error) {
    if (error instanceof GooglePlacesConfigurationError) {
      response.status(503).json({
        configured: false,
        message: error.message,
        googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
      });
      return;
    }

    console.error('[Google Reviews] Falha ao carregar avaliações:', error);
    response.status(502).json({
      configured: true,
      message: 'As avaliações do Google Maps estão temporariamente indisponíveis.',
      googleMapsUri: GOOGLE_REVIEWS_FALLBACK_URI,
    });
  }
});

if (isBookingEnabled) {
  app.get('/api/availability', (request, response, next) => {
    try {
      const serviceId = String(request.query.serviceId ?? '');
      const durationMinutes = Number(request.query.durationMinutes);
      const date = String(request.query.date ?? '');
      const slots = getAvailability({ serviceId, durationMinutes, date });

      response.json({
        mode: 'demo',
        date,
        slots,
        settings: {
          timeZone: BOOKING_TIME_ZONE,
          bufferMinutes: BUFFER_MINUTES,
          minimumLeadMinutes: MINIMUM_LEAD_MINUTES,
          bookingWindowDays: BOOKING_WINDOW_DAYS,
          today: getTodayInBookingTimeZone(),
        },
      });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/bookings', (request, response, next) => {
    try {
      const body = request.body && typeof request.body === 'object' ? request.body : {};
      const booking = createDemoBooking({
        serviceId: String(body.serviceId ?? ''),
        durationMinutes: Number(body.durationMinutes),
        date: String(body.date ?? ''),
        startTime: String(body.startTime ?? ''),
        clientName: String(body.clientName ?? ''),
        clientPhone: String(body.clientPhone ?? ''),
        clientEmail: body.clientEmail ? String(body.clientEmail) : undefined,
      });

      response.status(201).json({ mode: 'demo', booking });
    } catch (error) {
      next(error);
    }
  });
}

app.use('/api', (_request, response) => {
  response.status(404).json({ message: 'Endpoint não encontrado.' });
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof BookingValidationError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'entity.parse.failed'
  ) {
    response.status(400).json({ message: 'O conteúdo enviado não é um JSON válido.' });
    return;
  }

  console.error(error);
  response.status(500).json({ message: 'Não foi possível concluir a operação.' });
});

if (isProduction) {
  const distDirectory = path.join(projectRoot, 'dist');
  app.use(express.static(distDirectory));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(distDirectory, 'index.html'));
  });
} else {
  const vite = await createViteServer({
    root: projectRoot,
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Renovo demo running at http://localhost:${port}`);
});
