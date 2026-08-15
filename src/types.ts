export type TransformationTarget = 'hogar' | 'empresa' | 'constructivo';

export type SpaceType = 'hogar' | 'oficina' | 'comercio' | 'industria' | 'constructivo';

export type ClientType = 'particular' | 'empresa' | 'constructor';

export type SurfaceCondition = 'bueno' | 'humedad' | 'desconchado' | 'moho' | 'fisuras' | 'oxido' | 'manchas';

export type TrafficLevel = 'bajo' | 'medio' | 'alto' | 'extremo';

export type FinishType = 'mate' | 'satinado' | 'semibrillante' | 'brillante' | 'texturado';

// Estados solicitados: 🟢 Recibida, 🟡 Analizando, 🔵 Revisión técnica, 🟣 Recomendación lista
export type RequestStatus = 'recibida' | 'analizando' | 'revision_tecnica' | 'recomendacion_lista';
export type ProjectStatus = RequestStatus;

export interface ProjectImage {
  id: string;
  url: string;
  fileName: string;
  caption?: string;
  source?: 'upload' | 'camera' | 'sample';
}

export interface TransformationStyleOption {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  colorCode: string;
  finish: string;
  mood: string;
  afterImageUrl: string;
  description: string;
}

export interface SampleImageOption {
  id: string;
  title: string;
  category: SpaceType;
  clientType: ClientType;
  transformationTarget: TransformationTarget;
  surface: string;
  problem: string;
  url: string;
  afterUrl: string;
  additionalUrls?: string[];
  defaultDescription: string;
  areaM2: number;
  locationCity?: string;
  recommendedColor?: {
    name: string;
    hex: string;
    code: string;
  };
}

export interface SmartAiQuestion {
  id: string;
  question: string;
  explanation: string;
  options: { label: string; impact: string }[];
  answeredOption?: string;
}

export interface ClientProjectInput {
  // Nueva propuesta: "¿Qué quieres transformar?"
  transformationTarget: TransformationTarget;
  clientType: ClientType;
  
  // Particular client
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCity: string;

  // Empresa / Constructivo client
  companyName?: string;
  companyNit?: string;
  companyContactPerson?: string;

  // Contexto del espacio adaptado
  specificSpaceSubtype: string; // ej: "Habitación", "Sala", "Oficina", "Fachada gran formato"
  housingGoal?: 'Cambio de color & Estilo' | 'Renovación integral' | 'Reparación de daños / Humedad' | 'Obra nueva';

  // General details
  spaceType: SpaceType;
  specificArea: string;
  currentCondition: SurfaceCondition;
  estimatedM2: number;
  trafficLevel: TrafficLevel;
  urgency: 'normal' | 'alta' | 'inmediata';
  description: string;
  
  // Photos
  imageUrl: string;
  afterImageUrl?: string;
  imageFileName?: string;
  images?: ProjectImage[];

  // Transformation simulation selection
  selectedColorHex?: string;
  selectedColorName?: string;
  selectedColorCode?: string;
  selectedFinish: FinishType;
  selectedStyle?: string;

  aiFollowUpAnswer?: string;
}

export interface AiDetectionArea {
  id: string;
  label: string;
  confidence: number;
  x: number; // percentage
  y: number;
  width: number;
  height: number;
  severity: 'baja' | 'media' | 'alta' | 'critica';
  description: string;
}

export interface AiTechnicalAnalysis {
  detectedSurface: string;
  primaryProblem: string;
  secondaryObservations: string[];
  environmentalFactors: string[];
  ambientContext: string;
  complexityLevel: 'Baja (DIY)' | 'Media' | 'Alta' | 'Especializada';
  overallConfidence: number; // e.g. 98.4
  environmentalSuitability: string;
  moistureIndex: number; // 0-100%
  adhesionScore: number; // 0-100%
  detectionAreas: AiDetectionArea[];
  processingTimeMs: number;
  smartFollowUp?: SmartAiQuestion;
  conversationalSummary: string;
}

export interface CoatingProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  pintucoLine?: string; // ej. Viniltex, Koraza, Pintulux, Pintucoat
  type: string;
  base: string;
  yieldM2PerLiter: number;
  recommendedCoats: number;
  dryingTimeHours: number;
  durabilityYears: number;
  features: string[];
  pricePerLiterEst: number;
  presentationTypes?: string[]; // Galón, Cuñete, 1/4 Galón
}

export interface TechnicalRecommendation {
  recommendedSystem: string;
  pintucoFamilyName: string; // ej: "Sistema Viniltex Biocuidado & Sellomax"
  systemSummary: string;
  solutionType: string;
  primerProduct: CoatingProduct;
  mainCoatingProduct: CoatingProduct;
  preparationSteps: string[];
  calculatedLiters: number;
  calculatedGallons: number;
  calculatedBuckets?: number; // Cuñetes (5 galones)
  calculatedPrimerLiters: number;
  estimatedLaborDays: number;
  complexityLevel: 'Fácil (DIY)' | 'Moderado' | 'Técnico Especializado';
  estimatedCostRange: {
    min: number;
    max: number;
    currency: string;
  };
  technicalAdvice: string;
  warrantyPeriod: string;
  suggestedFinish: string;
  suggestedStyle: string;
  selectedColorHex?: string;
  selectedColorName?: string;
  selectedColorCode?: string;
  nextSteps: {
    title: string;
    description: string;
    actionLabel: string;
  }[];
}

export interface ProjectRequest {
  id: string;
  code: string;
  createdAt: string;
  clientType: ClientType;
  client: {
    name: string;
    email: string;
    phone: string;
    city: string;
    companyName?: string;
    companyNit?: string;
    contactPerson?: string;
  };
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  status: RequestStatus;
  technicianNotes?: string;
  assignedTechnician?: string;
  quotedAmount?: number;
  lastUpdated?: string;
}
