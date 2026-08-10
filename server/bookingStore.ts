import { randomUUID } from 'node:crypto';
import {
  BOOKING_TIME_ZONE,
  BOOKING_UTC_OFFSET,
  BOOKING_WINDOW_DAYS,
  BUFFER_MINUTES,
  BUSINESS_SCHEDULE,
  MINIMUM_LEAD_MINUTES,
  SLOT_INTERVAL_MINUTES,
  getBookingService,
} from '../src/data/bookingConfig.ts';

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

export interface DemoBooking {
  id: string;
  status: 'confirmed';
  serviceId: string;
  serviceTitle: string;
  durationMinutes: number;
  date: string;
  startTime: string;
  endTime: string;
  startIso: string;
  endIso: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  createdAt: string;
}

export interface CreateBookingInput {
  serviceId: string;
  durationMinutes: number;
  date: string;
  startTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
}

interface AvailabilityInput {
  serviceId: string;
  durationMinutes: number;
  date: string;
}

interface ValidationResult {
  valid: boolean;
  message?: string;
}

export class BookingValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'BookingValidationError';
    this.statusCode = statusCode;
  }
}

const demoBookings: DemoBooking[] = [];

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function localDateTimeToDate(date: string, time: string): Date {
  return new Date(`${date}T${time}:00${BOOKING_UTC_OFFSET}`);
}

function getDatePartsInBookingTimeZone(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

export function getTodayInBookingTimeZone(now = new Date()): string {
  const { year, month, day } = getDatePartsInBookingTimeZone(now);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function addDaysToDate(date: string, days: number): string {
  const [year, month, day] = date.split('-').map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days, 12));
  return result.toISOString().slice(0, 10);
}

function getWeekday(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();
}

function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day, 12));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function validateAvailabilityInput(input: AvailabilityInput): ValidationResult {
  const service = getBookingService(input.serviceId);
  if (!service) return { valid: false, message: 'Serviço inválido.' };
  if (!service.durations.includes(input.durationMinutes)) {
    return { valid: false, message: 'Duração inválida para o serviço escolhido.' };
  }
  if (!isValidDateString(input.date)) return { valid: false, message: 'Data inválida.' };

  const today = getTodayInBookingTimeZone();
  const lastBookableDate = addDaysToDate(today, BOOKING_WINDOW_DAYS);
  if (input.date < today || input.date > lastBookableDate) {
    return { valid: false, message: 'A data está fora da janela de agendamento.' };
  }

  return { valid: true };
}

function intervalsOverlap(
  candidateStart: Date,
  candidateEndWithBuffer: Date,
  booking: DemoBooking,
): boolean {
  const bookingStart = new Date(booking.startIso);
  const bookingEndWithBuffer = new Date(
    new Date(booking.endIso).getTime() + BUFFER_MINUTES * 60_000,
  );
  return candidateStart < bookingEndWithBuffer && candidateEndWithBuffer > bookingStart;
}

export function getAvailability(input: AvailabilityInput, now = new Date()): AvailabilitySlot[] {
  const validation = validateAvailabilityInput(input);
  if (!validation.valid) throw new BookingValidationError(validation.message ?? 'Dados inválidos.');

  const schedule = BUSINESS_SCHEDULE[getWeekday(input.date)];
  if (!schedule) return [];

  const openMinutes = timeToMinutes(schedule.open);
  const closeMinutes = timeToMinutes(schedule.close);
  const minimumStart = new Date(now.getTime() + MINIMUM_LEAD_MINUTES * 60_000);
  const slots: AvailabilitySlot[] = [];

  for (
    let startMinutes = openMinutes;
    startMinutes + input.durationMinutes <= closeMinutes;
    startMinutes += SLOT_INTERVAL_MINUTES
  ) {
    const startTime = minutesToTime(startMinutes);
    const endTime = minutesToTime(startMinutes + input.durationMinutes);
    const candidateStart = localDateTimeToDate(input.date, startTime);
    const candidateEndWithBuffer = new Date(
      localDateTimeToDate(input.date, endTime).getTime() + BUFFER_MINUTES * 60_000,
    );

    if (candidateStart < minimumStart) continue;

    const hasConflict = demoBookings.some(
      (booking) =>
        booking.date === input.date &&
        intervalsOverlap(candidateStart, candidateEndWithBuffer, booking),
    );

    if (!hasConflict) slots.push({ startTime, endTime });
  }

  return slots;
}

function validateContact(input: CreateBookingInput): void {
  if (input.clientName.trim().length < 2) {
    throw new BookingValidationError('Informe seu nome completo.');
  }

  const phoneDigits = input.clientPhone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    throw new BookingValidationError('Informe um telefone válido com DDD.');
  }

  if (input.clientEmail) {
    const email = input.clientEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BookingValidationError('Informe um e-mail válido.');
    }
  }
}

export function createDemoBooking(input: CreateBookingInput): DemoBooking {
  validateContact(input);
  const service = getBookingService(input.serviceId);
  if (!service) throw new BookingValidationError('Serviço inválido.');

  const availableSlots = getAvailability({
    serviceId: input.serviceId,
    durationMinutes: input.durationMinutes,
    date: input.date,
  });
  const selectedSlot = availableSlots.find((slot) => slot.startTime === input.startTime);

  if (!selectedSlot) {
    throw new BookingValidationError(
      'Este horário acabou de ficar indisponível. Escolha outro horário.',
      409,
    );
  }

  const start = localDateTimeToDate(input.date, selectedSlot.startTime);
  const end = localDateTimeToDate(input.date, selectedSlot.endTime);
  const booking: DemoBooking = {
    id: `RN-${randomUUID().slice(0, 8).toUpperCase()}`,
    status: 'confirmed',
    serviceId: service.id,
    serviceTitle: service.title,
    durationMinutes: input.durationMinutes,
    date: input.date,
    startTime: selectedSlot.startTime,
    endTime: selectedSlot.endTime,
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    clientName: input.clientName.trim(),
    clientPhone: input.clientPhone.trim(),
    clientEmail: input.clientEmail?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  // The check and insertion are synchronous, so concurrent demo requests cannot
  // claim the same slot between these two operations in this Node.js process.
  demoBookings.push(booking);
  return booking;
}

export function getDemoBookings(): DemoBooking[] {
  return [...demoBookings];
}
