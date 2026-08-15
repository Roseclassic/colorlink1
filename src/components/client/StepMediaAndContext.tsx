import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Camera,
  Layers,
  User,
  Mail,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { SAMPLE_IMAGES } from '../../data/mockData';
import { ClientProjectInput, SampleImageOption } from '../../types';

interface StepMediaAndContextProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectSampleImage: (sample: SampleImageOption) => void;
}

export const StepMediaAndContext: React.FC<StepMediaAndContextProps> = ({
  input,
  onChange,
  onNext,
  onPrev,
  onSelectSampleImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecordingSim, setIsRecordingSim] = useState(false);

  const quickDescriptionTags = [
    'Humedad persistente en zócalo',
    'Buscamos acabado mate sin olor',
    'Tráfico constante de personas',
    'Pintura descascarillada en esquinas',
    'Cambio de color corporativo',
    'Necesitamos máxima lavabilidad'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onChange({
            imageUrl: uploadEvent.target.result as string,
            imageFileName: file.name
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onChange({
            imageUrl: uploadEvent.target.result as string,
            imageFileName: file.name
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSimulatedVoice = () => {
    setIsRecordingSim(true);
    setTimeout(() => {
      setIsRecordingSim(false);
      onChange({
        description: input.description
          ? `${input.description}. Pared con manchas de humedad en la base y desprendimiento al tacto.`
          : 'Pared principal con manchas de humedad en la base y desprendimiento de pintura al tacto. Deseamos acabado mate lavable y secado rápido.'
      });
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="space-y-2 text-left sm:text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
          Paso 3 de 4 • Captura Inteligente & Visión
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Sube una foto y describe brevemente el estado
        </h2>
        <p className="text-sm text-slate-400 max-w-xl sm:mx-auto">
          El modelo de visión de ColorLink escaneará la textura, porosidad, microfisuras e índice de humedad.
        </p>
      </div>

      {/* Media Upload Area & Sample Image Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Photo Dropzone (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <label className="block text-sm font-semibold text-white">
            1. Fotografía de la superficie o muro
          </label>

          <div
            id="dropzone-photo"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden min-h-[260px] flex flex-col items-center justify-center p-6 text-center group ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                : input.imageUrl
                ? 'border-cyan-500/50 bg-slate-900/80'
                : 'border-slate-700/80 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {input.imageUrl ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner border border-slate-800">
                  <img
                    src={input.imageUrl}
                    alt="Superficie a analizar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono text-cyan-300 bg-slate-950/80 px-2 py-1 rounded-md border border-cyan-500/30 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        {input.imageFileName || 'Foto cargada lista para IA'}
                      </span>
                      <span className="text-[11px] text-slate-300 bg-slate-900/90 px-2 py-1 rounded-md">
                        Haz clic para cambiar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Arrastra tu foto aquí o <span className="text-cyan-400 underline">haz clic para explorar</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Soporta JPG, PNG, WEBP o captura directa desde móvil
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick preset thumbnail bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">O elige una foto real de muestra:</span>
              <span className="text-[11px] text-cyan-400">Prueba instantánea</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onSelectSampleImage(sample)}
                  className={`relative rounded-xl overflow-hidden h-14 border transition-all cursor-pointer group/thumb ${
                    input.imageUrl === sample.url
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                      : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                  title={sample.title}
                >
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                  />
                  {input.imageUrl === sample.url && (
                    <div className="absolute inset-0 bg-cyan-950/40 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Short Description & Voice Assistant (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-white">
              2. Breve descripción o detalles clave
            </label>
            <button
              type="button"
              onClick={toggleSimulatedVoice}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isRecordingSim
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700'
              }`}
              title="Dictar o autocompletar descripción con IA"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isRecordingSim ? 'Escuchando...' : 'Dictar por voz'}</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              id="input-project-description"
              rows={4}
              value={input.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Ej: Muro con pintura abombada por filtración previa. Queremos tono neutro cálido y que sea muy fácil de limpiar sin dejar marcas..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Quick Tags for fast context */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Añadir notas rápidas con 1 clic:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickDescriptionTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const next = input.description ? `${input.description}. ${tag}` : tag;
                    onChange({ description: next });
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 border border-slate-700/50 transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Contact fields for CRM link */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-3 pt-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tus datos para vincular el informe:</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={input.clientName}
                onChange={(e) => onChange({ clientName: e.target.value })}
                placeholder="Tu nombre o empresa"
                className="px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <input
                type="email"
                value={input.clientEmail}
                onChange={(e) => onChange({ clientEmail: e.target.value })}
                placeholder="Email para el reporte"
                className="px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-media-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        <button
          id="btn-start-ai-analysis"
          onClick={onNext}
          className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:scale-[1.02] cursor-pointer active:scale-95"
        >
          <Sparkles className="w-5 h-5 text-cyan-200 animate-spin" />
          <span>Ejecutar Análisis IA con Visión Artificial</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
