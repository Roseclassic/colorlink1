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
  RefreshCw,
  Check,
  Award,
  ShieldCheck
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
          const capturedSample = SAMPLE_IMAGES[0];
          onChange({
            imageUrl: capturedSample.url,
            imageFileName: 'foto_captura_celular.jpg',
            description: input.description || 'Fotografía capturada desde la cámara para peritaje de superficie Pintuco.'
          });
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 animate-fadeIn text-slate-800">
      
      {/* Header with Warm Advisor Tone */}
      <div className="text-center space-y-3 pt-1">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Paso 2: Foto de tu Espacio & Estado del Muro</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Muéstranos tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">espacio</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Sube una foto o tómala con tu celular. La IA evaluará el sustrato, condiciones de humedad y calculará la dosis exacta para tu espacio.
        </p>
      </div>

      {/* Main Interactive Capture Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column: Photo Upload / Camera / Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* Capture Method Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 min-h-[44px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4 text-amber-600" />
              <span>Subir Foto</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('camera');
                handleTriggerCameraCapture();
              }}
              className={`flex-1 min-h-[44px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-600" />
              <span>Tomar con Celular</span>
            </button>

            <button
              onClick={() => setActiveTab('samples')}
              className={`flex-1 min-h-[44px] py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'samples'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Casos Demo</span>
            </button>
          </div>

          {/* Photo Preview / Dropzone Container */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-video group shadow-sm">
            
            {input.imageUrl ? (
              <>
                <img
                  src={input.imageUrl}
                  alt="Espacio para diagnóstico"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Tags */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] text-slate-800 border border-slate-200 flex items-center gap-1.5 font-bold shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Listo para Diagnóstico Pintuco</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-white font-medium truncate max-w-[200px] drop-shadow-sm">
                    📁 {input.imageFileName || 'muro_espacio.jpg'}
                  </span>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Cambiar Foto</span>
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Toca para seleccionar tu foto o arrastra el archivo aquí
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Formatos JPG, PNG, WebP
                </p>
              </div>
            )}

            {/* Camera Simulated Countdown Overlay */}
            {isSimulatingCamera && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-800 font-mono">
                    {cameraCountdown}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 font-mono text-center px-4">
                  Enfocando superficie y calibrando iluminación...
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
            <div className="space-y-2 pt-1 animate-fadeIn text-left">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider font-mono">
                Casos de referencia en Colombia:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_IMAGES.map((sample) => {
                  const isSelected = input.imageUrl === sample.url;
                  return (
                    <div
                      key={sample.id}
                      onClick={() => onSelectSampleImage(sample)}
                      className={`p-2.5 rounded-2xl border cursor-pointer transition-all text-left flex flex-col space-y-1.5 active:scale-95 ${
                        isSelected
                          ? 'bg-amber-50 border-amber-400 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-16 object-cover rounded-xl"
                      />
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {sample.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
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
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-left">
          
          {/* Surface Condition Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>¿Qué estado observas en el muro?</span>
              <span className="text-[10px] text-amber-700 font-medium">Diagnóstico</span>
            </label>

            <div className="space-y-2">
              {conditionsList.map((cond) => {
                const isSelected = input.currentCondition === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => onChange({ currentCondition: cond.id })}
                    className={`min-h-[48px] p-3 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3 text-left active:scale-[0.98] ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-lg shrink-0">{cond.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {cond.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight truncate">
                        {cond.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Estimator Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Área estimada a pintar:</span>
              <span className="font-mono text-amber-900 font-bold bg-amber-100 px-2.5 py-0.5 rounded-lg">
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
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>6 m² (baño)</span>
              <span>28 m² (habitación)</span>
              <span>150 m² (fachada)</span>
            </div>
          </div>

          {/* Short Note / Description */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>Detalles adicionales para tu asesor:</span>
            </label>
            <textarea
              rows={2}
              value={input.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Ej: Hay un poco de humedad cerca al suelo y queremos un tono cálido y luminoso..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 outline-none resize-none"
            />
          </div>

        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          id="btn-next-to-analysis"
          onClick={onNext}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Ver Diagnóstico & Simulación de Color</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

    </div>
  );
};
