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

export const BOOKING_SERVICES: BookingServiceConfig[] = [
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    durations: [60, 80],
  },
  {
    id: 'terapeutica',
    title: 'Massagem Terapêutica',
    durations: [50, 80],
  },
  {
    id: 'pedras-quentes',
    title: 'Massagem com Pedras Quentes',
    durations: [75],
  },
  {
    id: 'reflexologia',
    title: 'Reflexologia Podal',
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
