import { COATING_PRODUCTS, COLOR_PALETTES } from '../data/mockData';
import {
  AiDetectionArea,
  AiTechnicalAnalysis,
  ClientProjectInput,
  CoatingProduct,
  TechnicalRecommendation
} from '../types';

export function runAiSurfaceDiagnostics(input: ClientProjectInput): {
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
} {
  const m2 = input.estimatedM2 > 0 ? input.estimatedM2 : 25;
  const isIndustrial = input.spaceType === 'industria';
  const isOffice = input.spaceType === 'oficina';
  const isCommercial = input.spaceType === 'comercio';

  let detectedSurface = 'Yeso laminar y enlucido tradicional';
  let primaryProblem = 'Desgaste estético general';
  let complexity: 'Baja' | 'Media' | 'Alta' | 'Especializada' = 'Baja';
  let confidence = 98.6;
  let moistureIndex = 10;
  let adhesionScore = 90;
  let primer: CoatingProduct = COATING_PRODUCTS.primer_hidro;
  let mainCoating: CoatingProduct = COATING_PRODUCTS.esmalte_poliuretano;
  let systemName = 'Sistema ColorLink Architectural Pro';
  let systemSummary = 'Revestimiento de alta cobertura, lavabilidad superior y secado rápido.';
  let warranty = '8 años';
  let days = 1;

  const detectionAreas: AiDetectionArea[] = [];

  switch (input.currentCondition) {
    case 'humedad':
      detectedSurface = isIndustrial ? 'Muro perimetral de bloque con filtración' : 'Yeso con eflorescencias salinas e higroscopicidad';
      primaryProblem = 'Humedad por capilaridad y desprendimiento de capa base';
      complexity = 'Alta';
      confidence = 98.4;
      moistureIndex = 48;
      adhesionScore = 52;
      primer = COATING_PRODUCTS.primer_hidro;
      mainCoating = COATING_PRODUCTS.latex_antihumedad;
      systemName = 'Sistema ColorLink HydroShield Anti-Humedad';
      systemSummary = 'Imprimación penetrante siloxánica + Pintura microporosa transpirable con biocidas activos.';
      warranty = '8 años';
      days = 2;
      detectionAreas.push(
        {
          id: 'area-1',
          label: 'Eflorescencia salina & descascarillado',
          confidence: 99.2,
          x: 18,
          y: 48,
          width: 62,
          height: 42,
          severity: 'alta',
          description: 'Presión de vapor rompe película anterior. Requiere saneado y sellado hidrófugo.'
        },
        {
          id: 'area-2',
          label: 'Sustrato superior seco',
          confidence: 97.4,
          x: 25,
          y: 10,
          width: 52,
          height: 30,
          severity: 'baja',
          description: 'Apto para recibir capa de acabado tras lija suave.'
        }
      );
      break;

    case 'oxido':
      detectedSurface = 'Sustrato ferroso / Acero al carbono con óxido laminar';
      primaryProblem = 'Corrosión superficial activa y micro-picaduras';
      complexity = 'Media';
      confidence = 97.9;
      moistureIndex = 22;
      adhesionScore = 65;
      primer = COATING_PRODUCTS.antiox_directo;
      mainCoating = COATING_PRODUCTS.antiox_directo;
      systemName = 'Sistema ColorLink FerroGuard Active-Shield';
      systemSummary = 'Conversor de óxido con nanopartículas de zinc + Esmalte anticorrosivo poliuretánico.';
      warranty = '10 años';
      days = 2;
      detectionAreas.push({
        id: 'area-1',
        label: 'Foco de oxidación activa',
        confidence: 98.8,
        x: 22,
        y: 28,
        width: 56,
        height: 48,
        severity: 'alta',
        description: 'Requiere desoxidado mecánico ST2 y aplicación directa de poliuretano anticorrosivo.'
      });
      break;

    case 'moho':
      detectedSurface = 'Paramento en zona húmeda / Cielorraso poco ventilado';
      primaryProblem = 'Colonización fúngica superficial y mancha biogénica';
      complexity = 'Media';
      confidence = 98.9;
      moistureIndex = 38;
      adhesionScore = 70;
      primer = COATING_PRODUCTS.primer_hidro;
      mainCoating = COATING_PRODUCTS.latex_antihumedad;
      systemName = 'Sistema ColorLink BioShield Purificante';
      systemSummary = 'Desinfección fungicida intensiva + Membrana vinílica transpirable con iones de plata.';
      warranty = '7 años';
      days = 1.5;
      detectionAreas.push({
        id: 'area-1',
        label: 'Presencia de esporas fúngicas',
        confidence: 99.0,
        x: 30,
        y: 20,
        width: 44,
        height: 55,
        severity: 'media',
        description: 'Descontaminar con solución fungicida antes de aplicar imprimación selladora.'
      });
      break;

    case 'desconchado':
      detectedSurface = isIndustrial ? 'Solera de hormigón pulido' : 'Enlucido yeso antiguo con fatiga de adherencia';
      primaryProblem = 'Ampollamiento y rotura de cohesión de capas preexistentes';
      complexity = 'Media';
      confidence = 98.1;
      moistureIndex = 18;
      adhesionScore = 58;
      primer = isIndustrial ? COATING_PRODUCTS.primer_epoxi : COATING_PRODUCTS.primer_hidro;
      mainCoating = isIndustrial ? COATING_PRODUCTS.epoxi_autonivelante : COATING_PRODUCTS.esmalte_poliuretano;
      systemName = isIndustrial ? 'Sistema ColorLink HardFloor 2K Industrial' : 'Sistema ColorLink Fix & Cover Premium';
      systemSummary = 'Saneamiento mecánico + Imprimación de alta penetración + Esmalte de alta elasticidad.';
      warranty = isIndustrial ? '12 años' : '9 años';
      days = isIndustrial ? 3 : 2;
      detectionAreas.push({
        id: 'area-1',
        label: 'Delaminación de película anterior',
        confidence: 98.5,
        x: 15,
        y: 35,
        width: 70,
        height: 45,
        severity: 'alta',
        description: 'Retirar material suelto hasta alcanzar sustrato mecánicamente estable.'
      });
      break;

    case 'fisuras':
      detectedSurface = isCommercial ? 'Mortero monocapa exterior' : 'Tabiquería con asentamiento diferencial';
      primaryProblem = 'Microfisuras vivas (< 1.2 mm) con riesgo de filtración';
      complexity = 'Alta';
      confidence = 97.8;
      moistureIndex = 25;
      adhesionScore = 72;
      primer = COATING_PRODUCTS.primer_hidro;
      mainCoating = COATING_PRODUCTS.latex_antihumedad;
      systemName = 'Sistema ColorLink ElastoFlex Sellador';
      systemSummary = 'Puenteo elástico de fisuras dinámicas + Revestimiento elastomérico 400% elasticidad.';
      warranty = '10 años';
      days = 2;
      detectionAreas.push({
        id: 'area-1',
        label: 'Fisuras longitudinales detectadas',
        confidence: 98.2,
        x: 20,
        y: 25,
        width: 60,
        height: 50,
        severity: 'media',
        description: 'Abrir en V, sellar con masilla elastomérica e incorporar malla si excede 1.5mm.'
      });
      break;

    default: // 'bueno' / 'manchas'
      if (isIndustrial) {
        detectedSurface = 'Solera de hormigón industrial fratasado';
        primaryProblem = 'Desgaste por abrasión y tráfico rodado';
        complexity = 'Especializada';
        confidence = 99.3;
        moistureIndex = 12;
        adhesionScore = 88;
        primer = COATING_PRODUCTS.primer_epoxi;
        mainCoating = COATING_PRODUCTS.epoxi_autonivelante;
        systemName = 'Sistema ColorLink Industrial HardFloor 2K';
        systemSummary = 'Desbaste de apertura de poro + Imprimación 100% sólidos + Resina epóxica autonivelante.';
        warranty = '12 años';
        days = 3;
        detectionAreas.push({
          id: 'area-1',
          label: 'Zona de rodadura y desgaste mecánico',
          confidence: 99.1,
          x: 10,
          y: 20,
          width: 80,
          height: 60,
          severity: 'media',
          description: 'Sustrato sano pero liso. Requiere diamantado previo para anclaje epoxi.'
        });
      } else if (isOffice) {
        detectedSurface = 'Pladur liso / Yeso nivelado en buen estado';
        primaryProblem = 'Rozaduras superficiales y cambio de imagen estética';
        complexity = 'Baja';
        confidence = 99.5;
        moistureIndex = 8;
        adhesionScore = 95;
        primer = COATING_PRODUCTS.primer_hidro;
        mainCoating = COATING_PRODUCTS.esmalte_poliuretano;
        systemName = 'Sistema ColorLink EcoClean Air Express';
        systemSummary = 'Pintura monocapa acrílica-poliuretano al agua A+, secado en 45 min y nulo olor.';
        warranty = '9 años';
        days = 1;
        detectionAreas.push({
          id: 'area-1',
          label: 'Superficie homogénea apta',
          confidence: 99.8,
          x: 15,
          y: 15,
          width: 70,
          height: 70,
          severity: 'baja',
          description: 'No requiere picado ni tratamientos invasivos. Lijado superficial suave.'
        });
      } else {
        detectedSurface = 'Enlucido de yeso o mortero interior';
        primaryProblem = 'Mantenimiento preventivo y actualización de color';
        complexity = 'Baja';
        confidence = 99.0;
        moistureIndex = 10;
        adhesionScore = 92;
        primer = COATING_PRODUCTS.primer_hidro;
        mainCoating = COATING_PRODUCTS.esmalte_poliuretano;
        systemName = 'Sistema ColorLink Velvet Interior Premium';
        systemSummary = 'Acabado de seda lavable ultra-resistente a manchas con pigmentos de alta pureza.';
        warranty = '8 años';
        days = 1;
        detectionAreas.push({
          id: 'area-1',
          label: 'Base uniforme detectada',
          confidence: 99.4,
          x: 20,
          y: 20,
          width: 60,
          height: 60,
          severity: 'baja',
          description: 'Superficie estable lista para dos capas de acabado directo.'
        });
      }
      break;
  }

  // Calculations
  const primerLiters = Math.ceil(m2 / (primer.yieldM2PerLiter || 10));
  const mainCoatingLiters = Math.ceil((m2 * (mainCoating.recommendedCoats || 2)) / (mainCoating.yieldM2PerLiter || 8));

  const materialsCostEst = (primerLiters * primer.pricePerLiterEst) + (mainCoatingLiters * mainCoating.pricePerLiterEst);
  const laborCostEst = (days * 180) + (m2 * 4.5);
  const totalMin = Math.round((materialsCostEst + laborCostEst) * 0.9);
  const totalMax = Math.round((materialsCostEst + laborCostEst) * 1.25);

  const prepSteps = [
    `1. Inspección y protección de suelos y carpintería con film electrostático.`,
    input.currentCondition === 'humedad'
      ? '2. Raspado de zonas desconchadas y saneado de sales con cepillo de alambre blando.'
      : input.currentCondition === 'oxido'
      ? '2. Cepillado metálico y neutralización de óxido superficial.'
      : '2. Lijado suave grano 180 para apertura de micro-poro.',
    primerLiters > 0
      ? `3. Aplicación de 1 mano de ${primer.name} (${primerLiters} L calculados) para anclaje perfecto.`
      : '3. Limpieza antiestática de polvo.',
    `4. Aplicación de ${mainCoating.recommendedCoats} manos de ${mainCoating.name} (${mainCoatingLiters} L totales) respetando tiempo de secado.`
  ];

  const aiAnalysis: AiTechnicalAnalysis = {
    detectedSurface,
    primaryProblem,
    secondaryObservations: [
      `Índice de humedad superficial evaluado en ${moistureIndex}% (Rango ${moistureIndex > 30 ? 'Alerta' : 'Normal'}).`,
      `Puntuación de adherencia estimada del sustrato: ${adhesionScore}/100.`,
      `Recomendado nivel de tránsito: ${input.trafficLevel.toUpperCase()} con formulación reforzada.`
    ],
    complexityLevel: complexity,
    overallConfidence: confidence,
    environmentalSuitability: isIndustrial
      ? 'Entorno con agentes químicos y esfuerzo mecánico severo'
      : isOffice
      ? 'Ambiente de trabajo continuo con requerimiento VOC cero'
      : 'Ambiente residencial con ventilación natural',
    moistureIndex,
    adhesionScore,
    detectionAreas,
    processingTimeMs: Math.floor(Math.random() * 600) + 1200
  };

  const defaultColor = COLOR_PALETTES[0];

  const recommendation: TechnicalRecommendation = {
    recommendedSystem: systemName,
    systemSummary,
    primerProduct: primer,
    mainCoatingProduct: mainCoating,
    preparationSteps: prepSteps,
    calculatedLiters: mainCoatingLiters,
    calculatedPrimerLiters: primerLiters,
    estimatedLaborDays: days,
    estimatedCostRange: {
      min: totalMin,
      max: totalMax,
      currency: '€'
    },
    technicalAdvice: input.currentCondition === 'humedad'
      ? 'La garantía queda vinculada al cese de la fuente de humedad primaria. El sistema siloxánico previene futuras apariciones.'
      : 'Se recomienda mantener la estancia con circulación de aire durante las primeras 6 horas post-aplicación.',
    warrantyPeriod: warranty,
    selectedColorHex: defaultColor.hex,
    selectedColorName: defaultColor.name
  };

  return { aiAnalysis, recommendation };
}
