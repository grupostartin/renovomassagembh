import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
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

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const isBookingEnabled = !isProduction || BOOKING_ENABLED_IN_PRODUCTION;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '..');

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    mode: 'demo',
    calendarConnected: false,
    bookingEnabled: isBookingEnabled,
  });
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
