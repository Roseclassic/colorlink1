import {
  ApiClientData,
  ApiProjectData,
  ApiAiAnalysisData,
  ApiProjectSubmissionPayload,
  ClientProjectInput,
  AiTechnicalAnalysis,
  TechnicalRecommendation,
  SurfaceConditionEnum,
  PhotoEvidence
} from '../types';

/**
 * Convierte cualquier condición o estado de superficie al enum estándar:
 * 'nuevo' | 'desgaste' | 'humedad' | 'reparacion'
 */
export function normalizeConditionEnum(conditionStr?: string): SurfaceConditionEnum {
  const cond = (conditionStr || '').toLowerCase();
  if (cond.includes('humed') || cond.includes('moho') || cond.includes('salitre') || cond.includes('agua')) {
    return 'humedad';
  }
  if (cond.includes('desconcha') || cond.includes('desprend') || cond.includes('fisura') || cond.includes('grieta') || cond.includes('repara')) {
    return 'reparacion';
  }
  if (cond.includes('desgaste') || cond.includes('mancha') || cond.includes('oxido') || cond.includes('sucio')) {
    return 'desgaste';
  }
  return 'nuevo';
}

/**
 * Construye el payload estandarizado para simulación de envío a API REST
 * POST /api/v1/solicitudes-transformacion
 */
export function buildApiPayload(
  input: ClientProjectInput,
  aiAnalysis: AiTechnicalAnalysis,
  recommendation: TechnicalRecommendation,
  requestCode?: string
): ApiProjectSubmissionPayload {
  const code = requestCode || `CLK-${Math.floor(8500 + Math.random() * 999)}`;
  const nowIso = new Date().toISOString();

  // Asegurar fecha requerida en formato DATE (YYYY-MM-DD)
  let requiredDate = input.requiredProjectDate;
  if (!requiredDate) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    requiredDate = futureDate.toISOString().split('T')[0];
  }

  // 1. OBJETO CLIENTE (STRINGS + ENUM)
  const cliente: ApiClientData = {
    tipo: input.clientType === 'empresa' ? 'empresa' : 'particular',
    nombre: input.clientType === 'empresa'
      ? (input.companyContactPerson || input.companyName || input.clientName || 'Representante Empresa')
      : (input.clientName || 'Cliente Particular'),
    empresa: input.companyName || undefined,
    nit: input.companyNit || undefined,
    correo: input.clientEmail || 'cliente@pintuco.co',
    telefono: input.clientPhone || '+57 300 000 0000',
    ciudad: input.clientCity || 'Bogotá D.C.'
  };

  // 2. OBJETO PROYECTO (NUMBERS, DATES, BOOLEANS, ENUMS, STRINGS)
  const proyecto: ApiProjectData = {
    tipoEspacio: (input.spaceType as any) || 'hogar',
    subtipoEspacio: input.specificSpaceSubtype || 'Sala / Comedor',
    tipoSuperficie: input.surfaceType || 'concreto',
    estadoSuperficie: input.currentConditionEnum || normalizeConditionEnum(input.currentCondition),
    area: Number(input.estimatedM2) || 28, // NUMBER (m²)
    cantidadEspacios: Number(input.spacesCount) || 1, // NUMBER
    presupuestoEstimado: input.estimatedBudget ? Number(input.estimatedBudget) : undefined, // NUMBER (COP)
    fechaRequerida: requiredDate, // DATE: YYYY-MM-DD
    fechaCreacion: input.createdAt || nowIso, // DATE ISO
    tieneHumedad: Boolean(input.hasMoisture || input.currentConditionEnum === 'humedad' || input.currentCondition === 'humedad'), // BOOLEAN
    tieneGrietas: Boolean(input.hasCracks || input.currentCondition === 'fisuras'), // BOOLEAN
    requiereVisitaTecnica: Boolean(input.requiresTechnicalVisit !== undefined ? input.requiresTechnicalVisit : true), // BOOLEAN
    aceptaTerminos: Boolean(input.acceptsTerms !== undefined ? input.acceptsTerms : true), // BOOLEAN
    descripcionProblema: input.description || 'Transformación y renovación de espacio con recubrimiento Pintuco.', // STRING
    observaciones: input.observations || input.aiFollowUpAnswer || undefined, // STRING
    colorSugerido: {
      nombre: input.selectedColorName || recommendation.selectedColorName || 'Lino Andino',
      codigo: input.selectedColorCode || recommendation.selectedColorCode || 'PT-104',
      hex: input.selectedColorHex || recommendation.selectedColorHex || '#EAE5D9'
    },
    acabadoPreferido: input.selectedFinish || recommendation.suggestedFinish || 'satinado'
  };

  // 3. OBJETOS DE EVIDENCIA (ARCHIVOS CON ESTRUCTURA DEFINIDA)
  const evidencia: PhotoEvidence[] = (input.evidences && input.evidences.length > 0)
    ? input.evidences
    : [
        {
          id: 'ev-01',
          archivo: input.imageFileName || 'muro_diagnostico.jpg',
          tipo: 'image/jpeg',
          fechaCarga: nowIso,
          descripcion: input.description || 'Fotografía de muro principal cargada para peritaje de superficie.',
          categoria: 'muro_principal',
          url: input.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          tamanioBytes: 2458000
        }
      ];

  // 4. OBJETO ANÁLISIS IA (ESTRUCTURA DE PERITAJE TÉCNICO)
  const analisisIA: ApiAiAnalysisData = {
    condicion: normalizeConditionEnum(aiAnalysis.primaryProblem || input.currentConditionEnum),
    confianza: Math.round(aiAnalysis.overallConfidence || 96), // NUMBER
    sustratoDetectado: aiAnalysis.detectedSurface || 'Pañete con estuco tradicional',
    humedadDetectadaIndice: Math.round(aiAnalysis.moistureIndex || 25), // NUMBER %
    problemaPrincipal: aiAnalysis.primaryProblem || 'Desgaste natural de película vinil-acrílica',
    sistemaRecomendado: recommendation.recommendedSystem || 'Sistema Viniltex® Pintuco',
    familiaPintuco: recommendation.pintucoFamilyName || 'Viniltex Avanzada + Sellomax',
    litrosCalculados: Number(recommendation.calculatedLiters) || 6,
    galonesCalculados: Number(recommendation.calculatedGallons) || 1.6,
    costoEstimadoMin: Number(recommendation.estimatedCostRange.min) || 165000,
    costoEstimadoMax: Number(recommendation.estimatedCostRange.max) || 240000,
    garantia: recommendation.warrantyPeriod || '5 años de durabilidad garantizada Pintuco',
    resumenConversacional: aiAnalysis.conversationalSummary || 'Espacio evaluado con éxito por la IA Pintuco.'
  };

  return {
    idSolicitud: code,
    codigo: code,
    cliente,
    proyecto,
    evidencia,
    analisisIA,
    meta: {
      versionApi: 'v1.4-pintuco-rest',
      origen: 'ColorLink Web App (Client-Side)',
      timestamp: nowIso
    }
  };
}

/**
 * Validador estricto de campos para verificar que los datos estén limpios
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

export function validateProjectData(input: ClientProjectInput): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  // Validaciones STRING
  if (!input.clientName || input.clientName.trim().length < 2) {
    errors.clientName = 'El nombre del cliente debe tener al menos 2 caracteres.';
  }

  if (input.clientType === 'empresa' && (!input.companyName || input.companyName.trim().length < 2)) {
    errors.companyName = 'Para clientes empresariales se requiere la Razón Social.';
  }

  if (!input.clientPhone || input.clientPhone.trim().length < 7) {
    errors.clientPhone = 'Ingresa un número telefónico o celular válido.';
  }

  if (!input.clientCity || input.clientCity.trim().length < 2) {
    errors.clientCity = 'La ciudad es requerida para cotizar flete y asesoría.';
  }

  // Validaciones NUMBER
  if (!input.estimatedM2 || input.estimatedM2 <= 0) {
    errors.estimatedM2 = 'El metraje debe ser un número positivo mayor a 0 m².';
  } else if (input.estimatedM2 > 5000) {
    warnings.push('Para proyectos mayores a 5.000 m² se asigna un Director Técnico Industrial.');
  }

  if (!input.spacesCount || input.spacesCount < 1) {
    errors.spacesCount = 'Debe indicar al menos 1 espacio a intervenir.';
  }

  // Validaciones DATE
  if (input.requiredProjectDate) {
    const parsedDate = new Date(input.requiredProjectDate);
    if (isNaN(parsedDate.getTime())) {
      errors.requiredProjectDate = 'La fecha requerida no tiene un formato de fecha válido (YYYY-MM-DD).';
    }
  }

  // Validaciones ARCHIVOS / EVIDENCIAS
  if (!input.imageUrl && (!input.evidences || input.evidences.length === 0)) {
    warnings.push('No se ha adjuntado fotografía de evidencia. La IA usará metraje estándar.');
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
