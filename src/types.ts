export type TransformationTarget = 'hogar' | 'empresa' | 'constructivo';

// ENUM: Tipo de espacio (hogar / oficina / comercio / industria)
export type SpaceType = 'hogar' | 'oficina' | 'comercio' | 'industria';

// ENUM: Tipo de cliente (particular / empresa)
export type ClientType = 'particular' | 'empresa';

// ENUM: Tipo de superficie (concreto / madera / metal / drywall)
export type SurfaceType = 'concreto' | 'madera' | 'metal' | 'drywall';

// ENUM: Estado de la superficie (nuevo / desgaste / humedad / reparacion)
export type SurfaceConditionEnum = 'nuevo' | 'desgaste' | 'humedad' | 'reparacion';

// Backward-compatibility alias
export type SurfaceCondition = SurfaceConditionEnum | 'bueno' | 'desconchado' | 'moho' | 'fisuras' | 'oxido' | 'manchas';

export type TrafficLevel = 'bajo' | 'medio' | 'alto' | 'extremo';

export type FinishType = 'mate' | 'satinado' | 'semibrillante' | 'brillante' | 'texturado';

// Categoría de evidencia fotográfica
export type EvidenceCategory = 'muro_principal' | 'detalle_dano' | 'panoramica' | 'techo' | 'otro';

// 7 Estados del proceso en orden secuencial:
// 1. Nueva solicitud (nueva / recibida)
// 2. Información pendiente (info_pendiente)
// 3. Analizando IA (analizando)
// 4. Validación técnica (validacion_tecnica / revision_tecnica)
// 5. Recomendación generada (recomendacion_generada / recomendacion_lista)
// 6. Gestión comercial/operativa (gestion_comercial)
// 7. Finalizada (finalizada)
export type RequestStatus =
  | 'nueva'
  | 'recibida'
  | 'info_pendiente'
  | 'analizando'
  | 'validacion_tecnica'
  | 'revision_tecnica'
  | 'recomendacion_generada'
  | 'recomendacion_lista'
  | 'gestion_comercial'
  | 'finalizada';

export type ProjectStatus = RequestStatus;

// Perfil de Usuario / Cliente
export type DocumentType = 'CC' | 'CE' | 'Pasaporte' | 'NIT';

export interface SavedAddress {
  id: string;
  label: string; // Ej: 'Residencia Principal', 'Oficina', 'Local Comercial'
  city: string;
  locality?: string; // Localidad o Zona (ej: 'Chapinero', 'El Poblado', etc.)
  neighborhood?: string; // Barrio
  address: string; // Calle, carrera, número
  complement?: string; // Apto, torre, interior, oficina
  notes?: string; // Indicaciones para entrega (portería, citófono)
  details?: string; // Alias de compatibilidad
  isDefault?: boolean;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  clientType: ClientType;
  documentType?: DocumentType;
  documentNumber?: string;
  responsibleName?: string; // Para empresas
  companyName?: string;
  companyNit?: string;
  avatarUrl?: string;
  registeredDate: string;
  activeProjectsCount: number;
  savedAddresses?: SavedAddress[];
  acceptTerms?: boolean;
  acceptDataPolicy?: boolean;
}

// OBJETO DE EVIDENCIA FOTOGRÁFICA
export interface PhotoEvidence {
  id: string;
  archivo: string; // Nombre del archivo (STRING)
  tipo: string; // Tipo MIME (STRING, ej: 'image/jpeg')
  fechaCarga: string; // Fecha de carga (DATE ISO 8601 string)
  descripcion: string; // Descripción asociada (STRING)
  categoria: EvidenceCategory; // Categoría de imagen (ENUM)
  url: string; // URL o Data URL
  tamanioBytes?: number; // Tamaño en bytes (NUMBER)
  fileName?: string; // Alias de compatibilidad
  caption?: string; // Alias de compatibilidad
  source?: 'sample' | 'upload' | 'camera'; // Origen de la foto
}

// Alias for backward compatibility
export type ProjectImage = PhotoEvidence;

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
  surfaceType?: SurfaceType;
  conditionEnum?: SurfaceConditionEnum;
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

// MODELO DE ENTRADA CLIENTE (CAMPOS TIPADOS CON STRING, NUMBER, DATE, BOOLEAN, ENUM)
export interface ClientProjectInput {
  // RELATIONS
  clientId?: string;
  cliente_id?: string;
  projectId?: string;

  // ENUMS
  transformationTarget: TransformationTarget;
  clientType: ClientType; // 'particular' | 'empresa'
  spaceType: SpaceType; // 'hogar' | 'oficina' | 'comercio' | 'industria'
  surfaceType: SurfaceType; // 'concreto' | 'madera' | 'metal' | 'drywall'
  currentConditionEnum: SurfaceConditionEnum; // 'nuevo' | 'desgaste' | 'humedad' | 'reparacion'
  
  // STRINGS (Datos de cliente e información general)
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCity: string;
  companyName?: string;
  companyNit?: string;
  companyContactPerson?: string;
  specificSpaceSubtype: string; // ej: "Sala / Comedor", "Fachada", etc.
  specificArea: string; // Subzona o ubicación
  description: string; // Descripción del problema (STRING)
  observations?: string; // Observaciones adicionales (STRING)

  // NUMBERS (Cantidades, áreas y valores numéricos)
  estimatedM2: number; // Área aproximada en m² (NUMBER)
  spacesCount: number; // Cantidad de espacios (NUMBER)
  estimatedBudget?: number; // Presupuesto estimado en COP (NUMBER)

  // DATES (Fechas en formato YYYY-MM-DD o ISO string)
  requiredProjectDate: string; // Fecha requerida del proyecto (DATE: YYYY-MM-DD)
  createdAt: string; // Fecha de creación de solicitud (DATE ISO string)

  // BOOLEANS (Banderas lógicas)
  hasMoisture: boolean; // Tiene humedad (BOOLEAN)
  hasCracks: boolean; // Tiene grietas (BOOLEAN)
  acceptsTerms: boolean; // Acepta términos y condiciones (BOOLEAN)
  requiresTechnicalVisit: boolean; // Requiere visita técnica (BOOLEAN)

  // OBJETOS DE EVIDENCIA (ARCHIVOS)
  evidences: PhotoEvidence[]; // Lista de objetos de evidencia estructurados
  imageUrl: string;
  afterImageUrl?: string;
  imageFileName?: string;

  // ESTILO Y SIMULACIÓN
  currentCondition?: SurfaceCondition;
  trafficLevel?: TrafficLevel;
  urgency?: 'normal' | 'alta' | 'inmediata';
  selectedColorHex?: string;
  selectedColorName?: string;
  selectedColorCode?: string;
  selectedFinish?: FinishType;
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

// ESTRUCTURA ESTÁNDAR PARA INTEGRACIÓN CON API Y BASE DE DATOS
export interface ApiClientData {
  tipo: ClientType; // 'particular' | 'empresa'
  nombre: string; // STRING
  empresa?: string; // STRING
  nit?: string; // STRING
  correo: string; // STRING
  telefono: string; // STRING
  ciudad: string; // STRING
}

export interface ApiProjectData {
  tipoEspacio: SpaceType; // ENUM: 'hogar' | 'oficina' | 'comercio' | 'industria'
  subtipoEspacio: string; // STRING
  tipoSuperficie: SurfaceType; // ENUM: 'concreto' | 'madera' | 'metal' | 'drywall'
  estadoSuperficie: SurfaceConditionEnum; // ENUM: 'nuevo' | 'desgaste' | 'humedad' | 'reparacion'
  area: number; // NUMBER: m²
  cantidadEspacios: number; // NUMBER: conteo de espacios
  presupuestoEstimado?: number; // NUMBER: COP
  fechaRequerida: string; // DATE: YYYY-MM-DD
  fechaCreacion: string; // DATE: ISO 8601
  tieneHumedad: boolean; // BOOLEAN
  tieneGrietas: boolean; // BOOLEAN
  requiereVisitaTecnica: boolean; // BOOLEAN
  aceptaTerminos: boolean; // BOOLEAN
  descripcionProblema: string; // STRING
  observaciones?: string; // STRING
  colorSugerido?: {
    nombre: string;
    codigo: string;
    hex: string;
  };
  acabadoPreferido?: string;
}

export interface ApiAiAnalysisData {
  condicion: SurfaceConditionEnum;
  confianza: number; // NUMBER (ej: 92)
  sustratoDetectado: string;
  humedadDetectadaIndice: number;
  problemaPrincipal: string;
  sistemaRecomendado: string;
  familiaPintuco: string;
  litrosCalculados: number;
  galonesCalculados: number;
  costoEstimadoMin: number;
  costoEstimadoMax: number;
  garantia: string;
  resumenConversacional: string;
}

export interface ApiProjectSubmissionPayload {
  idSolicitud: string;
  codigo: string;
  cliente: ApiClientData;
  proyecto: ApiProjectData;
  evidencia: PhotoEvidence[];
  analisisIA: ApiAiAnalysisData;
  meta: {
    versionApi: string;
    origen: string;
    timestamp: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  brand: string;
  pintucoLine: string;
  imageUrl: string;
  presentation: string;
  unitPriceCOP: number;
  quantity: number;
  coverageM2: string;
  finish?: string;
  colorName?: string;
  colorHex?: string;
  colorCode?: string;
  isAiRecommended: boolean;
  benefitKey?: string;
}

export type DeliveryOptionType = 'domicilio' | 'recoger_tienda' | 'asesoria_previa';

export type PaymentMethodType =
  | 'pse'
  | 'tarjeta'
  | 'billetera'
  | 'transferencia'
  | 'punto_autorizado';

export interface PintacasaStore {
  tienda_id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  localidad: string;
  barrio?: string;
  latitud: number;
  longitud: number;
  horario: string;
  telefono: string;
  distancia_km: number;
  disponibilidad: '100% Disponible' | 'Inmediata' | 'Parcial (4/5)' | 'Bajo Pedido';
  stockTotalItems: number;
  availableItemsCount: number;
  tiempo_estimado_recogida: string;
  isRecommended?: boolean;
  recommendationReason?: string;
  features: string[];
}

export interface DeliveryDetails {
  tipo_entrega: 'domicilio' | 'recoger_tienda';
  direccion: string;
  ciudad: string;
  localidad: string;
  barrio: string;
  complemento?: string;
  latitud: number;
  longitud: number;
  tienda_id?: string;
  tienda_nombre?: string;
  distancia_km?: number;
  costo_envio: number;
  fecha_estimada: string;
  tiempo_estimado: string;
  instrucciones?: string;
  direccion_confirmada: boolean;
  disponibilidad_stock: 'todos_disponibles' | 'parcial' | 'bajo_pedido';
}

export interface ProjectOrder {
  id: string;
  code: string;
  clientId?: string;
  cliente_id?: string;
  projectId?: string;
  requestId?: string;
  createdAt: string;
  clientType: ClientType;
  client: {
    name: string;
    email: string;
    phone: string;
    city: string;
    address?: string;
    neighborhood?: string;
    notes?: string;
    companyName?: string;
    companyNit?: string;
  };
  items: CartItem[];
  subtotalCOP: number;
  shippingCOP: number;
  discountCOP: number;
  totalCOP: number;
  deliveryOption: DeliveryOptionType;
  pickupStore?: string;
  paymentMethod: PaymentMethodType;
  paymentBank?: string;
  status: 'pedido_confirmado' | 'en_preparacion' | 'despachado' | 'entregado' | 'asesoria_pendiente';
  requiresHumanAdvisory: boolean;
  assignedStore: string;
}

export interface ProjectRequest {
  id: string;
  code: string;
  clientId?: string;
  cliente_id?: string;
  projectId?: string;
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
  apiPayload?: ApiProjectSubmissionPayload;
  cartItems?: CartItem[];
  orderId?: string;
  deliveryOption?: DeliveryOptionType;
  paymentMethod?: PaymentMethodType;
  requiresHumanAdvisory?: boolean;
}


