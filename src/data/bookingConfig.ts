// Temporary launch gate: development always shows the agenda. Change this to
// true when the agenda is ready to be released in production.
export const BOOKING_ENABLED_IN_PRODUCTION = false;

export const BOOKING_TIME_ZONE = 'America/Sao_Paulo';
export const BOOKING_UTC_OFFSET = '-03:00';
export const BOOKING_WINDOW_DAYS = 30;
export const MINIMUM_LEAD_MINUTES = 120;
export const SLOT_INTERVAL_MINUTES = 15;
export const BUFFER_MINUTES = 15;

export interface BookingServiceConfig {
  id: string;
  title: string;
  durations: number[];
}

export interface BusinessDayConfig {
  open: string;
  close: string;
}

// Durações usadas somente na agenda de demonstração. Confirme os tempos
// comerciais com a Renovo antes de liberar BOOKING_ENABLED_IN_PRODUCTION.
export const BOOKING_SERVICES: BookingServiceConfig[] = [
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    durations: [60, 90],
  },
  {
    id: 'terapeutica',
    title: 'Massagem Terapêutica',
    durations: [60],
  },
  {
    id: 'desportiva',
    title: 'Massagem Desportiva',
    durations: [30, 60],
  },
  {
    id: 'pedras-quentes',
    title: 'Pedras Quentes',
    durations: [60, 90],
  },
  {
    id: 'alivio-pes-cabeca',
    title: 'Alívio Pés & Cabeça',
    durations: [60],
  },
  {
    id: 'pes-relax',
    title: 'Pés Relax',
    durations: [45],
  },
];

// JavaScript weekday: 0 = Sunday, 1 = Monday, ... 6 = Saturday.
export const BUSINESS_SCHEDULE: Partial<Record<number, BusinessDayConfig>> = {
  1: { open: '09:00', close: '18:00' },
  2: { open: '09:00', close: '18:00' },
  3: { open: '09:00', close: '18:00' },
  4: { open: '09:00', close: '18:00' },
  5: { open: '09:00', close: '18:00' },
  6: { open: '09:00', close: '16:00' },
};

export function getBookingService(serviceId: string): BookingServiceConfig | undefined {
  return BOOKING_SERVICES.find((service) => service.id === serviceId);
}
