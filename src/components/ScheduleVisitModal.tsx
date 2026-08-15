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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn text-slate-800">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-left space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Agendar Inspección Técnica
              </h3>
              <p className="text-xs text-slate-500">
                Verificación in-situ y asesoría técnica de expertos Pintuco
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase font-mono text-slate-700">
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
                    ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs">{d.label}</div>
                <div className="text-[10px] text-amber-700 font-mono mt-0.5">{d.slots}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase font-mono text-slate-700">
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
                    ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Client Info */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-700">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Contacto: <strong className="text-slate-900">{input.clientName || 'Cliente ColorLink'}</strong> ({input.clientCity || 'Bogotá D.C.'})</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Visita técnica respaldada por Pintuco Colombia</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-confirm-visit-booking"
          onClick={handleBooking}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            isSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
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
