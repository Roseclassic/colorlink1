export type SpaceType = 'hogar' | 'oficina' | 'comercio' | 'industria';

export type SurfaceCondition = 'bueno' | 'humedad' | 'desconchado' | 'moho' | 'fisuras' | 'oxido' | 'manchas';

export type TrafficLevel = 'bajo' | 'medio' | 'alto' | 'extremo';

export type FinishType = 'mate' | 'satinado' | 'brillante' | 'texturado';

export type RequestStatus = 'nueva' | 'en_analisis' | 'validada' | 'finalizada';

export interface SampleImageOption {
  id: string;
  title: string;
  category: SpaceType;
  surface: string;
  problem: string;
  url: string;
  defaultDescription: string;
  areaM2: number;
}

export interface ClientProjectInput {
  spaceType: SpaceType;
  specificArea: string;
  currentCondition: SurfaceCondition;
  estimatedM2: number;
  trafficLevel: TrafficLevel;
  urgency: 'normal' | 'alta' | 'inmediata';
  description: string;
  imageUrl: string;
  imageFileName?: string;
  preferredFinish: FinishType;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCity: string;
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
  complexityLevel: 'Baja' | 'Media' | 'Alta' | 'Especializada';
  overallConfidence: number; // e.g. 98.4
  environmentalSuitability: string;
  moistureIndex: number; // 0-100%
  adhesionScore: number; // 0-100%
  detectionAreas: AiDetectionArea[];
  processingTimeMs: number;
}

export interface CoatingProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  type: string;
  base: string;
  yieldM2PerLiter: number;
  recommendedCoats: number;
  dryingTimeHours: number;
  durabilityYears: number;
  features: string[];
  pricePerLiterEst: number;
}

export interface TechnicalRecommendation {
  recommendedSystem: string;
  systemSummary: string;
  primerProduct: CoatingProduct;
  mainCoatingProduct: CoatingProduct;
  preparationSteps: string[];
  calculatedLiters: number;
  calculatedPrimerLiters: number;
  estimatedLaborDays: number;
  estimatedCostRange: {
    min: number;
    max: number;
    currency: string;
  };
  technicalAdvice: string;
  warrantyPeriod: string;
  selectedColorHex?: string;
  selectedColorName?: string;
}

export interface ProjectRequest {
  id: string;
  code: string;
  createdAt: string;
  client: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
  input: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  status: RequestStatus;
  technicianNotes?: string;
  assignedTechnician?: string;
  quotedAmount?: number;
  lastUpdated: string;
}
