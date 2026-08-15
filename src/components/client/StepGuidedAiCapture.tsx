import React, { useRef, useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  MessageSquare,
  Maximize2,
  Zap,
  HelpCircle,
  MapPin,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { ClientProjectInput, SampleImageOption, SurfaceCondition } from '../../types';
import { SAMPLE_IMAGES } from '../../data/mockData';

interface StepGuidedAiCaptureProps {
  input: ClientProjectInput;
  onChange: (updates: Partial<ClientProjectInput>) => void;
  onSelectSampleImage: (sample: SampleImageOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepGuidedAiCapture: React.FC<StepGuidedAiCaptureProps> = ({
  input,
  onChange,
  onSelectSampleImage,
  onNext,
  onBack
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSimulatingCamera, setIsSimulatingCamera] = useState(false);
  const [cameraCountdown, setCameraCountdown] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'samples' | 'camera'>('upload');

  const conditionsList: { id: SurfaceCondition; label: string; icon: string; desc: string }[] = [
    { id: 'humedad', label: 'Humedad / Salitre', icon: '💧', desc: 'Pared fría, eflorescencias salinas o zócalo manchado' },
    { id: 'moho', label: 'Moho / Hongos', icon: '🦠', desc: 'Puntos oscuros o manchas biológicas en cielo/pared' },
    { id: 'desconchado', label: 'Desprendimiento', icon: '🏚️', desc: 'Pintura soplada, ampollas o estuco que cae en polvo' },
    { id: 'fisuras', label: 'Microfisuras / Sol', icon: '☀️', desc: 'Grietas por dilatación térmica o resequedad exterior' },
    { id: 'bueno', label: 'En buen estado', icon: '✨', desc: 'Superficie lisa y firme, lista para renovar color' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          imageUrl: reader.result as string,
          imageFileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerCameraCapture = () => {
    setIsSimulatingCamera(true);
    setCameraCountdown(3);

    const timer = setInterval(() => {
      setCameraCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsSimulatingCamera(false);
          // Load a high-res captured photo
          const capturedSample = SAMPLE_IMAGES[0];
          onChange({
            imageUrl: capturedSample.url,
            imageFileName: 'foto_captura_celular.jpg',
            description: input.description || 'Fotografía capturada desde la cámara del dispositivo para peritaje de superficie.'
          });
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 animate-fadeIn">
      
      {/* Header with Advisor Tone */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Asistente de Visión & Peritaje Pintuco</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Muéstranos tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">espacio</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Sube una fotografía de la pared o fachada. Nuestra IA examinará el estado del sustrato, patologías de humedad y exposición para prescribir el sistema Pintuco exacto.
        </p>
      </div>

      {/* Main Interactive Capture Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Photo Upload / Camera / Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Capture Method Tabs */}
          <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir Foto</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('camera');
                handleTriggerCameraCapture();
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Tomar con Celular</span>
            </button>

            <button
              onClick={() => setActiveTab('samples')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'samples'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Casos Reales</span>
            </button>
          </div>

          {/* Photo Preview / Dropzone Container */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 aspect-video group">
            
            {input.imageUrl ? (
              <>
                <img
                  src={input.imageUrl}
                  alt="Espacio para peritaje"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Overlaid Tags */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Foto Lista para Escaneo IA</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium truncate max-w-[220px]">
                    📁 {input.imageFileName || 'muro_espacio.jpg'}
                  </span>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-[11px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Cambiar Foto</span>
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-900/80 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-white">
                  Arrastra tu fotografía aquí o haz clic para seleccionarla
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Formatos JPG, PNG, WebP (alta resolución recomendada)
                </p>
              </div>
            )}

            {/* Camera Simulated Countdown Overlay */}
            {isSimulatingCamera && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-300 font-mono">
                    {cameraCountdown}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white font-mono">
                  Enfocando superficie y calibrando luz natural...
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Sample Cases Carousel when in samples tab */}
          {activeTab === 'samples' && (
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Casos reales frecuentes en Colombia (prueba instantánea):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_IMAGES.map((sample) => {
                  const isSelected = input.imageUrl === sample.url;
                  return (
                    <div
                      key={sample.id}
                      onClick={() => onSelectSampleImage(sample)}
                      className={`p-2 rounded-xl border cursor-pointer transition-all text-left flex flex-col space-y-1.5 ${
                        isSelected
                          ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <span className="text-[11px] font-medium text-white truncate">
                        {sample.title}
                      </span>
                      <span className="text-[10px] text-cyan-300 font-mono">
                        📍 {sample.locationCity || 'Colombia'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Context & Space Sizing (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          
          {/* Surface Condition Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>¿Qué estado observas en la pared?</span>
              <span className="text-[10px] text-cyan-400 font-mono">Guía visual</span>
            </label>

            <div className="space-y-2">
              {conditionsList.map((cond) => {
                const isSelected = input.currentCondition === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => onChange({ currentCondition: cond.id })}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 text-left ${
                      isSelected
                        ? 'bg-slate-800/95 border-cyan-500 text-white shadow-sm'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-lg shrink-0">{cond.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white truncate">
                          {cond.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight truncate">
                        {cond.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Estimator Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Área aproximada a pintar:</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {input.estimatedM2} m²
              </span>
            </div>

            <input
              type="range"
              min={6}
              max={150}
              step={2}
              value={input.estimatedM2}
              onChange={(e) => onChange({ estimatedM2: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>6 m² (baño/muro)</span>
              <span>30 m² (habitación)</span>
              <span>150 m² (completo)</span>
            </div>
          </div>

          {/* Short Note / Description */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nota corta o detalle que quieras contarnos:</span>
            </label>
            <textarea
              rows={2}
              value={input.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Ej: Hay manchas en la parte baja y queremos un tono cálido lino lavable..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none resize-none"
            />
          </div>

        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          id="btn-next-to-analysis"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer"
        >
          <span>Ejecutar Diagnóstico IA & Ver Transformación</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
