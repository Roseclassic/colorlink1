import {
  CoatingProduct,
  ClientProjectInput,
  SurfaceConditionEnum,
  SpaceType,
  SurfaceType
} from '../types';

export type ProductTier = 'ia_recomendado' | 'costo_beneficio' | 'premium';
export type ProductCategory =
  | 'pintura_principal'
  | 'imprimante_sellador'
  | 'preparacion_estuco'
  | 'impermeabilizante'
  | 'herramientas_accesorios';

export interface RetailProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  pintucoLine: string;
  imageUrl: string;
  recommendedUse: string;
  presentation: string;
  presentationTypes: string[];
  priceCOP: number;
  coverageM2: string;
  yieldM2PerGallon: number;
  finish: string;
  tier: ProductTier;
  benefitKey: string;
  durabilityYears: number;
  suggestedQuantity: number;
  unitType: string;
  colorName?: string;
  colorHex?: string;
  colorCode?: string;
  inStock: boolean;
  stockAvailabilityNote: string;
}

export interface ProjectSystemComparison {
  aiRecommended: RetailProductItem;
  costBenefit: RetailProductItem;
  premium: RetailProductItem;
  primerProduct?: RetailProductItem;
  spackleProduct?: RetailProductItem;
  accessoryProducts: RetailProductItem[];
}

export interface SmartProjectCalculation {
  areaM2: number;
  paintGallonsNeeded: number;
  paintBucketsNeeded: number;
  primerGallonsNeeded: number;
  spackleUnitsNeeded: number;
  moistureUnitsNeeded: number;
  wasteMarginPercent: number;
  estimatedMaterialCostCOP: number;
  disclaimerText: string;
  summaryItems: {
    label: string;
    quantity: number;
    unit: string;
    description: string;
    approxPriceCOP: number;
  }[];
}

// Catálogo Real de Productos Pintuco Colombia para Retail y Asesoría
export const PINTUCO_RETAIL_PRODUCTS: Record<string, RetailProductItem> = {
  // 1. Viniltex Biocuidado (IA Recomendado para Hogar Interior)
  viniltex_biocuidado_galon: {
    id: 'ptc-vbiocuidado-gal',
    name: 'Viniltex® Biocuidado Cero Olor Antibacterial',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Viniltex Master',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Muros y cielorrasos interiores en habitaciones, salas y zonas familiares con máxima salud.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)', '1/4 Galón (0.946 L)'],
    priceCOP: 98900,
    coverageM2: '35 - 40 m² a 2 manos por galón',
    yieldM2PerGallon: 38,
    finish: 'Mate Terciopelo',
    tier: 'ia_recomendado',
    benefitKey: 'Elimina 99.9% de bacterias, cero olor residual y máxima lavabilidad.',
    durabilityYears: 8,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible para despacho inmediato en Colombia'
  },

  // 2. Viniltex RindeMás (Costo/Beneficio para Interior)
  viniltex_rindemas_galon: {
    id: 'ptc-vrindemas-gal',
    name: 'Viniltex® RindeMás Tipo 1 Alta Cobertura',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Viniltex Clásico',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Renovación de muros interiores con excelente rendimiento por galón y economía garantizada.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 74900,
    coverageM2: '40 - 45 m² a 2 manos por galón',
    yieldM2PerGallon: 42,
    finish: 'Mate Tradicional',
    tier: 'costo_beneficio',
    benefitKey: 'Excelente poder cubriente al mejor precio por metro cuadrado.',
    durabilityYears: 5,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible en todos los puntos Pintacasa'
  },

  // 3. Viniltex Ultra Lavable Seda (Premium para Interior)
  viniltex_ultra_seda_galon: {
    id: 'ptc-vultraseda-gal',
    name: 'Viniltex® Ultra Lavable Acabado Seda Super Premium',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Viniltex Supreme',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Zonas sociales, pasillos de alto roce y espacios de lujo que requieren limpieza impecable.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 124900,
    coverageM2: '38 - 42 m² a 2 manos por galón',
    yieldM2PerGallon: 40,
    finish: 'Satinado Seda Ultra Suave',
    tier: 'premium',
    benefitKey: 'Resiste más de 50.000 ciclos de lavado, repele manchas de grasa y salsas.',
    durabilityYears: 10,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible con formulación de color computarizada'
  },

  // 4. Koraza 5 Máxima Protección (IA Recomendado para Exterior/Fachadas)
  koraza_maxima_galon: {
    id: 'ptc-koraza5-gal',
    name: 'Koraza® 5 Máxima Protección Fachadas & Exteriores',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Koraza Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Fachadas, patios, terrazas y muros exteriores expuestos a sol intenso, lluvia y salitre.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 118900,
    coverageM2: '30 - 35 m² a 2 manos por galón',
    yieldM2PerGallon: 33,
    finish: 'Mate Exterior Resistente',
    tier: 'ia_recomendado',
    benefitKey: 'Escudo anti-lluvia, filtro UV de alta duración y tecnología anti-hongos exterior.',
    durabilityYears: 5,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible en Pintacasa a nivel nacional'
  },

  // 5. Koraza 3 Tradicional (Costo/Beneficio Exterior)
  koraza_tradicional_galon: {
    id: 'ptc-koraza3-gal',
    name: 'Koraza® Tradicional Pintura Acrílica Exterior',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Koraza Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Muros perimetrales y fachadas residenciales con excelente protección a la intemperie.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 89900,
    coverageM2: '28 - 32 m² a 2 manos por galón',
    yieldM2PerGallon: 30,
    finish: 'Mate Exterior',
    tier: 'costo_beneficio',
    benefitKey: 'Protección confiable contra el agua y la decoloración solar.',
    durabilityYears: 3,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible para entrega inmediata'
  },

  // 6. Koraza Elastomérica Anti-Fisuras (Premium Exterior)
  koraza_elastomerica_galon: {
    id: 'ptc-korazaelast-gal',
    name: 'Koraza® Elastomérica Impermeabilizante Anti-Fisuras',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Koraza Pro',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Fachadas con microfisuras, muros de ladrillo o revoque expuestos a movimientos estructurales.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 149900,
    coverageM2: '22 - 26 m² a 2 manos por galón',
    yieldM2PerGallon: 24,
    finish: 'Satinado Elástico',
    tier: 'premium',
    benefitKey: 'Elongación del 300% para puentear grietas y 100% impermeable.',
    durabilityYears: 8,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible en Pintacasa Colombia'
  },

  // 7. Pintucoat Epóxico (Para Pisos, Industria o Tráfico)
  pintucoat_epoxico_galon: {
    id: 'ptc-pintucoat-gal',
    name: 'Pintuco® Pintucoat Epóxico 2K Alto Tráfico',
    category: 'pintura_principal',
    brand: 'Pintuco',
    pintucoLine: 'Pintucoat Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Pisos de concreto, talleres, parqueaderos y superficies metálicas industriales.',
    presentation: 'Kit Galón (Componente A + B)',
    presentationTypes: ['Kit Galón', 'Kit Cuñete'],
    priceCOP: 215000,
    coverageM2: '25 - 30 m² por kit',
    yieldM2PerGallon: 28,
    finish: 'Brillante Industrial',
    tier: 'ia_recomendado',
    benefitKey: 'Resistencia a químicos, aceites, tránsito pesado y máxima dureza.',
    durabilityYears: 7,
    suggestedQuantity: 1,
    unitType: 'kits',
    inStock: true,
    stockAvailabilityNote: 'Formulación técnica bajo pedido'
  },

  // 8. Sellomax Bloqueador de Humedad (Imprimante / Sellador)
  sellomax_bloqueador_galon: {
    id: 'ptc-sellomax-gal',
    name: 'Pintuco® Sellomax Bloqueador de Humedad & Salitre',
    category: 'imprimante_sellador',
    brand: 'Pintuco',
    pintucoLine: 'Sellomax Especialidades',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Muros con manchas de humedad freática, eflorescencias salinas y alcalinidad.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', '1/4 Galón (0.946 L)', 'Cuñete (18.9 L)'],
    priceCOP: 82900,
    coverageM2: '30 - 35 m² por galón',
    yieldM2PerGallon: 32,
    finish: 'Transparente Penetrante',
    tier: 'ia_recomendado',
    benefitKey: 'Penetra hasta 4mm sellando los microporos y deteniendo el paso del salitre.',
    durabilityYears: 8,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Recomendado por la IA para este diagnóstico'
  },

  // 9. Sellomax Imprimante Acrílico para Superficies Nuevas
  sellomax_imprimante_acrilico: {
    id: 'ptc-sellomax-acril-gal',
    name: 'Pintuco® Sellador Acrílico 50 para Muros Nuevos',
    category: 'imprimante_sellador',
    brand: 'Pintuco',
    pintucoLine: 'Sellomax',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Fija estucos en polvo y empareja la absorción antes de pintar, ahorrando hasta un 30% de pintura.',
    presentation: 'Galón (3.785 L)',
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)'],
    priceCOP: 54900,
    coverageM2: '40 - 50 m² por galón',
    yieldM2PerGallon: 45,
    finish: 'Transparente Mate',
    tier: 'costo_beneficio',
    benefitKey: 'Asegura adherencia óptima y reduce el consumo de pintura de acabado.',
    durabilityYears: 5,
    suggestedQuantity: 1,
    unitType: 'galones',
    inStock: true,
    stockAvailabilityNote: 'Disponible en Pintacasa'
  },

  // 10. Estuco Profesional Pintuco Interior (Preparación)
  estuco_profesional_pintuco: {
    id: 'ptc-estuco-prof-25kg',
    name: 'Estuco Profesional Pintuco® Interior Listo para Usar',
    category: 'preparacion_estuco',
    brand: 'Pintuco',
    pintucoLine: 'Estucos & Masillas',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Nivelación, resane de grietas y acabado extra liso en muros y cielos interiores.',
    presentation: 'Balde 25 kg',
    presentationTypes: ['Balde 25 kg', 'Galón 5 kg', 'Bolsa 25 kg'],
    priceCOP: 48900,
    coverageM2: '18 - 22 m² por balde a 2 capas',
    yieldM2PerGallon: 20,
    finish: 'Blanco Liso Extra Suave',
    tier: 'ia_recomendado',
    benefitKey: 'Pasta suave lista para aplicar, no fisura y lija fácilmente sin soltar polvo excesivo.',
    durabilityYears: 10,
    suggestedQuantity: 1,
    unitType: 'baldes',
    inStock: true,
    stockAvailabilityNote: 'Disponible en stock'
  },

  // 11. Accesorios: Rodillo Microfibra Antigoteo Pro
  rodillo_microfibra_pro: {
    id: 'ptc-rodillo-microfibra-9in',
    name: 'Rodillo Pintuco® Microfibra Antigoteo 9 Pulgadas',
    category: 'herramientas_accesorios',
    brand: 'Pintuco',
    pintucoLine: 'Herramientas Profesionales',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Aplicación uniforme de vinilos y esmaltes con cero salpicaduras en muros lisos.',
    presentation: 'Unidad con mango ergonómico',
    presentationTypes: ['Unidad'],
    priceCOP: 18900,
    coverageM2: 'Reutilizable para todo el proyecto',
    yieldM2PerGallon: 100,
    finish: 'Herramienta de aplicación',
    tier: 'ia_recomendado',
    benefitKey: 'Acabado profesional sin huellas ni textura de cáscara de naranja.',
    durabilityYears: 2,
    suggestedQuantity: 1,
    unitType: 'unidades',
    inStock: true,
    stockAvailabilityNote: 'Accesorio complementario sugerido'
  },

  // 12. Cinta de Enmascarar Pintuco 24mm
  cinta_enmascarar_pintuco: {
    id: 'ptc-cinta-enmascarar-24mm',
    name: 'Cinta de Enmascarar Pintuco® Pintor Pro 24mm x 40m',
    category: 'herramientas_accesorios',
    brand: 'Pintuco',
    pintucoLine: 'Accesorios Pintuco',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Protección de rodapiés, marcos de puertas, ventanas y cortes de color perfectos.',
    presentation: 'Rollo 24mm x 40m',
    presentationTypes: ['Rollo'],
    priceCOP: 8500,
    coverageM2: '40 metros lineales de protección',
    yieldM2PerGallon: 50,
    finish: 'Adhesivo limpio sin residuos',
    tier: 'ia_recomendado',
    benefitKey: 'Retiro limpio sin arrancar la pintura ni dejar goma pegajosa.',
    durabilityYears: 1,
    suggestedQuantity: 2,
    unitType: 'rollos',
    inStock: true,
    stockAvailabilityNote: 'Disponible'
  },

  // 13. Kit de Espátulas de Acero Inoxidable
  kit_espatulas_pintuco: {
    id: 'ptc-kit-espatulas-acero',
    name: 'Espátula de Acero Flexible Pintuco® 4 Pulgadas',
    category: 'herramientas_accesorios',
    brand: 'Pintuco',
    pintucoLine: 'Herramientas Profesionales',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    recommendedUse: 'Raspado de pintura suelta y aplicación precisa de estuco en resanes.',
    presentation: 'Unidad',
    presentationTypes: ['Unidad'],
    priceCOP: 12500,
    coverageM2: 'Herramienta de resane',
    yieldM2PerGallon: 100,
    finish: 'Acero inoxidable flexible',
    tier: 'ia_recomendado',
    benefitKey: 'Hoja flexible tratada térmicamente para empastes impecables.',
    durabilityYears: 5,
    suggestedQuantity: 1,
    unitType: 'unidades',
    inStock: true,
    stockAvailabilityNote: 'Disponible'
  }
};

// Función Inteligente para Generar la Comparación de 3 Alternativas y Cálculo por Proyecto
export function getSmartProjectProductsAndComparison(
  input: ClientProjectInput,
  selectedTier: 'ia_recomendado' | 'costo_beneficio' | 'premium' = 'ia_recomendado'
): {
  comparison: ProjectSystemComparison;
  calculation: SmartProjectCalculation;
  recommendedProducts: RetailProductItem[];
  recommendedProductsList: RetailProductItem[];
} {
  const areaM2 = Math.max(input.estimatedM2 || 28, 6);
  const isExterior =
    input.spaceType === 'comercio' ||
    input.specificSpaceSubtype?.toLowerCase().includes('exterior') ||
    input.specificSpaceSubtype?.toLowerCase().includes('fachada') ||
    input.specificArea?.toLowerCase().includes('fachada');

  const isFloorOrIndustry =
    input.spaceType === 'industria' ||
    input.specificSpaceSubtype?.toLowerCase().includes('piso') ||
    input.specificSpaceSubtype?.toLowerCase().includes('bodega');

  const hasMoistureProblem =
    input.currentCondition === 'humedad' ||
    input.hasMoisture ||
    input.currentConditionEnum === 'humedad';

  const hasCrackOrRepair =
    input.currentCondition === 'reparacion' ||
    input.currentCondition === 'desgaste' ||
    input.hasCracks ||
    input.currentConditionEnum === 'reparacion';

  // 1. Determine the 3 main tiers (IA, Cost-Benefit, Premium)
  let aiMain: RetailProductItem;
  let costMain: RetailProductItem;
  let premMain: RetailProductItem;

  if (isFloorOrIndustry) {
    aiMain = { ...PINTUCO_RETAIL_PRODUCTS.pintucoat_epoxico_galon };
    costMain = { ...PINTUCO_RETAIL_PRODUCTS.koraza_maxima_galon };
    premMain = { ...PINTUCO_RETAIL_PRODUCTS.pintucoat_epoxico_galon };
  } else if (isExterior) {
    aiMain = { ...PINTUCO_RETAIL_PRODUCTS.koraza_maxima_galon };
    costMain = { ...PINTUCO_RETAIL_PRODUCTS.koraza_tradicional_galon };
    premMain = { ...PINTUCO_RETAIL_PRODUCTS.koraza_elastomerica_galon };
  } else {
    // Standard Interior / Hogar / Oficina
    aiMain = { ...PINTUCO_RETAIL_PRODUCTS.viniltex_biocuidado_galon };
    costMain = { ...PINTUCO_RETAIL_PRODUCTS.viniltex_rindemas_galon };
    premMain = { ...PINTUCO_RETAIL_PRODUCTS.viniltex_ultra_seda_galon };
  }

  // Attach selected color if any
  if (input.selectedColorName) {
    aiMain.colorName = input.selectedColorName;
    aiMain.colorHex = input.selectedColorHex || '#EAE5D9';
    aiMain.colorCode = input.selectedColorCode || 'PT-104';

    costMain.colorName = input.selectedColorName;
    costMain.colorHex = input.selectedColorHex || '#EAE5D9';
    costMain.colorCode = input.selectedColorCode || 'PT-104';

    premMain.colorName = input.selectedColorName;
    premMain.colorHex = input.selectedColorHex || '#EAE5D9';
    premMain.colorCode = input.selectedColorCode || 'PT-104';
  }

  // 2. Intelligent Quantity Calculation based on area + 10% waste margin
  const wasteMarginPercent = 10;
  const effectiveArea = areaM2 * (1 + wasteMarginPercent / 100);

  // Gallons of main paint (approx 35 m2 per gallon 2 coats)
  const exactGallons = Math.max(1, Math.ceil(effectiveArea / aiMain.yieldM2PerGallon));
  aiMain.suggestedQuantity = exactGallons;
  costMain.suggestedQuantity = Math.max(1, Math.ceil(effectiveArea / costMain.yieldM2PerGallon));
  premMain.suggestedQuantity = Math.max(1, Math.ceil(effectiveArea / premMain.yieldM2PerGallon));

  // Determine Primer / Moisture sealer
  let primerProduct: RetailProductItem | undefined = undefined;
  let primerGallons = 0;
  if (hasMoistureProblem) {
    primerProduct = { ...PINTUCO_RETAIL_PRODUCTS.sellomax_bloqueador_galon };
    primerGallons = Math.max(1, Math.ceil(effectiveArea / primerProduct.yieldM2PerGallon));
    primerProduct.suggestedQuantity = primerGallons;
  } else if (hasCrackOrRepair || areaM2 > 40) {
    primerProduct = { ...PINTUCO_RETAIL_PRODUCTS.sellomax_imprimante_acrilico };
    primerGallons = Math.max(1, Math.ceil(effectiveArea / primerProduct.yieldM2PerGallon));
    primerProduct.suggestedQuantity = primerGallons;
  }

  // Determine Spackle / Estuco
  let spackleProduct: RetailProductItem | undefined = undefined;
  let spackleUnits = 0;
  if (hasCrackOrRepair || hasMoistureProblem) {
    spackleProduct = { ...PINTUCO_RETAIL_PRODUCTS.estuco_profesional_pintuco };
    // 1 balde 25kg covers ~20 m2
    spackleUnits = Math.max(1, Math.ceil(areaM2 / 20));
    spackleProduct.suggestedQuantity = spackleUnits;
  }

  // Standard recommended accessories
  const roller = { ...PINTUCO_RETAIL_PRODUCTS.rodillo_microfibra_pro };
  roller.suggestedQuantity = areaM2 > 60 ? 2 : 1;

  const tape = { ...PINTUCO_RETAIL_PRODUCTS.cinta_enmascarar_pintuco };
  tape.suggestedQuantity = areaM2 > 40 ? 3 : 2;

  const spatula = { ...PINTUCO_RETAIL_PRODUCTS.kit_espatulas_pintuco };
  spatula.suggestedQuantity = 1;

  const accessoryProducts: RetailProductItem[] = [roller, tape];
  if (hasCrackOrRepair || hasMoistureProblem) {
    accessoryProducts.push(spatula);
  }

  // Assemble full curated product list for this specific project
  const recommendedProductsList: RetailProductItem[] = [aiMain];
  if (primerProduct) recommendedProductsList.push(primerProduct);
  if (spackleProduct) recommendedProductsList.push(spackleProduct);
  recommendedProductsList.push(...accessoryProducts);

  // Calculate estimated material total in COP
  const mainPaintTotal = aiMain.priceCOP * exactGallons;
  const primerTotal = primerProduct ? primerProduct.priceCOP * primerGallons : 0;
  const spackleTotal = spackleProduct ? spackleProduct.priceCOP * spackleUnits : 0;
  const accessoriesTotal = accessoryProducts.reduce((acc, it) => acc + it.priceCOP * it.suggestedQuantity, 0);
  const totalCostCOP = mainPaintTotal + primerTotal + spackleTotal + accessoriesTotal;

  // Build the summary breakdown items
  const summaryItems = [
    {
      label: `${exactGallons} ${exactGallons === 1 ? 'galón' : 'galones'} de pintura principal (${aiMain.name.split('®')[0]}®)`,
      quantity: exactGallons,
      unit: 'Galón',
      description: `Rendimiento de ${aiMain.yieldM2PerGallon} m² a 2 manos para cubrir ${areaM2} m² con ${wasteMarginPercent}% de reserva técnica.`,
      approxPriceCOP: mainPaintTotal
    }
  ];

  if (primerProduct) {
    summaryItems.push({
      label: `${primerGallons} ${primerGallons === 1 ? 'galón' : 'galones'} de ${primerProduct.name.split('®')[0]}®`,
      quantity: primerGallons,
      unit: 'Galón',
      description: hasMoistureProblem
        ? 'Sellador bloqueador para neutralizar salitre y humedad basal antes de aplicar el color.'
        : 'Imprimante acrílico para emparejar absorción y optimizar rendimiento.',
      approxPriceCOP: primerTotal
    });
  }

  if (spackleProduct) {
    summaryItems.push({
      label: `${spackleUnits} ${spackleUnits === 1 ? 'balde' : 'baldes'} de ${spackleProduct.name.split('®')[0]}® (25 kg)`,
      quantity: spackleUnits,
      unit: 'Balde 25kg',
      description: 'Masilla lista para usar para resanar imperfecciones y obtener superficie extra lisa.',
      approxPriceCOP: spackleTotal
    });
  }

  summaryItems.push({
    label: `${accessoryProducts.length} herramientas y complementos de aplicación`,
    quantity: accessoryProducts.reduce((sum, a) => sum + a.suggestedQuantity, 0),
    unit: 'Kit',
    description: 'Rodillo microfibra antigoteo, cinta de pintor pro y accesorios para proteger tus espacios.',
    approxPriceCOP: accessoriesTotal
  });

  const calculation: SmartProjectCalculation = {
    areaM2,
    paintGallonsNeeded: exactGallons,
    paintBucketsNeeded: Math.floor(exactGallons / 5),
    primerGallonsNeeded: primerGallons,
    spackleUnitsNeeded: spackleUnits,
    moistureUnitsNeeded: hasMoistureProblem ? primerGallons : 0,
    wasteMarginPercent,
    estimatedMaterialCostCOP: totalCostCOP,
    disclaimerText:
      '* Precios y disponibilidad son estimados de referencia para Colombia. Los valores finales se confirman al momento de despachar tu pedido desde la tienda Pintacasa autorizada.',
    summaryItems
  };

  const comparison: ProjectSystemComparison = {
    aiRecommended: aiMain,
    costBenefit: costMain,
    premium: premMain,
    primerProduct,
    spackleProduct,
    accessoryProducts
  };

  return {
    comparison,
    calculation,
    recommendedProducts: recommendedProductsList,
    recommendedProductsList
  };
}
