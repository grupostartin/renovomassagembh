import type {
  AvailabilityResponse,
  CreateBookingRequest,
  CreateBookingResponse,
} from '../types';

export class BookingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'BookingApiError';
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body && typeof body === 'object' && 'message' in body && typeof body.message === 'string'
      ? body.message
      : 'Não foi possível falar com a agenda.';
    throw new BookingApiError(message, response.status);
  }
  return body as T;
}

export async function getAvailability(
  serviceId: string,
  durationMinutes: number,
  date: string,
  signal?: AbortSignal,
): Promise<AvailabilityResponse> {
  const query = new URLSearchParams({
    serviceId,
    durationMinutes: String(durationMinutes),
    date,
  });
  const response = await fetch(`/api/availability?${query}`, { signal });
  return parseResponse<AvailabilityResponse>(response);
}

export async function createBooking(
  booking: CreateBookingRequest,
): Promise<CreateBookingResponse> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  return parseResponse<CreateBookingResponse>(response);
}
