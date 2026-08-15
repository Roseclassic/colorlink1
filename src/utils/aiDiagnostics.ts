import { COATING_PRODUCTS, COLOR_PALETTES, TRANSFORMATION_STYLES } from '../data/mockData';
import {
  AiDetectionArea,
  AiTechnicalAnalysis,
  ClientProjectInput,
  CoatingProduct,
  SmartAiQuestion,
  TechnicalRecommendation
} from '../types';

export function runAiSurfaceDiagnostics(input: ClientProjectInput): {
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
} {
  const m2 = input.estimatedM2 > 0 ? input.estimatedM2 : 28;
  const isConstructivo = input.transformationTarget === 'constructivo';
  const isEmpresa = input.transformationTarget === 'empresa' || input.clientType === 'empresa';
  const isExterior = input.specificSpaceSubtype?.toLowerCase().includes('exterior') || 
                    input.specificSpaceSubtype?.toLowerCase().includes('fachada') ||
                    input.specificArea?.toLowerCase().includes('fachada');

  let detectedSurface = 'Pañete / Revoque tradicional con estuco interior';
  let primaryProblem = 'Desgaste estético general y pérdida de luminosidad';
  let complexity: 'Baja (DIY)' | 'Media' | 'Alta' | 'Especializada' = 'Baja (DIY)';
  let complexityRec: 'Fácil (DIY)' | 'Moderado' | 'Técnico Especializado' = 'Fácil (DIY)';
  let confidence = 98.6;
  let moistureIndex = 12;
  let adhesionScore = 88;
  let primer: CoatingProduct = COATING_PRODUCTS.sellomax_antihumedad;
  let mainCoating: CoatingProduct = COATING_PRODUCTS.viniltex_biocuidado;
  let systemName = 'Sistema Pintuco Viniltex Biocuidado & Cero Olor';
  let pintucoFamilyName = 'Línea Viniltex Master Cero Olor';
  let systemSummary = 'Pintura vinil-acrílica Tipo 1 con iones de plata anti-bacteriales y máxima lavabilidad sin olores molestos.';
  let solutionType = 'Renovación Estética & Bienestar Saludable';
  let warranty = '8 años de protección Pintuco';
  let days = 1.5;
  let ambientContext = 'Interior residencial con ventilación natural';
  let conversationalSummary = 'Detectamos una superficie interior en buenas condiciones generales, ideal para una transformación de color con Viniltex Biocuidado de secado rápido.';

  const detectionAreas: AiDetectionArea[] = [];
  const secondaryObservations: string[] = [];
  const environmentalFactors: string[] = [];

  // Conditional smart question
  let smartFollowUp: SmartAiQuestion | undefined = undefined;

  // Rule matrix based on condition & space type
  switch (input.currentCondition) {
    case 'humedad':
      detectedSurface = isExterior 
        ? 'Muro exterior con filtración y manchas de humedad descendente'
        : 'Pañete con humedad freática ascendente y eflorescencia salina';
      primaryProblem = 'Humedad por capilaridad y desprendimiento de la película de pintura';
      complexity = 'Alta';
      complexityRec = 'Moderado';
      confidence = 98.8;
      moistureIndex = 48;
      adhesionScore = 52;
      primer = COATING_PRODUCTS.sellomax_antihumedad;
      mainCoating = isExterior ? COATING_PRODUCTS.koraza_maxima : COATING_PRODUCTS.viniltex_biocuidado;
      systemName = isExterior ? 'Sistema Pintuco Koraza Impermeable Anti-Lluvia' : 'Sistema Pintuco Anti-Humedad Sellomax + Viniltex';
      pintucoFamilyName = 'Sellomax Barrera Anti-Salitre + Viniltex Biocuidado';
      systemSummary = 'Sellado de poros con Sellomax penetrante + acabado microporoso lavable que previene ampollamiento.';
      solutionType = 'Solución Técnica Curativa de Humedad & Sellado';
      warranty = '8 años de garantía certificada';
      days = 2.5;
      ambientContext = isExterior ? 'Exterior expuesto a lluvia y cambios térmicos' : 'Interior con presencia de humedad en muros basales';
      conversationalSummary = 'Detectamos una superficie con señales de humedad y salitre en la base. Es imprescindible neutralizar las sales con Sellomax antes de pintar con Viniltex.';

      detectionAreas.push(
        {
          id: 'area-1',
          label: 'Eflorescencia salina & descascarillado',
          confidence: 99.4,
          x: 15,
          y: 46,
          width: 68,
          height: 44,
          severity: 'alta',
          description: 'Humedad freática rompiendo el estuco previo. Requiere raspado y sellador hidrófugo.'
        },
        {
          id: 'area-2',
          label: 'Sustrato superior seco',
          confidence: 97.6,
          x: 25,
          y: 10,
          width: 52,
          height: 30,
          severity: 'baja',
          description: 'Apto para recibir capa de acabado tras lija suave.'
        }
      );

      secondaryObservations.push('Presión de vapor rompe la película anterior en el tercio inferior.');
      secondaryObservations.push('Presencia de sales minerales higroscópicas que retienen humedad ambiental.');
      environmentalFactors.push('Zonas con lluvia recurrente o filtración de terreno adyacente.');

      smartFollowUp = {
        id: 'q-humedad-origen',
        question: '¿La mancha de humedad aumenta en temporada de lluvias o es constante?',
        explanation: 'Nos ayuda a determinar si proviene del suelo (capilaridad) o de una tubería interna.',
        options: [
          { label: 'Aumenta con las lluvias (capilaridad exterior)', impact: 'Requiere Sellomax reforzado en 2 capas' },
          { label: 'Es constante todo el año (posible fuga interna)', impact: 'Sugerimos revisión previa de plomería' },
          { label: 'Es solo condensación por vapor (baño/cocina)', impact: 'Se aplica Viniltex Baños & Cocinas directo' }
        ]
      };
      break;

    case 'moho':
      detectedSurface = 'Superficie en zona húmeda o con ventilación reducida';
      primaryProblem = 'Colonización fúngica superficial y manchas biogénicas';
      complexity = 'Media';
      complexityRec = 'Moderado';
      confidence = 98.9;
      moistureIndex = 38;
      adhesionScore = 68;
      primer = COATING_PRODUCTS.sellomax_antihumedad;
      mainCoating = COATING_PRODUCTS.viniltex_biocuidado;
      systemName = 'Sistema Pintuco Bio-Escudo Sanitizante';
      pintucoFamilyName = 'Viniltex Biocuidado con Iones de Plata Anti-Hongos';
      systemSummary = 'Desinfección con solución fungicida + Recubrimiento con biocida de liberación prolongada.';
      solutionType = 'Solución Anti-Hongos & Purificación de Espacio';
      warranty = '8 años';
      days = 2;
      ambientContext = 'Zona con alta humedad relativa o poca circulación de aire';
      conversationalSummary = 'Detectamos proliferación de moho superficial. La solución Viniltex Biocuidado elimina el 99.9% de hongos y bacterias de forma permanente.';

      detectionAreas.push({
        id: 'area-1',
        label: 'Colonización fúngica activa',
        confidence: 99.1,
        x: 28,
        y: 22,
        width: 48,
        height: 52,
        severity: 'media',
        description: 'Descontaminar con solución fungicida antes de sellar y aplicar la pintura antibacterial.'
      });

      secondaryObservations.push('Esporas fúngicas arraigadas en micro-poros del estuco.');
      environmentalFactors.push('Ambiente con poca renovación de aire.');
      break;

    case 'desconchado':
    case 'fisuras':
      if (isConstructivo || isExterior) {
        detectedSurface = 'Fachada / Muros exteriores con microfisuras por choque térmico';
        primaryProblem = 'Microfisuras en revoque y ampollamiento por dilatación';
        complexity = 'Media';
        complexityRec = 'Moderado';
        confidence = 99.0;
        moistureIndex = 20;
        adhesionScore = 74;
        primer = COATING_PRODUCTS.sellomax_antihumedad;
        mainCoating = COATING_PRODUCTS.koraza_maxima;
        systemName = 'Sistema Pintuco Koraza Elastómero 7 Años';
        pintucoFamilyName = 'Línea Koraza Fachadas Elastoméricas';
        systemSummary = 'Membrana 100% acrílica elastomérica que sella microfisuras y resiste radiación UV extrema.';
        solutionType = 'Protección Elastomérica de Alta Intemperie';
        warranty = '7 años certificados';
        days = 2;
        ambientContext = 'Fachada expuesta a cambios bruscos de temperatura y lluvia torrencial';
        conversationalSummary = 'Detectamos microfisuras en la fachada exterior. Koraza Máxima Protección tiene la elasticidad necesaria para sellarlas y evitar filtraciones futuras.';
      } else if (isEmpresa && input.spaceType === 'industria') {
        detectedSurface = 'Piso de concreto industrial con desgaste abrasivo';
        primaryProblem = 'Desprendimiento de capa superficial por tráfico pesado';
        complexity = 'Especializada';
        complexityRec = 'Técnico Especializado';
        confidence = 99.2;
        moistureIndex = 14;
        adhesionScore = 60;
        primer = COATING_PRODUCTS.pintucoat_epoxico;
        mainCoating = COATING_PRODUCTS.pintucoat_epoxico;
        systemName = 'Sistema Pintuco Pintucoat Epóxico Alto Desempeño';
        pintucoFamilyName = 'Línea Pintucoat Pisos e Industria';
        systemSummary = 'Resina epóxica autonivelante 2K resistente a tráfico de montacargas, químicos y aceites.';
        solutionType = 'Revestimiento Epóxico Industrial de Tráfico Pesado';
        warranty = '12 años';
        days = 3;
        ambientContext = 'Bodega o taller con tránsito continuo de maquinaria';
        conversationalSummary = 'Detectamos desgaste mecánico en el pavimento de concreto. Recomendamos el sistema Pintucoat Epóxico para máxima resistencia química y de rodadura.';
      } else {
        detectedSurface = 'Enlucido de yeso/estuco con fatiga de adherencia superficial';
        primaryProblem = 'Capas previas sopladas por falta de imprimación';
        complexity = 'Media';
        complexityRec = 'Moderado';
        confidence = 98.4;
        moistureIndex = 16;
        adhesionScore = 65;
        primer = COATING_PRODUCTS.sellomax_antihumedad;
        mainCoating = COATING_PRODUCTS.viniltex_biocuidado;
        systemName = 'Sistema Pintuco Fix & Cover con Sellomax';
        pintucoFamilyName = 'Sellomax + Viniltex Biocuidado';
        systemSummary = 'Consolidación del sustrato con Sellomax + 2 manos de Viniltex de alto poder cubriente.';
        solutionType = 'Restauración de Capas & Acabado Homogéneo';
        warranty = '8 años';
        days = 1.5;
        ambientContext = 'Muro interior con desprendimientos localizados';
        conversationalSummary = 'Detectamos descascaramiento de pintura previa. Tras raspar y fijar con Sellomax, Viniltex dejará un acabado liso y duradero.';
      }
      break;

    default: // Bueno o Manchas
      if (isExterior) {
        detectedSurface = 'Fachada en buen estado general lista para cambio de color';
        primaryProblem = 'Pérdida de brillo y decoloración por exposición al sol';
        complexity = 'Baja (DIY)';
        complexityRec = 'Fácil (DIY)';
        confidence = 99.1;
        moistureIndex = 10;
        adhesionScore = 92;
        primer = COATING_PRODUCTS.sellomax_antihumedad;
        mainCoating = COATING_PRODUCTS.koraza_maxima;
        systemName = 'Sistema Pintuco Koraza Renovación & Color';
        pintucoFamilyName = 'Línea Koraza 5 Años';
        systemSummary = 'Recubrimiento 100% acrílico autolavable que renueva la estética de la fachada con alta solidez de color.';
        solutionType = 'Renovación Estética & Protección UV';
        warranty = '5 a 7 años';
        days = 1.5;
        ambientContext = 'Exterior con buena integridad estructural';
        conversationalSummary = 'Detectamos una superficie exterior en buen estado. Aplicando Koraza obtendrás una protección duradera con colores vivos resistentes al sol.';
      } else {
        detectedSurface = 'Paredes interiores lisas aptas para aplicación directa';
        primaryProblem = 'Renovación de estilo, cambio de paleta cromática';
        complexity = 'Baja (DIY)';
        complexityRec = 'Fácil (DIY)';
        confidence = 99.5;
        moistureIndex = 8;
        adhesionScore = 95;
        primer = COATING_PRODUCTS.sellomax_antihumedad;
        mainCoating = COATING_PRODUCTS.viniltex_biocuidado;
        systemName = 'Sistema Pintuco Viniltex Transformación Total';
        pintucoFamilyName = 'Línea Viniltex Biocuidado Cero Olor';
        systemSummary = 'Pintura ecológica Tipo 1 de alta cobertura en 2 manos con acabado mate aterciopelado.';
        solutionType = 'Transformación de Color & Estilo Interior';
        warranty = '8 años de satisfacción';
        days = 1;
        ambientContext = 'Espacio interior con iluminación adecuada';
        conversationalSummary = 'Detectamos un espacio con excelente base estructural, listo para aplicar la nueva paleta de color con Viniltex Biocuidado.';
      }
      break;
  }

  // Calculate yield & doses
  const yieldM2 = mainCoating.yieldM2PerLiter;
  const coats = mainCoating.recommendedCoats;
  const calculatedLiters = Number(((m2 * coats) / yieldM2).toFixed(1));
  const calculatedGallons = Number((calculatedLiters / 3.785).toFixed(1));
  const calculatedBuckets = calculatedGallons >= 4.5 ? Math.round(calculatedGallons / 5) : 0;
  const calculatedPrimerLiters = Number(((m2 * 1) / primer.yieldM2PerLiter).toFixed(1));

  // Estimate costs in Colombian Pesos (COP)
  const baseCostPerLiter = mainCoating.pricePerLiterEst * 4200; // COP conversion approx
  const minCost = Math.round((calculatedLiters * baseCostPerLiter + calculatedPrimerLiters * 38000) * 0.9);
  const maxCost = Math.round(minCost * 1.3);

  // Recommended styling & color
  const matchedStyle = TRANSFORMATION_STYLES.find(s => s.id === input.selectedStyle) || TRANSFORMATION_STYLES[0];
  const selectedColorHex = input.selectedColorHex || matchedStyle.colorHex;
  const selectedColorName = input.selectedColorName || matchedStyle.colorName;
  const selectedColorCode = input.selectedColorCode || matchedStyle.colorCode;

  const preparationSteps = [
    `1. Limpieza y preparación: Limpiar polvo, grasa o residuos con paño húmedo. En zonas con humedad o moho, raspar hasta el sustrato firme.`,
    `2. Imprimación técnica: Aplicar 1 mano de ${primer.name} para sellar poros, neutralizar alcalinidad y asegurar anclaje.`,
    `3. Corrección superficial: Resanar microfisuras con Masilla / Estuco Acrílico Pintuco si es necesario. Dejar secar y lijar suavemente.`,
    `4. Capa de acabado: Aplicar ${mainCoating.recommendedCoats} manos de ${mainCoating.name} dejando secar ${mainCoating.dryingTimeHours} horas entre capas.`
  ];

  const nextSteps = [
    {
      title: 'Validación con Asesor Técnico Pintuco',
      description: 'Un experto técnico de ColorLink / Pintuco revisa las fotografías de tu espacio para confirmar el metraje y los productos.',
      actionLabel: 'Validar con Asesor'
    },
    {
      title: 'Solicitar Muestra de Color a Domicilio',
      description: `Recibe una muestra física del tono "${selectedColorName}" con el acabado ${matchedStyle.finish} en tu dirección.`,
      actionLabel: 'Pedir Muestra Real'
    },
    {
      title: 'Conectar con Pintor Profesional Certificado',
      description: 'Te enlazamos con un aplicador certificado Pintuco capacitado en la correcta preparación de superficie.',
      actionLabel: 'Cotizar con Pintor'
    }
  ];

  return {
    aiAnalysis: {
      detectedSurface,
      primaryProblem,
      secondaryObservations,
      environmentalFactors,
      ambientContext,
      complexityLevel: complexity,
      overallConfidence: confidence,
      environmentalSuitability: `Apto para ${pintucoFamilyName}`,
      moistureIndex,
      adhesionScore,
      detectionAreas,
      processingTimeMs: Math.floor(280 + Math.random() * 180),
      smartFollowUp,
      conversationalSummary
    },
    recommendation: {
      recommendedSystem: systemName,
      pintucoFamilyName,
      systemSummary,
      solutionType,
      primerProduct: primer,
      mainCoatingProduct: mainCoating,
      preparationSteps,
      calculatedLiters,
      calculatedGallons,
      calculatedBuckets,
      calculatedPrimerLiters,
      estimatedLaborDays: days,
      complexityLevel: complexityRec,
      estimatedCostRange: {
        min: minCost,
        max: maxCost,
        currency: 'COP ($)'
      },
      technicalAdvice: `Para garantizar la máxima durabilidad de ${warranty}, asegúrate de no aplicar sobre sustratos calientes bajo sol directo. Deja curar completamente 24 horas antes de limpiar.`,
      warrantyPeriod: warranty,
      suggestedFinish: matchedStyle.finish,
      suggestedStyle: matchedStyle.name,
      selectedColorHex,
      selectedColorName,
      selectedColorCode,
      nextSteps
    }
  };
}
