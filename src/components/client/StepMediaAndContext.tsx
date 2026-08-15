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
  Plus,
  Trash2,
  Scan,
  Eye,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_IMAGES } from '../../data/mockData';
import { ClientProjectInput, ProjectImage, SampleImageOption } from '../../types';

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
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecordingSim, setIsRecordingSim] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const isParticular = input.clientType === 'particular';

  // Quick Description tags adapted for segment
  const quickDescriptionTags = isParticular
    ? [
        'Humedad en zócalo inferior',
        'Buscamos tono cálido y lavable',
        'Pintura que se descascara al tacto',
        'Queremos cero olor para habitar hoy',
        'Renovación total de habitación',
        'Microfisuras en esquina de ventana'
      ]
    : [
        'Tráfico continuo de personas / carretillas',
        'Manchas de grasa y desgaste mecánico',
        'Requiere aplicación express en fin de semana',
        'Exigencia de pintura ecológica VOC cero A+',
        'Homologación antideslizante para auditoría',
        'Cambio de identidad visual corporativa'
      ];

  // Filter sample images to match user client type
  const relevantSamples = SAMPLE_IMAGES.filter((s) => s.clientType === input.clientType || !s.clientType);
  const displaySamples = relevantSamples.length > 0 ? relevantSamples : SAMPLE_IMAGES;

  const currentImages: ProjectImage[] = input.images && input.images.length > 0
    ? input.images
    : input.imageUrl
    ? [{
        id: 'img-main',
        archivo: input.imageFileName || 'foto_principal.jpg',
        tipo: 'image/jpeg',
        fechaCarga: new Date().toISOString(),
        descripcion: 'Vista principal del espacio',
        categoria: 'muro_principal',
        url: input.imageUrl,
        fileName: input.imageFileName || 'foto_principal.jpg',
        caption: 'Vista principal',
        source: 'upload'
      }]
    : [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newUrl = uploadEvent.target.result as string;
          const newImg: ProjectImage = {
            id: `img-${Date.now()}`,
            archivo: file.name,
            tipo: file.type || 'image/jpeg',
            fechaCarga: new Date().toISOString(),
            descripcion: currentImages.length === 0 ? 'Vista general' : `Detalle #${currentImages.length + 1}`,
            categoria: currentImages.length === 0 ? 'muro_principal' : 'detalle_dano',
            url: newUrl,
            tamanioBytes: file.size,
            fileName: file.name,
            caption: currentImages.length === 0 ? 'Vista general' : `Detalle #${currentImages.length + 1}`,
            source: 'upload'
          };
          const updatedList = [newImg, ...currentImages.filter(img => img.url !== newUrl)];
          onChange({
            imageUrl: newUrl,
            imageFileName: file.name,
            images: updatedList,
            evidences: updatedList
          });
          setActivePhotoIndex(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSecondaryPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newUrl = uploadEvent.target.result as string;
          const newImg: ProjectImage = {
            id: `img-${Date.now()}`,
            archivo: file.name,
            tipo: file.type || 'image/jpeg',
            fechaCarga: new Date().toISOString(),
            descripcion: `Detalle ${currentImages.length + 1}`,
            categoria: 'detalle_dano',
            url: newUrl,
            tamanioBytes: file.size,
            fileName: file.name,
            caption: `Detalle ${currentImages.length + 1}`,
            source: 'upload'
          };
          const updatedList = [...currentImages, newImg];
          onChange({
            images: updatedList,
            evidences: updatedList
          });
          setActivePhotoIndex(updatedList.length - 1);
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
          const newUrl = uploadEvent.target.result as string;
          const newImg: ProjectImage = {
            id: `img-${Date.now()}`,
            archivo: file.name,
            tipo: file.type || 'image/jpeg',
            fechaCarga: new Date().toISOString(),
            descripcion: 'Foto arrastrada',
            categoria: 'muro_principal',
            url: newUrl,
            tamanioBytes: file.size,
            fileName: file.name,
            caption: 'Foto arrastrada',
            source: 'upload'
          };
          const updatedList = [newImg, ...currentImages];
          onChange({
            imageUrl: newUrl,
            imageFileName: file.name,
            images: updatedList,
            evidences: updatedList
          });
          setActivePhotoIndex(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = currentImages.filter((img) => img.id !== id);
    if (updated.length > 0) {
      onChange({
        imageUrl: updated[0].url,
        imageFileName: updated[0].archivo || updated[0].fileName,
        images: updated,
        evidences: updated
      });
      setActivePhotoIndex(0);
    } else {
      onChange({
        imageUrl: '',
        imageFileName: '',
        images: [],
        evidences: []
      });
    }
  };

  const toggleSimulatedVoice = () => {
    setIsRecordingSim(true);
    setTimeout(() => {
      setIsRecordingSim(false);
      const voiceText = isParticular
        ? 'Pared del salón con manchas de humedad en la base y desprendimiento al tacto. Deseamos acabado mate lavable sin olor.'
        : 'Suelo industrial con tránsito continuo de carretillas elevadoras, marcas de neumáticos y necesidad de recubrimiento epóxico antideslizante.';
      onChange({
        description: input.description ? `${input.description}. ${voiceText}` : voiceText
      });
    }, 1300);
  };

  const activePhoto = currentImages[activePhotoIndex] || currentImages[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="space-y-2 text-left sm:text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
          <Scan className="w-3.5 h-3.5" />
          <span>Etapa Protagonista: Captura Visual & Contexto</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Sube fotografías de tu espacio para el escaneo IA
        </h2>
        <p className="text-sm text-slate-400 max-w-xl sm:mx-auto leading-relaxed">
          Nuestra visión artificial analizará la textura del sustrato, porosidad, microfisuras e índice de humedad para generar la fórmula de pintura exacta.
        </p>
      </div>

      {/* Main Protagonist Upload & Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Photo Protagonist Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Fotos del proyecto ({currentImages.length})</span>
            </label>
            <span className="text-xs text-cyan-400 font-mono">
              {currentImages.length > 0 ? '✓ Listo para escaneo' : 'Requerido'}
            </span>
          </div>

          {/* Large Protagonist Viewer / Dropzone */}
          <div
            id="dropzone-photo"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-4 text-center group ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/15 scale-[1.01]'
                : activePhoto
                ? 'border-cyan-500/50 bg-slate-900/90'
                : 'border-dashed border-slate-700/80 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/80 cursor-pointer'
            }`}
            onClick={() => {
              if (!activePhoto) fileInputRef.current?.click();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {activePhoto ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black">
                  <img
                    src={activePhoto.url}
                    alt="Superficie analizada"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Scanner HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 backdrop-blur-md">
                        <Scan className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                        <span>SENSOR ÓPTICO ACTIVO</span>
                      </span>

                      <span className="px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-semibold text-slate-300 border border-slate-800">
                        {activePhoto.caption || 'Foto seleccionada'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white">
                      <span className="font-mono text-[11px] text-slate-300 truncate max-w-[200px]">
                        {activePhoto.fileName}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="pointer-events-auto px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 text-[11px] text-cyan-300 border border-slate-700 transition-colors"
                      >
                        Cambiar foto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-base font-bold text-white">
                    Arrastra una foto aquí o <span className="text-cyan-400 underline">haz clic para explorar</span>
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Soporta fotos desde tu móvil, cámara en vivo o galería de imágenes (JPG, PNG, WEBP).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Multi-Photo Thumbnails Strip & Add Secondary Button */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {currentImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border cursor-pointer group/thumb transition-all ${
                  activePhotoIndex === idx
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                    : 'border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => handleRemovePhoto(img.id, e)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-rose-400 opacity-0 group-hover/thumb:opacity-100 hover:bg-rose-500 hover:text-white transition-all"
                  title="Eliminar foto"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
                {activePhotoIndex === idx && (
                  <div className="absolute bottom-0 inset-x-0 bg-cyan-500 text-slate-950 text-[9px] font-bold text-center py-0.5">
                    Activa
                  </div>
                )}
              </div>
            ))}

            {/* Add more photos button */}
            <input
              ref={additionalFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddSecondaryPhoto}
            />
            <button
              type="button"
              onClick={() => additionalFileInputRef.current?.click()}
              className="shrink-0 w-20 h-16 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 hover:border-cyan-500/50 flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
              title="Añadir foto de ángulo secundario o detalle"
            >
              <Plus className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium">+ Foto</span>
            </button>
          </div>

          {/* Sample Cases Drawer */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                O prueba un caso real de muestra ({isParticular ? 'Particular' : 'Empresarial'}):
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">1 Clic Demo</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {displaySamples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    onSelectSampleImage(sample);
                    setActivePhotoIndex(0);
                  }}
                  className={`relative rounded-lg overflow-hidden h-16 border transition-all text-left p-1.5 flex flex-col justify-end group/item ${
                    input.imageUrl === sample.url
                      ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/item:opacity-60 transition-opacity"
                  />
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold text-white truncate drop-shadow-md">
                      {sample.title}
                    </p>
                    <span className="text-[9px] text-cyan-300 font-mono">
                      {sample.problem.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Context Description & Smart Voice (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>Contexto o detalles adicionales</span>
            </label>

            <button
              type="button"
              onClick={toggleSimulatedVoice}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRecordingSim
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 cursor-pointer'
              }`}
              title="Dictar descripción mediante IA de voz"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isRecordingSim ? 'Escuchando...' : 'Dictar por voz'}</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              id="input-project-description"
              rows={5}
              value={input.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder={
                isParticular
                  ? 'Describe qué observas en la pared (humedad, ampollas, grietas o simplemente cambio de tono estético)...'
                  : 'Describe las condiciones de uso, exposición a químicos, tráfico de maquinaria o especificaciones requeridas...'
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none transition-all resize-none shadow-inner"
            />
          </div>

          {/* Quick Context Chips */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Añadir notas rápidas contextuales:
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
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 border border-slate-700/50 transition-colors text-left"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reconocimiento Previo de IA:</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El motor de visión cruzará estas imágenes con la base de datos de recubrimientos técnicos para calcular manos, imprimación y durabilidad garantizada.
            </p>
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
          <Sparkles className="w-5 h-5 text-cyan-200" />
          <span>Ejecutar Análisis IA con Visión Artificial</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

