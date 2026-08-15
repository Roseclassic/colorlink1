import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ClientProjectInput } from '../types';

interface ScheduleVisitModalProps {
  input: ClientProjectInput;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  input,
  onClose,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-08-18');
  const [selectedTime, setSelectedTime] = useState('10:00 - 11:30');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableDates = [
    { date: '2026-08-18', label: 'Mar, 18 Ago', slots: '3 turnos' },
    { date: '2026-08-19', label: 'Mié, 19 Ago', slots: '4 turnos' },
    { date: '2026-08-20', label: 'Jue, 20 Ago', slots: '2 turnos' },
    { date: '2026-08-21', label: 'Vie, 21 Ago', slots: '5 turnos' }
  ];

  const timeSlots = [
    '09:00 - 10:30',
    '10:30 - 12:00',
    '12:30 - 14:00',
    '16:00 - 17:30',
    '17:30 - 19:00'
  ];

  const handleBooking = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(selectedDate, selectedTime);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-left space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Agendar Inspección Técnica
              </h3>
              <p className="text-xs text-slate-400">
                Verificación in-situ y toma de muestras de humedad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300">
            1. Selecciona Fecha
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableDates.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedDate === d.date
                    ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs">{d.label}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{d.slots}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase font-mono text-slate-300">
            2. Franja Horaria
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  selectedTime === slot
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Client Info */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contacto: <strong className="text-white">{input.clientName || 'Cliente ColorLink'}</strong> ({input.clientCity || 'Madrid'})</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Visita técnica gratuita incluida en el diagnóstico digital</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-confirm-visit-booking"
          onClick={handleBooking}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            isSuccess
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>¡Cita Reservada con Éxito!</span>
            </>
          ) : (
            <>
              <span>Confirmar Cita para el {selectedDate} ({selectedTime})</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </div>
    </div>
  );
};
