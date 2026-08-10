import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import {
  BOOKING_SERVICES,
  BOOKING_TIME_ZONE,
  BOOKING_WINDOW_DAYS,
  type BookingServiceConfig,
} from '../data/bookingConfig';
import { getWhatsAppLink } from '../data/siteData';
import { createBooking, getAvailability } from '../services/bookingApi';
import type { AvailabilitySlot, ConfirmedBooking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'service' | 'schedule' | 'details' | 'success';

const STEP_LABELS = ['Serviço', 'Horário', 'Seus dados'];

function dateToInputValue(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(date: string, days: number): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + days, 12)).toISOString().slice(0, 10);
}

function formatDate(date: string): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const today = useMemo(() => dateToInputValue(new Date()), []);
  const lastBookableDate = useMemo(() => addDays(today, BOOKING_WINDOW_DAYS), [today]);
  const initialService = BOOKING_SERVICES[0];

  const [step, setStep] = useState<BookingStep>('service');
  const [selectedServiceId, setSelectedServiceId] = useState(initialService.id);
  const [selectedDuration, setSelectedDuration] = useState(initialService.durations[0]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const [scheduleNotice, setScheduleNotice] = useState('');
  const [availabilityVersion, setAvailabilityVersion] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  const selectedService = BOOKING_SERVICES.find(
    (service) => service.id === selectedServiceId,
  ) ?? initialService;

  const currentStepNumber = step === 'service' ? 1 : step === 'schedule' ? 2 : 3;

  const resetBooking = () => {
    setStep('service');
    setSelectedServiceId(initialService.id);
    setSelectedDuration(initialService.durations[0]);
    setSelectedDate(today);
    setSelectedSlot(null);
    setSlots([]);
    setAvailabilityError('');
    setScheduleNotice('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setSubmitError('');
    setConfirmedBooking(null);
  };

  useEffect(() => {
    if (isOpen) resetBooking();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, submitting]);

  useEffect(() => {
    if (!isOpen || step !== 'schedule' || !selectedDate) return;

    const controller = new AbortController();
    setLoadingSlots(true);
    setAvailabilityError('');
    setSelectedSlot(null);

    getAvailability(
      selectedServiceId,
      selectedDuration,
      selectedDate,
      controller.signal,
    )
      .then((response) => setSlots(response.slots))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setSlots([]);
        setAvailabilityError(
          error instanceof Error ? error.message : 'Não foi possível consultar os horários.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingSlots(false);
      });

    return () => controller.abort();
  }, [
    availabilityVersion,
    isOpen,
    selectedDate,
    selectedDuration,
    selectedServiceId,
    step,
  ]);

  if (!isOpen) return null;

  const selectService = (service: BookingServiceConfig) => {
    setSelectedServiceId(service.id);
    setSelectedDuration(service.durations[0]);
    setSelectedSlot(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await createBooking({
        serviceId: selectedServiceId,
        durationMinutes: selectedDuration,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        clientName,
        clientPhone,
        clientEmail: clientEmail || undefined,
      });
      setConfirmedBooking(response.booking);
      setStep('success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível confirmar.';
      if (error && typeof error === 'object' && 'status' in error && error.status === 409) {
        setScheduleNotice(message);
        setAvailabilityVersion((version) => version + 1);
        setStep('schedule');
      } else {
        setSubmitError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const sendConfirmationToWhatsApp = () => {
    if (!confirmedBooking) return;
    const message = `Olá! Fiz um agendamento de teste na Renovo Massagem. Código: *${confirmedBooking.id}*. Serviço: *${confirmedBooking.serviceTitle}*, dia *${formatDate(confirmedBooking.date)}*, às *${confirmedBooking.startTime}*.`;
    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#15140C]/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={() => !submitting && onClose()}
      role="presentation"
    >
      <div
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#C4B49A]/25 bg-[#F2F0EA] text-[#15140C] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div className="border-b border-[#C4B49A]/25 bg-white/55 px-5 py-5 sm:px-8">
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute right-4 top-4 rounded-full bg-[#15140C]/7 p-2 text-[#15140C] transition-colors hover:bg-[#15140C]/12 disabled:opacity-50 sm:right-6 sm:top-5"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-12">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4D5240]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4D5240]">
                <Calendar className="h-3.5 w-3.5" />
                Agenda Renovo
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                <Sparkles className="h-3 w-3" />
                Modo demonstração
              </span>
            </div>
            <h2 id="booking-title" className="font-serif text-2xl font-semibold sm:text-3xl">
              {step === 'success' ? 'Horário reservado!' : 'Agende sua massagem'}
            </h2>
            <p className="mt-1 text-xs text-[#15140C]/60 sm:text-sm">
              {step === 'success'
                ? 'Confira abaixo os dados do seu agendamento de teste.'
                : 'Escolha um horário disponível e confirme sem sair do site.'}
            </p>
          </div>

          {step !== 'success' && (
            <div className="mt-5 grid grid-cols-3 gap-2">
              {STEP_LABELS.map((label, index) => {
                const number = index + 1;
                const active = number === currentStepNumber;
                const complete = number < currentStepNumber;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active || complete
                          ? 'bg-[#4E7A36] text-white'
                          : 'bg-[#15140C]/8 text-[#15140C]/45'
                      }`}
                    >
                      {complete ? <CheckCircle className="h-4 w-4" /> : number}
                    </span>
                    <span
                      className={`hidden text-xs font-semibold sm:block ${
                        active ? 'text-[#15140C]' : 'text-[#15140C]/45'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="max-h-[64vh] overflow-y-auto px-5 py-6 sm:max-h-[62vh] sm:px-8">
          {step === 'service' && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#15140C]/65">
                Qual experiência você deseja?
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {BOOKING_SERVICES.map((service) => {
                  const selected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => selectService(service)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? 'border-[#4E7A36] bg-[#4E7A36]/8 shadow-sm'
                          : 'border-[#C4B49A]/30 bg-white hover:border-[#4D5240]/40'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-serif text-lg font-semibold leading-tight">
                          {service.title}
                        </span>
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-[#4E7A36] bg-[#4E7A36] text-white'
                              : 'border-[#C4B49A]'
                          }`}
                        >
                          {selected && <CheckCircle className="h-3.5 w-3.5" />}
                        </span>
                      </span>
                      <span className="mt-2 block text-xs text-[#15140C]/55">
                        {service.durations.map((duration) => `${duration} min`).join(' ou ')}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-[#C4B49A]/30 bg-white p-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                  <Clock className="h-4 w-4 text-[#4E7A36]" />
                  Escolha a duração
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedService.durations.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setSelectedDuration(duration)}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                        selectedDuration === duration
                          ? 'bg-[#4D5240] text-white'
                          : 'bg-[#15140C]/6 text-[#15140C] hover:bg-[#15140C]/10'
                      }`}
                    >
                      {duration} minutos
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'schedule' && (
            <div>
              <button
                type="button"
                onClick={() => setStep('service')}
                className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-[#4D5240] hover:text-[#4E7A36]"
              >
                <ArrowLeft className="h-4 w-4" />
                Alterar serviço
              </button>

              <div className="rounded-2xl bg-[#4D5240] p-4 text-white sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-lg font-semibold">{selectedService.title}</p>
                  <p className="text-xs text-white/65">Sessão de {selectedDuration} minutos</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs sm:mt-0">
                  <Clock className="h-3.5 w-3.5" />
                  + 15 min de intervalo
                </span>
              </div>

              <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                Escolha uma data
                <input
                  type="date"
                  value={selectedDate}
                  min={today}
                  max={lastBookableDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                    setScheduleNotice('');
                  }}
                  className="mt-2 block w-full rounded-xl border border-[#C4B49A]/35 bg-white px-4 py-3 text-sm font-medium text-[#15140C] outline-none transition-colors focus:border-[#4E7A36]"
                />
              </label>

              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                      Horários disponíveis
                    </p>
                    <p className="mt-0.5 text-xs capitalize text-[#15140C]/50">
                      {formatDate(selectedDate)}
                    </p>
                  </div>
                  {!loadingSlots && !availabilityError && (
                    <button
                      type="button"
                      onClick={() => setAvailabilityVersion((version) => version + 1)}
                      className="rounded-full p-2 text-[#4D5240] hover:bg-[#15140C]/6"
                      aria-label="Atualizar horários"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {scheduleNotice && (
                  <div className="mb-3 flex gap-2 rounded-xl bg-amber-100 p-3 text-xs text-amber-900">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {scheduleNotice}
                  </div>
                )}

                {loadingSlots ? (
                  <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-[#C4B49A]/50 bg-white/60">
                    <span className="flex items-center gap-2 text-sm text-[#15140C]/55">
                      <Loader2 className="h-5 w-5 animate-spin text-[#4E7A36]" />
                      Consultando agenda...
                    </span>
                  </div>
                ) : availabilityError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="h-4 w-4" />
                      {availabilityError}
                    </p>
                    <button
                      type="button"
                      onClick={() => setAvailabilityVersion((version) => version + 1)}
                      className="mt-3 text-xs font-bold underline"
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#C4B49A]/50 bg-white/60 p-6 text-center">
                    <Calendar className="mx-auto h-7 w-7 text-[#4D5240]/45" />
                    <p className="mt-2 text-sm font-semibold">Nenhum horário disponível</p>
                    <p className="mt-1 text-xs text-[#15140C]/50">
                      Escolha outra data para continuar.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => {
                      const selected = selectedSlot?.startTime === slot.startTime;
                      return (
                        <button
                          key={slot.startTime}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-xl border px-2 py-3 text-center transition-all ${
                            selected
                              ? 'border-[#4E7A36] bg-[#4E7A36] text-white shadow-md'
                              : 'border-[#C4B49A]/30 bg-white hover:border-[#4E7A36]/60'
                          }`}
                        >
                          <span className="block text-sm font-bold">{slot.startTime}</span>
                          <span className={`block text-[10px] ${selected ? 'text-white/70' : 'text-[#15140C]/45'}`}>
                            até {slot.endTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'details' && selectedSlot && (
            <form id="booking-details-form" onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setStep('schedule')}
                className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-[#4D5240] hover:text-[#4E7A36]"
              >
                <ArrowLeft className="h-4 w-4" />
                Alterar horário
              </button>

              <div className="mb-5 rounded-2xl bg-[#4D5240] p-4 text-white">
                <p className="font-serif text-lg font-semibold">{selectedService.title}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75">
                  <span className="flex items-center gap-1.5 capitalize">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(selectedDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {selectedSlot.startTime}–{selectedSlot.endTime}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#4E7A36]" />
                    Nome completo
                  </span>
                  <input
                    required
                    minLength={2}
                    autoComplete="name"
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="mt-2 w-full rounded-xl border border-[#C4B49A]/35 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#15140C] outline-none focus:border-[#4E7A36]"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#4E7A36]" />
                      WhatsApp
                    </span>
                    <input
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={clientPhone}
                      onChange={(event) => setClientPhone(formatPhone(event.target.value))}
                      placeholder="(31) 99999-9999"
                      className="mt-2 w-full rounded-xl border border-[#C4B49A]/35 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#15140C] outline-none focus:border-[#4E7A36]"
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-[#15140C]/65">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#4E7A36]" />
                      E-mail (opcional)
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={clientEmail}
                      onChange={(event) => setClientEmail(event.target.value)}
                      placeholder="voce@email.com"
                      className="mt-2 w-full rounded-xl border border-[#C4B49A]/35 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#15140C] outline-none focus:border-[#4E7A36]"
                    />
                  </label>
                </div>
              </div>

              {submitError && (
                <div className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-800">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {submitError}
                </div>
              )}

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#4E7A36]/8 p-3 text-[11px] leading-relaxed text-[#15140C]/65">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4E7A36]" />
                Esta é uma demonstração. Os dados ficam somente na memória do servidor local e são apagados quando ele reinicia.
              </p>
            </form>
          )}

          {step === 'success' && confirmedBooking && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#4E7A36] text-white shadow-lg shadow-[#4E7A36]/20">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4E7A36]">
                Confirmação de teste
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold">
                Obrigado, {confirmedBooking.clientName.split(' ')[0]}!
              </h3>

              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-[#C4B49A]/30 bg-white p-5 text-left">
                <div className="flex items-center justify-between gap-3 border-b border-[#C4B49A]/25 pb-3">
                  <span className="text-xs text-[#15140C]/50">Código da reserva</span>
                  <strong className="text-sm tracking-wide text-[#4D5240]">{confirmedBooking.id}</strong>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#15140C]/50">Serviço</dt>
                    <dd className="text-right font-semibold">{confirmedBooking.serviceTitle}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#15140C]/50">Data</dt>
                    <dd className="text-right font-semibold capitalize">{formatDate(confirmedBooking.date)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#15140C]/50">Horário</dt>
                    <dd className="text-right font-semibold">
                      {confirmedBooking.startTime}–{confirmedBooking.endTime}
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-amber-800">
                Esta reserva ainda não será enviada ao Google Calendar e desaparecerá quando o servidor de teste for reiniciado.
              </p>

              <button
                type="button"
                onClick={sendConfirmationToWhatsApp}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#4E7A36]/25 bg-[#4E7A36]/8 px-5 py-2.5 text-sm font-semibold text-[#4E7A36] hover:bg-[#4E7A36]/12"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar resumo pelo WhatsApp
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-[#C4B49A]/25 bg-white/55 px-5 py-4 sm:px-8">
          {step === 'service' && (
            <button
              type="button"
              onClick={() => setStep('schedule')}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4E7A36] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4E7A36]/20 transition-colors hover:bg-[#4D5240]"
            >
              Ver horários disponíveis
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {step === 'schedule' && (
            <button
              type="button"
              disabled={!selectedSlot || loadingSlots}
              onClick={() => {
                setSubmitError('');
                setStep('details');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4E7A36] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4E7A36]/20 transition-colors hover:bg-[#4D5240] disabled:cursor-not-allowed disabled:bg-[#15140C]/20 disabled:shadow-none"
            >
              {selectedSlot ? `Continuar com ${selectedSlot.startTime}` : 'Selecione um horário'}
              {selectedSlot && <ArrowRight className="h-4 w-4" />}
            </button>
          )}

          {step === 'details' && (
            <button
              type="submit"
              form="booking-details-form"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4E7A36] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4E7A36]/20 transition-colors hover:bg-[#4D5240] disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Confirmando horário...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Confirmar agendamento
                </>
              )}
            </button>
          )}

          {step === 'success' && (
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={resetBooking}
                className="rounded-full border border-[#4D5240]/20 px-4 py-3 text-sm font-semibold text-[#4D5240] hover:bg-[#4D5240]/6"
              >
                Fazer outro teste
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#4D5240] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4E7A36]"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
