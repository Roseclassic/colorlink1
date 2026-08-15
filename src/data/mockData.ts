import {
  CoatingProduct,
  ProjectRequest,
  SampleImageOption,
  SpaceType,
  TransformationStyleOption,
  TransformationTarget
} from '../types';

export interface TransformationCategoryConfig {
  id: TransformationTarget;
  title: string;
  shortTitle: string;
  emoji: string;
  tagline: string;
  description: string;
  iconName: string;
  accentGradient: string;
  borderColor: string;
  textColor: string;
  subspaces: {
    id: string;
    label: string;
    description: string;
    estimatedArea: number;
    recommendedProduct: string;
    icon: string;
  }[];
}

export const TRANSFORMATION_TARGETS: TransformationCategoryConfig[] = [
  {
    id: 'hogar',
    title: 'Mi hogar',
    shortTitle: 'Hogar',
    emoji: '🏠',
    tagline: 'Espacios de vida, confort y bienestar',
    description: 'Transforma tu casa o apartamento con colores inspiradores, acabados lavables y protección anti-moho.',
    iconName: 'Home',
    accentGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/50 hover:border-amber-500',
    textColor: 'text-amber-400',
    subspaces: [
      {
        id: 'habitacion',
        label: 'Habitación',
        description: 'Dormitorio principal o infantil con pintura relajante y cero olor',
        estimatedArea: 18,
        recommendedProduct: 'Viniltex Biocuidado',
        icon: 'Bed'
      },
      {
        id: 'sala',
        label: 'Sala / Comedor',
        description: 'Paredes protagonistas, acentos y cielorrasos luminosos',
        estimatedArea: 32,
        recommendedProduct: 'Viniltex Avanzada Mate',
        icon: 'Sofa'
      },
      {
        id: 'cocina_bano',
        label: 'Cocina & Baños',
        description: 'Zonas húmedas resistentes a vapor, grasa y salpicaduras',
        estimatedArea: 16,
        recommendedProduct: 'Viniltex Baños & Cocinas',
        icon: 'Droplets'
      },
      {
        id: 'exterior_fachada',
        label: 'Exterior / Fachada',
        description: 'Muros expuestos a sol intenso, lluvia y humedad exterior',
        estimatedArea: 45,
        recommendedProduct: 'Koraza 5 / 7 Años',
        icon: 'Sun'
      },
      {
        id: 'remodelacion',
        label: 'Remodelación integral',
        description: 'Renovación completa de vivienda, cambio de paleta total',
        estimatedArea: 85,
        recommendedProduct: 'Sistema Integral Pintuco',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 'empresa',
    title: 'Mi empresa',
    shortTitle: 'Empresa',
    emoji: '🏢',
    tagline: 'Imagen de marca, productividad y durabilidad',
    description: 'Soluciones para oficinas, locales comerciales, restaurantes e instalaciones con alto tráfico y normas de higiene.',
    iconName: 'Building2',
    accentGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderColor: 'group-hover:border-cyan-500/50 hover:border-cyan-500',
    textColor: 'text-cyan-400',
    subspaces: [
      {
        id: 'oficina',
        label: 'Oficina / Corporativo',
        description: 'Open space, salas de juntas y recepciones con rápida ocupación',
        estimatedArea: 65,
        recommendedProduct: 'Viniltex Acriltex Satinado',
        icon: 'Briefcase'
      },
      {
        id: 'local_comercial',
        label: 'Local comercial / Retail & Restaurante',
        description: 'Superficies de alto tránsito, lavabilidad extrema y estética premium',
        estimatedArea: 55,
        recommendedProduct: 'Pintulux Aqua & Viniltex Pro',
        icon: 'Store'
      },
      {
        id: 'industria',
        label: 'Industria / Bodega',
        description: 'Pisos epóxicos autonivelantes, señalización y estructuras metálicas',
        estimatedArea: 140,
        recommendedProduct: 'Pintucoat Epóxico 2K',
        icon: 'Factory'
      },
      {
        id: 'inmobiliario',
        label: 'Proyecto inmobiliario',
        description: 'Mantenimiento de zonas comunes, fachadas comerciales y lobbies',
        estimatedArea: 120,
        recommendedProduct: 'Koraza Pro & Terinsa',
        icon: 'Building'
      }
    ]
  },
  {
    id: 'constructivo',
    title: 'Un proyecto constructivo',
    shortTitle: 'Constructora',
    emoji: '🏗️',
    tagline: 'Especificación técnica, rendimiento y garantía de obra',
    description: 'Para arquitectos, ingenieros y constructoras que requieren dosificación por m², selladores de revoque y recubrimientos certificados.',
    iconName: 'Hammer',
    accentGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'group-hover:border-purple-500/50 hover:border-purple-500',
    textColor: 'text-purple-400',
    subspaces: [
      {
        id: 'obra_nueva',
        label: 'Obra nueva / Edificación',
        description: 'Pañete fresco, estuco plástico y pintura base para entrega masiva',
        estimatedArea: 250,
        recommendedProduct: 'Sellomax + Intervinil Pro',
        icon: 'Layers'
      },
      {
        id: 'fachada_gran_formato',
        label: 'Fachada gran formato',
        description: 'Impermeabilización elástica para puentear fisuras en altura',
        estimatedArea: 480,
        recommendedProduct: 'Koraza Elastómerica',
        icon: 'Shield'
      },
      {
        id: 'parqueaderos_pisos',
        label: 'Pisos & Parqueaderos',
        description: 'Recubrimiento de poliuretano y epóxico para tráfico vehicular',
        estimatedArea: 320,
        recommendedProduct: 'Pintucoat Piso Tráfico',
        icon: 'Car'
      },
      {
        id: 'zonas_comunes',
        label: 'Zonas comunes & Sellados técnicos',
        description: 'Pasillos, escaleras de emergencia y tanques de reserva',
        estimatedArea: 180,
        recommendedProduct: 'Pintuepóxico Sanitario',
        icon: 'CheckCircle'
      }
    ]
  }
];

export const SPACE_OPTIONS = [
  {
    id: 'hogar' as SpaceType,
    title: 'Hogar / Residencial',
    subtitle: 'Interiores, fachadas, terrazas y zonas húmedas',
    iconName: 'Home',
    popularBadge: 'Más frecuente',
    subtypes: [
      'Habitación',
      'Sala / Comedor',
      'Cocina & Baños',
      'Exterior / Fachada',
      'Remodelación integral'
    ]
  },
  {
    id: 'oficina' as SpaceType,
    title: 'Oficina / Corporativo',
    subtitle: 'Espacios de trabajo, salas de juntas y recepciones',
    iconName: 'Building2',
    popularBadge: 'Rápido secado',
    subtypes: [
      'Open Space',
      'Despachos privados',
      'Sala de juntas',
      'Recepción y pasillos'
    ]
  },
  {
    id: 'comercio' as SpaceType,
    title: 'Comercio / Retail & Horeca',
    subtitle: 'Locales comerciales, restaurantes y boutiques',
    iconName: 'Store',
    popularBadge: 'Alta resistencia',
    subtypes: [
      'Local a pie de calle',
      'Restaurante / Cafetería',
      'Showroom comercial'
    ]
  },
  {
    id: 'industria' as SpaceType,
    title: 'Industria / Logística',
    subtitle: 'Pavimentos de alta carga, bodegas, estructuras',
    iconName: 'Factory',
    popularBadge: 'Grado Técnico',
    subtypes: [
      'Piso bodega / Epóxico',
      'Estructuras metálicas',
      'Taller y logística'
    ]
  },
  {
    id: 'constructivo' as SpaceType,
    title: 'Proyecto Constructivo',
    subtitle: 'Edificaciones, fachadas masivas y obras nuevas',
    iconName: 'Hammer',
    popularBadge: 'Gran Formato',
    subtypes: [
      'Obra nueva / Edificio',
      'Fachada gran formato',
      'Pisos & Parqueaderos'
    ]
  }
];

export const TRANSFORMATION_STYLES: TransformationStyleOption[] = [
  {
    id: 'calido_sereno',
    name: 'Cálido Sereno (Terracota & Lino)',
    colorName: 'Lino Andino & Acento Barichara',
    colorHex: '#F4EFEA',
    colorCode: 'COL-104',
    finish: 'Mate Terciopelo',
    mood: 'Acogedor, luminoso y relajante',
    afterImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Equilibra luz natural con tonos cálidos de baja saturación. Ideal para salas y habitaciones que buscan amplitud y confort.'
  },
  {
    id: 'minimalista_luz',
    name: 'Minimalista Luz (Blanco Puro Biocuidado)',
    colorName: 'Blanco Nevada Puro',
    colorHex: '#FAFAFA',
    colorCode: 'COL-001',
    finish: 'Mate Lavable Cero Olor',
    mood: 'Máxima amplitud, limpieza y claridad visual',
    afterImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Refleja hasta un 88% de la luz ambiental. Transmite frescura y orden impecable con tecnología anti-bacterial.'
  },
  {
    id: 'verde_botanico',
    name: 'Verde Botánico (Salvia & Niebla)',
    colorName: 'Salvia Valle del Cocora',
    colorHex: '#A3B19B',
    colorCode: 'COL-308',
    finish: 'Satinado Seda',
    mood: 'Conexión natural, elegancia biofílica',
    afterImageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    description: 'Tonalidad orgánica que reduce el estrés visual. Acompaña maderas claras, fibras naturales y vegetación interior.'
  },
  {
    id: 'azul_profundo',
    name: 'Azul Élite (Acento Guatapé)',
    colorName: 'Azul Guatapé Profundo',
    colorHex: '#1E3A5F',
    colorCode: 'COL-502',
    finish: 'Semibrillante Alta Resistencia',
    mood: 'Sofisticado, ejecutivo y de alto contraste',
    afterImageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Muro de acento elegante que aporta profundidad y carácter tanto en salas ejecutivas como en comedores modernos.'
  },
  {
    id: 'industrial_lofte',
    name: 'Gris Urbano Contemporáneo',
    colorName: 'Gris Monserrate Mate',
    colorHex: '#64748B',
    colorCode: 'COL-704',
    finish: 'Mate Antipolvo',
    mood: 'Moderno, sobrio y durable',
    afterImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    description: 'Inspirado en el diseño arquitectónico urbano. Excelente disimulo de imperfecciones con alta resistencia al roce.'
  }
];

export const SAMPLE_IMAGES: SampleImageOption[] = [
  {
    id: 'sample-1',
    title: 'Muro de sala con humedad por capilaridad en base',
    category: 'hogar',
    clientType: 'particular',
    transformationTarget: 'hogar',
    surface: 'Pañete / Revoque interior con estuco tradicional',
    surfaceType: 'concreto',
    conditionEnum: 'humedad',
    problem: 'Humedad freática, eflorescencia salina y pintura englobada',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    additionalUrls: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    defaultDescription: 'Muro del salón con manchas oscuras en el zócalo, pintura soplada que se cae en polvo y olor a humedad en época de lluvias.',
    areaM2: 28,
    locationCity: 'Bogotá D.C.',
    recommendedColor: {
      name: 'Lino Andino & Acento Barichara',
      hex: '#F4EFEA',
      code: 'COL-104'
    }
  },
  {
    id: 'sample-2',
    title: 'Fachada exterior con polución, sol y microfisuras',
    category: 'hogar',
    clientType: 'particular',
    transformationTarget: 'hogar',
    surface: 'Revoque rústico exterior expuesto al clima tropical',
    surfaceType: 'concreto',
    conditionEnum: 'reparacion',
    problem: 'Desgaste por rayos UV, chorreado negro de lluvia y microfisuras',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    additionalUrls: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    defaultDescription: 'Fachada de dos pisos con desgaste de color por el sol de la tarde y marcas oscuras de agua en los aleros tras fuertes lluvias.',
    areaM2: 52,
    locationCity: 'Medellín',
    recommendedColor: {
      name: 'Blanco Koraza Hidrófugo',
      hex: '#FAFAFA',
      code: 'KOR-01'
    }
  },
  {
    id: 'sample-3',
    title: 'Oficina corporativa / Open space para renovación',
    category: 'oficina',
    clientType: 'empresa',
    transformationTarget: 'empresa',
    surface: 'Drywall liso con marcas de roce e iluminación mixta',
    surfaceType: 'drywall',
    conditionEnum: 'desgaste',
    problem: 'Color amarillento desgastado y falta de identidad moderna',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    additionalUrls: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    defaultDescription: 'Queremos transformar la oficina central con pintura ultra-lavable, rápida ocupación y colores que fomenten la creatividad.',
    areaM2: 75,
    locationCity: 'Cali',
    recommendedColor: {
      name: 'Gris Monserrate Mate & Verde Salvia',
      hex: '#A3B19B',
      code: 'COL-308'
    }
  },
  {
    id: 'sample-4',
    title: 'Local comercial y restaurante / Zona social',
    category: 'comercio',
    clientType: 'empresa',
    transformationTarget: 'empresa',
    surface: 'Paredes mixtas concreto y madera con alta afluencia',
    surfaceType: 'madera',
    conditionEnum: 'desgaste',
    problem: 'Manchas de grasa, huellas de roce continuo y desgaste de brillo',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    additionalUrls: [],
    defaultDescription: 'Espacio de cafetería y restaurante donde requerimos recubrimientos de máxima lavabilidad, cero olor residual y alta estética.',
    areaM2: 60,
    locationCity: 'Barranquilla',
    recommendedColor: {
      name: 'Blanco Puro Biocuidado & Acento Mostaza',
      hex: '#E5A93C',
      code: 'COL-210'
    }
  },
  {
    id: 'sample-5',
    title: 'Planta industrial / Estructura metálica & taller',
    category: 'industria',
    clientType: 'empresa',
    transformationTarget: 'constructivo',
    surface: 'Vigas de acero y pañetes con corrosión superficial',
    surfaceType: 'metal',
    conditionEnum: 'reparacion',
    problem: 'Oxidación localizada, vapores químicos y desprendimiento previo',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    additionalUrls: [],
    defaultDescription: 'Nave industrial que requiere protección anticorrosiva epóxica y esmalte de alta durabilidad para maquinaria y muros perimetrales.',
    areaM2: 180,
    locationCity: 'Bucaramanga',
    recommendedColor: {
      name: 'Gris Técnico Epóxico Pintucoat',
      hex: '#475569',
      code: 'EPX-900'
    }
  }
];

export const COATING_PRODUCTS: Record<string, CoatingProduct> = {
  sellomax_antihumedad: {
    id: 'prod-p1',
    name: 'Pintuco Sellomax Sellador Barrera Anti-Humedad',
    category: 'Imprimación & Barrera Hidrófuga',
    brand: 'Pintuco Colombia',
    pintucoLine: 'Línea Sellomax Pro',
    type: 'Sellador acrílico-siliconado hidrófugo de penetración profunda',
    base: 'Acuosa transpirable al vapor',
    yieldM2PerLiter: 10,
    recommendedCoats: 1,
    dryingTimeHours: 3,
    durabilityYears: 10,
    features: [
      'Bloquea eflorescencias salinas y salitre',
      'Penetra hasta 4mm en poros de pañete y estuco',
      'Neutraliza alcalinidad del cemento nuevo',
      'Crea puente de adherencia ultra-fuerte'
    ],
    pricePerLiterEst: 14.5,
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)']
  },
  viniltex_biocuidado: {
    id: 'prod-c1',
    name: 'Pintuco Viniltex Biocuidado Cero Olor & Anti-Bacterial',
    category: 'Pintura de Acabado Premium Interior',
    brand: 'Pintuco Colombia',
    pintucoLine: 'Línea Viniltex Master',
    type: 'Pintura vinil-acrílica Tipo 1 de alta lavabilidad con iones de plata',
    base: 'Acuosa ecológica sin VOC',
    yieldM2PerLiter: 9.5,
    recommendedCoats: 2,
    dryingTimeHours: 3,
    durabilityYears: 8,
    features: [
      'Lavabilidad Clase 1 (soporta más de 1.000 ciclos de lavado)',
      '99.9% protección activa contra bacterias y hongos',
      'Cero olor: permite habitar el espacio el mismo día',
      'Poder cubriente superior en 2 manos'
    ],
    pricePerLiterEst: 18.5,
    presentationTypes: ['1/4 Galón', 'Galón (3.785 L)', 'Cuñete (18.9 L)']
  },
  koraza_maxima: {
    id: 'prod-c2',
    name: 'Pintuco Koraza Máxima Protección 5/7 Años',
    category: 'Recubrimiento Fachadas & Exteriores',
    brand: 'Pintuco Colombia',
    pintucoLine: 'Línea Koraza Fachadas',
    type: 'Pintura 100% acrílica elastomérica para intemperie severa',
    base: 'Acuosa hidrorepelente UV',
    yieldM2PerLiter: 8.0,
    recommendedCoats: 2,
    dryingTimeHours: 4,
    durabilityYears: 7,
    features: [
      'Puentea microfisuras de hasta 0.5 mm en muros exteriores',
      'Filtros solares UV de alta solidez al color',
      'Tecnología autolavable con el agua de lluvia',
      'Resiste ataque de algas y moho en climas húmedos'
    ],
    pricePerLiterEst: 21.0,
    presentationTypes: ['Galón (3.785 L)', 'Cuñete (18.9 L)']
  },
  pintulux_aqua: {
    id: 'prod-c3',
    name: 'Pintuco Pintulux Aqua Esmalte al Agua',
    category: 'Esmalte de Alta Resistencia para Madera y Metal',
    brand: 'Pintuco Colombia',
    pintucoLine: 'Línea Pintulux Esmaltes',
    type: 'Esmalte acrílico al agua de secado rápido sin solventes',
    base: 'Acuosa bajo olor',
    yieldM2PerLiter: 11.0,
    recommendedCoats: 2,
    dryingTimeHours: 2,
    durabilityYears: 8,
    features: [
      'Secado al tacto en 45 minutos',
      'No se amarillenta con el tiempo',
      'Ideal para puertas, zócalos, marcos y muebles',
      'Fácil limpieza de herramientas con agua'
    ],
    pricePerLiterEst: 19.8,
    presentationTypes: ['1/4 Galón', 'Galón (3.785 L)']
  },
  pintucoat_epoxico: {
    id: 'prod-c4',
    name: 'Pintuco Pintucoat Epóxico Bicomponente 2K',
    category: 'Revestimiento de Alto Tráfico para Pisos e Industria',
    brand: 'Pintuco Colombia',
    pintucoLine: 'Línea Pintucoat Alto Desempeño',
    type: 'Resina epóxica poliamida de alta resistencia química y mecánica',
    base: 'Epoxi bicomponente',
    yieldM2PerLiter: 5.5,
    recommendedCoats: 2,
    dryingTimeHours: 12,
    durabilityYears: 12,
    features: [
      'Resiste paso continuo de montacargas y vehículos',
      'Impermeable a aceites, grasas, detergentes y solventes',
      'Acabado brillante liso antipolvo de fácil desinfección',
      'Cumple norma sanitaria para alimentos y laboratorios'
    ],
    pricePerLiterEst: 32.5,
    presentationTypes: ['Kit Galón 2K', 'Kit Cuñete 2K']
  }
};

export const COLOR_PALETTES = [
  { name: 'Lino Andino', hex: '#F4EFEA', group: 'Neutros & Confort', code: 'COL-104' },
  { name: 'Blanco Nevada', hex: '#FAFAFA', group: 'Neutros & Confort', code: 'COL-001' },
  { name: 'Salvia Valle del Cocora', hex: '#A3B19B', group: 'Tendencia Natural', code: 'COL-308' },
  { name: 'Terracota Barichara', hex: '#C27B66', group: 'Acentos Cálidos', code: 'COL-215' },
  { name: 'Azul Guatapé Profundo', hex: '#1E3A5F', group: 'Acentos Premium', code: 'COL-502' },
  { name: 'Gris Monserrate Mate', hex: '#64748B', group: 'Arquitectónico', code: 'COL-704' },
  { name: 'Gris Industrial RAL 7035', hex: '#CBD5E1', group: 'Industrial', code: 'EPX-70' }
];

export const INITIAL_REQUESTS: ProjectRequest[] = [
  {
    id: 'CLK-8501',
    code: 'CLK-8501',
    createdAt: '2026-08-15T10:00:00.000Z',
    clientType: 'particular',
    client: {
      name: 'María Fernanda Gómez',
      email: 'maria.gomez@gmail.com',
      phone: '+57 312 456 7890',
      city: 'Bogotá D.C.'
    },
    input: {
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'María Fernanda Gómez',
      clientEmail: 'maria.gomez@gmail.com',
      clientPhone: '+57 312 456 7890',
      clientCity: 'Bogotá D.C.',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Sala / Comedor',
      specificArea: 'Muro principal y zócalo de sala',
      surfaceType: 'concreto',
      currentConditionEnum: 'humedad',
      currentCondition: 'humedad',
      estimatedM2: 28,
      spacesCount: 1,
      estimatedBudget: 320000,
      requiredProjectDate: '2026-08-22',
      createdAt: '2026-08-15T10:00:00.000Z',
      hasMoisture: true,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: true,
      trafficLevel: 'medio',
      urgency: 'alta',
      description: 'Pared de la sala con humedad en la parte baja, pintura descascarada y manchas de salitre.',
      observations: 'Se requiere visita técnica preferiblemente en la mañana.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'sala_humedad_zocalo.jpg',
      evidences: [
        {
          id: 'ev-8501-1',
          archivo: 'sala_humedad_zocalo.jpg',
          tipo: 'image/jpeg',
          fechaCarga: '2026-08-15T09:58:00.000Z',
          descripcion: 'Humedad por capilaridad en muro inferior con desprendimiento de película.',
          categoria: 'muro_principal',
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          tamanioBytes: 1948200
        }
      ],
      selectedColorHex: '#F4EFEA',
      selectedColorName: 'Lino Andino & Acento Barichara',
      selectedColorCode: 'COL-104',
      selectedFinish: 'mate',
      selectedStyle: 'Cálido Sereno (Terracota & Lino)'
    },
    aiAnalysis: {
      detectedSurface: 'Pañete tradicional con estuco y eflorescencia higroscópica',
      primaryProblem: 'Humedad por capilaridad en muro inferior con desprendimiento de película',
      secondaryObservations: [
        'Presión de vapor ascendente detectada en los primeros 60 cm del muro.',
        'Sustrato superior en buen estado, apto para recubrimiento vinil-acrílico.',
        'Ambiente con ventilación moderada en clima frío-húmedo de Bogotá.'
      ],
      environmentalFactors: [
        'Clima Bogotá (Humedad relativa promedio 75%)',
        'Muro interior perimetral sin aislamiento de cimientos'
      ],
      ambientContext: 'Interior residencial con luz natural lateral matutina',
      complexityLevel: 'Media',
      overallConfidence: 98.4,
      environmentalSuitability: 'Apto para sistema Sellomax + Viniltex Biocuidado',
      moistureIndex: 45,
      adhesionScore: 54,
      detectionAreas: [
        {
          id: 'area-1',
          label: 'Eflorescencia salina & descascarillado',
          confidence: 99.2,
          x: 18,
          y: 50,
          width: 65,
          height: 40,
          severity: 'alta',
          description: 'Humedad freática rompiendo el estuco previo. Requiere raspado y sellador hidrófugo.'
        }
      ],
      processingTimeMs: 420,
      conversationalSummary: 'Detectamos una superficie interior con señales de humedad ascendente en el zócalo y desprendimiento localizado. Es fundamental curar la base con Sellomax antes de pintar con Viniltex Biocuidado.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Pintuco Anti-Humedad & Viniltex Biocuidado',
      pintucoFamilyName: 'Sellomax Barrera + Viniltex Biocuidado Cero Olor',
      systemSummary: 'Tratamiento curativo de humedad por capilaridad + Capa de acabado lavable con iones de plata.',
      solutionType: 'Protección Integral Anti-Humedad & Bienestar',
      primerProduct: COATING_PRODUCTS.sellomax_antihumedad,
      mainCoatingProduct: COATING_PRODUCTS.viniltex_biocuidado,
      preparationSteps: [
        '1. Raspar con espátula de acero toda la pintura soplada y estuco suelto hasta llegar al pañete firme.',
        '2. Limpiar eflorescencias salinas con cepillo de cerdas duras y dejar secar 24 horas.',
        '3. Aplicar 1 mano pura de Sellomax Barrera Anti-Humedad penetrando los poros del muro.',
        '4. Reestucar zonas tratadas con Estuco Acrílico Exterior/Interior Pintuco.',
        '5. Aplicar 2 manos de Viniltex Biocuidado dejando secar 3 horas entre manos.'
      ],
      calculatedLiters: 6.0,
      calculatedGallons: 1.6,
      calculatedBuckets: 0,
      calculatedPrimerLiters: 2.8,
      estimatedLaborDays: 2,
      complexityLevel: 'Moderado',
      estimatedCostRange: {
        min: 165000,
        max: 220000,
        currency: 'COP ($)'
      },
      technicalAdvice: 'Ventilar el salón durante la aplicación para acelerar el curado del Sellomax. El Viniltex Biocuidado no genera olor residual, permitiendo usar el espacio de inmediato.',
      warrantyPeriod: '8 años de protección certificada Pintuco',
      suggestedFinish: 'Mate Terciopelo',
      suggestedStyle: 'Cálido Sereno (Terracota & Lino)',
      selectedColorHex: '#F4EFEA',
      selectedColorName: 'Lino Andino & Acento Barichara',
      selectedColorCode: 'COL-104',
      nextSteps: [
        {
          title: 'Asesoría Técnica Pintuco',
          description: 'Un asesor técnico de Pintuco revisa la foto para confirmar la dosis exacta.',
          actionLabel: 'Validar con Técnico'
        },
        {
          title: 'Muestra de Color a Domicilio',
          description: 'Recibe una tarjeta de color real con acabado mate en tu casa en Bogotá.',
          actionLabel: 'Pedir Muestra'
        }
      ]
    },
    status: 'nueva',
    assignedTechnician: 'Ing. Carlos Mendoza (IA Pintuco)',
    technicianNotes: 'Solicitud con diagnóstico IA completo. Se recomienda verificar ventilación en visita técnica.'
  },
  {
    id: 'CLK-8502',
    code: 'CLK-8502',
    createdAt: '2026-08-15T09:20:00.000Z',
    clientType: 'empresa',
    client: {
      name: 'Andrés Echeverry',
      email: 'operaciones@innovacion-retail.co',
      phone: '+57 300 890 1234',
      city: 'Medellín',
      companyName: 'Innovación Retail S.A.S.',
      companyNit: '900.876.543-1',
      contactPerson: 'Andrés Echeverry (Director Operaciones)'
    },
    input: {
      transformationTarget: 'empresa',
      clientType: 'empresa',
      companyName: 'Innovación Retail S.A.S.',
      companyNit: '900.876.543-1',
      companyContactPerson: 'Andrés Echeverry',
      clientName: 'Andrés Echeverry',
      clientEmail: 'operaciones@innovacion-retail.co',
      clientPhone: '+57 300 890 1234',
      clientCity: 'Medellín',
      spaceType: 'comercio',
      specificSpaceSubtype: 'Local comercial / Retail & Restaurante',
      specificArea: 'Fachada principal y acceso comercial',
      surfaceType: 'concreto',
      currentConditionEnum: 'desgaste',
      currentCondition: 'desconchado',
      estimatedM2: 55,
      spacesCount: 2,
      estimatedBudget: 850000,
      requiredProjectDate: '2026-08-28',
      createdAt: '2026-08-15T09:20:00.000Z',
      hasMoisture: false,
      hasCracks: true,
      acceptsTerms: true,
      requiresTechnicalVisit: true,
      trafficLevel: 'alto',
      urgency: 'alta',
      description: 'Fachada del local en El Poblado con marcas de polución, desgaste solar y microfisuras por dilatación térmica.',
      observations: 'Acceso comercial libre únicamente de noche o fines de semana.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'fachada_local_medellin.jpg',
      evidences: [
        {
          id: 'ev-8502-1',
          archivo: 'fachada_local_medellin.jpg',
          tipo: 'image/jpeg',
          fechaCarga: '2026-08-15T09:18:00.000Z',
          descripcion: 'Fachada comercial con polución y microfisuras por intemperie.',
          categoria: 'panoramica',
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          tamanioBytes: 3120400
        }
      ],
      selectedColorHex: '#FAFAFA',
      selectedColorName: 'Blanco Koraza Hidrófugo',
      selectedColorCode: 'KOR-01',
      selectedFinish: 'satinado',
      selectedStyle: 'Minimalista Luz (Blanco Puro Biocuidado)'
    },
    aiAnalysis: {
      detectedSurface: 'Mortero monocapa exterior con microfisuras térmicas',
      primaryProblem: 'Pérdida de elasticidad del recubrimiento previo y ensuciamiento por lluvia',
      secondaryObservations: [
        'Exposición directa a radiación solar vespertina.',
        'Microfisuras capilares de hasta 0.3mm sin afectación estructural.',
        'Requiere recubrimiento elastomérico 100% acrílico auto-limpiable.'
      ],
      environmentalFactors: [
        'Clima Medellín (Alternancia sol intenso y aguaceros torrenciales)',
        'Alto tráfico peatonal y vehicular en vía comercial'
      ],
      ambientContext: 'Exterior comercial en zona urbana de alta visibilidad',
      complexityLevel: 'Media',
      overallConfidence: 99.1,
      environmentalSuitability: 'Ideal para Sistema Pintuco Koraza Máxima Protección',
      moistureIndex: 18,
      adhesionScore: 78,
      detectionAreas: [],
      processingTimeMs: 380,
      conversationalSummary: 'Detectamos una fachada comercial con desgaste por intemperie y microfisuras leves. Recomendamos Koraza Máxima Protección 7 años para sellar fisuras y repeler la suciedad.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Pintuco Koraza 7 Años Alta Intemperie',
      pintucoFamilyName: 'Sellomax Fijador + Koraza Máxima Protección Elastomérica',
      systemSummary: 'Impermeabilización elástica hidrófuga que puentea fisuras y mantiene el color intacto.',
      solutionType: 'Protección Comercial de Fachada & Durabilidad Extrema',
      primerProduct: COATING_PRODUCTS.sellomax_antihumedad,
      mainCoatingProduct: COATING_PRODUCTS.koraza_maxima,
      preparationSteps: [
        '1. Lavado con hidrolavadora a presión moderada para eliminar polvo y hollín.',
        '2. Puentear microfisuras con Masilla Acrílica Exterior Pintuco.',
        '3. Aplicar 1 mano de Sellomax Acrílico para consolidar el mortero.',
        '4. Aplicar 2 manos de Koraza Máxima Protección 7 Años con rodillo de lana.'
      ],
      calculatedLiters: 14.0,
      calculatedGallons: 3.7,
      calculatedBuckets: 1,
      calculatedPrimerLiters: 5.5,
      estimatedLaborDays: 2.5,
      complexityLevel: 'Moderado',
      estimatedCostRange: {
        min: 390000,
        max: 480000,
        currency: 'COP ($)'
      },
      technicalAdvice: 'Aplicar en horas de la mañana antes de que el sol caliente directamente la fachada para evitar secado prematuro.',
      warrantyPeriod: '7 años de garantía certificada Pintuco',
      suggestedFinish: 'Satinado Seda',
      suggestedStyle: 'Minimalista Luz (Blanco Puro Biocuidado)',
      selectedColorHex: '#FAFAFA',
      selectedColorName: 'Blanco Koraza Hidrófugo',
      selectedColorCode: 'KOR-01',
      nextSteps: [
        {
          title: 'Visita Técnica Comercial',
          description: 'Coordinar visita de perito Pintuco en Medellín para levantamiento de metraje.',
          actionLabel: 'Agendar Visita'
        }
      ]
    },
    status: 'validacion_tecnica',
    assignedTechnician: 'Arq. Valentina Ríos (Pintuco Pro)',
    technicianNotes: 'Metraje verificado. Cotización corporativa lista para aprobación del cliente.',
    quotedAmount: 440000
  },
  {
    id: 'CLK-8503',
    code: 'CLK-8503',
    createdAt: '2026-08-14T16:45:00.000Z',
    clientType: 'empresa',
    client: {
      name: 'Dr. Roberto Mendoza',
      email: 'direccion@clinica-odontologica-valle.com',
      phone: '+57 315 776 2211',
      city: 'Cali',
      companyName: 'Clínica Dental & Estética Valle',
      companyNit: '901.332.110-4',
      contactPerson: 'Dr. Roberto Mendoza'
    },
    input: {
      transformationTarget: 'empresa',
      clientType: 'empresa',
      companyName: 'Clínica Dental & Estética Valle',
      companyNit: '901.332.110-4',
      companyContactPerson: 'Dr. Roberto Mendoza',
      clientName: 'Dr. Roberto Mendoza',
      clientEmail: 'direccion@clinica-odontologica-valle.com',
      clientPhone: '+57 315 776 2211',
      clientCity: 'Cali',
      spaceType: 'oficina',
      specificSpaceSubtype: 'Consultorios & Salas de Espera',
      specificArea: 'Zona de recepción y consultorio clínico',
      surfaceType: 'drywall',
      currentConditionEnum: 'desgaste',
      currentCondition: 'manchas',
      estimatedM2: 75,
      spacesCount: 3,
      estimatedBudget: 1200000,
      requiredProjectDate: '2026-08-30',
      createdAt: '2026-08-14T16:45:00.000Z',
      hasMoisture: false,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      trafficLevel: 'alto',
      urgency: 'alta',
      description: 'Espacios de atención médica que requieren máxima higiene, pintura antibacterial lavable y cero olor para no interrumpir consultas.',
      observations: 'Aplicación en horario nocturno para reapertura al día siguiente.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'consultorio_cali.jpg',
      evidences: [
        {
          id: 'ev-8503-1',
          archivo: 'consultorio_cali.jpg',
          tipo: 'image/jpeg',
          fechaCarga: '2026-08-14T16:40:00.000Z',
          descripcion: 'Muros interiores en drywall con alto tránsito y necesidad de recubrimiento antibacteriano.',
          categoria: 'muro_principal',
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          tamanioBytes: 2450000
        }
      ],
      selectedColorHex: '#A3B19B',
      selectedColorName: 'Verde Salvia & Gris Monserrate',
      selectedColorCode: 'BIO-208',
      selectedFinish: 'satinado',
      selectedStyle: 'Equilibrio Botánico (Salvia & Gris)'
    },
    aiAnalysis: {
      detectedSurface: 'Placa de yeso-cartón (drywall) con pintura vinílica previa',
      primaryProblem: 'Necesidad de grado aséptico, resistencia a desinfectantes y olor nulo',
      secondaryObservations: [
        'Sustrato nivelado sin deformaciones mecánicas.',
        'Zona de alto contacto manual y limpieza hospitalaria continua.'
      ],
      environmentalFactors: ['Clima cálido Cali', 'Aire acondicionado continuo 22°C'],
      ambientContext: 'Institución de salud privada',
      complexityLevel: 'Media',
      overallConfidence: 99.4,
      environmentalSuitability: 'Recomendado Sistema Viniltex Biocuidado Grado Clínico',
      moistureIndex: 12,
      adhesionScore: 88,
      detectionAreas: [],
      processingTimeMs: 310,
      conversationalSummary: 'Espacio médico que requiere Viniltex Biocuidado con iones de plata antimicrobianos y cero emisión de compuestos orgánicos volátiles.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Viniltex Biocuidado Cero Olor con Iones de Plata',
      pintucoFamilyName: 'Viniltex Biocuidado Antimicrobiano Certificado',
      systemSummary: 'Recubrimiento 99.9% antibacterial resistente al lavado con hipoclorito y desinfectantes clínicos.',
      solutionType: 'Protección Hospitalaria & Calidad de Aire Interior',
      primerProduct: COATING_PRODUCTS.sellomax_antihumedad,
      mainCoatingProduct: COATING_PRODUCTS.viniltex_biocuidado,
      preparationSteps: [
        '1. Limpieza con alcohol isopropílico para retirar grasas.',
        '2. Masillado puntual de imperfecciones con Estuco Drywall Pintuco.',
        '3. Aplicación de 2 manos de Viniltex Biocuidado.'
      ],
      calculatedLiters: 19.5,
      calculatedGallons: 5.2,
      calculatedBuckets: 1,
      calculatedPrimerLiters: 4.0,
      estimatedLaborDays: 1.5,
      complexityLevel: 'Fácil (DIY)',
      estimatedCostRange: {
        min: 490000,
        max: 610000,
        currency: 'COP ($)'
      },
      technicalAdvice: 'Pintura certificada con secado al tacto en 45 minutos. Cero olor residual.',
      warrantyPeriod: '10 años de protección antibacterial Pintuco',
      suggestedFinish: 'Satinado Clínico',
      suggestedStyle: 'Equilibrio Botánico (Salvia & Gris)',
      selectedColorHex: '#A3B19B',
      selectedColorName: 'Verde Salvia & Gris Monserrate',
      selectedColorCode: 'BIO-208',
      nextSteps: [
        {
          title: 'Aprobación Comercial',
          description: 'Orden confirmada y lista para despacho logístico.',
          actionLabel: 'Despachar Pedido'
        }
      ]
    },
    status: 'gestion_comercial',
    assignedTechnician: 'Ing. Mateo Gómez (Especialista Biocuidado)',
    technicianNotes: 'Cliente aprobó cotización por $540.000 COP. Despacho programado para mañana en Cali.',
    quotedAmount: 540000
  },
  {
    id: 'CLK-8504',
    code: 'CLK-8504',
    createdAt: '2026-08-13T11:15:00.000Z',
    clientType: 'particular',
    client: {
      name: 'Felipe Salamanca',
      email: 'felipe.salamanca@outlook.com',
      phone: '+57 320 994 3322',
      city: 'Barranquilla'
    },
    input: {
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'Felipe Salamanca',
      clientEmail: 'felipe.salamanca@outlook.com',
      clientPhone: '+57 320 994 3322',
      clientCity: 'Barranquilla',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Terraza & Zona BBQ',
      specificArea: 'Muro perimetral terraza exterior',
      surfaceType: 'concreto',
      currentConditionEnum: 'humedad',
      currentCondition: 'moho',
      estimatedM2: 36,
      spacesCount: 1,
      estimatedBudget: 420000,
      requiredProjectDate: '2026-08-25',
      createdAt: '2026-08-13T11:15:00.000Z',
      hasMoisture: true,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: 'Muro de terraza con manchas oscuras de moho por humedad costera y brisa marina.',
      observations: 'Requiere pintura antihongos de alta resistencia a salinidad.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'terraza_barranquilla.jpg',
      evidences: [],
      selectedColorHex: '#F4EFEA',
      selectedColorName: 'Arena Caribe & Blanco Puro',
      selectedColorCode: 'KOR-112',
      selectedFinish: 'mate',
      selectedStyle: 'Cálido Sereno'
    },
    aiAnalysis: {
      detectedSurface: 'Mampostería exterior con salitre marino y hongo filamentoso',
      primaryProblem: 'Condensación salina y crecimiento biológico por alta humedad relativa',
      secondaryObservations: ['Afectación superficial sin compromiso estructural.'],
      environmentalFactors: ['Ambiente costero Barranquilla', 'HR > 80%'],
      ambientContext: 'Terraza descubierta',
      complexityLevel: 'Media',
      overallConfidence: 97.8,
      environmentalSuitability: 'Apto para Koraza Máxima Protección Antihongos',
      moistureIndex: 58,
      adhesionScore: 62,
      detectionAreas: [],
      processingTimeMs: 340,
      conversationalSummary: 'Detectamos moho por humedad costera. Recomendamos lavado fungicida y aplicación de Koraza con triple barrera antihongos.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Koraza Antihongos Triple Acción',
      pintucoFamilyName: 'Koraza Protección Marina Antihongos',
      systemSummary: 'Impermeabilizante con aditivos fungicidas y antialgas de larga duración.',
      solutionType: 'Protección Costera & Anti-Moho',
      primerProduct: COATING_PRODUCTS.sellomax_antihumedad,
      mainCoatingProduct: COATING_PRODUCTS.koraza_maxima,
      preparationSteps: [
        '1. Lavado fungicida con Solución Lavamuros Pintuco.',
        '2. Aplicación de Sellomax Antihumedad.',
        '3. 2 manos de Koraza Protección Marina.'
      ],
      calculatedLiters: 9.0,
      calculatedGallons: 2.4,
      calculatedBuckets: 0,
      calculatedPrimerLiters: 3.5,
      estimatedLaborDays: 2,
      complexityLevel: 'Moderado',
      estimatedCostRange: {
        min: 240000,
        max: 310000,
        currency: 'COP ($)'
      },
      technicalAdvice: 'Lavar con agua dulce antes de pintar para retirar sales depositadas.',
      warrantyPeriod: '7 años de protección certificada',
      suggestedFinish: 'Mate Antirreflejo',
      suggestedStyle: 'Arena Caribe',
      selectedColorHex: '#F4EFEA',
      selectedColorName: 'Arena Caribe',
      selectedColorCode: 'KOR-112',
      nextSteps: []
    },
    status: 'recomendacion_generada',
    assignedTechnician: 'Ing. Carlos Mendoza (IA Pintuco)',
    technicianNotes: 'Recomendación generada por IA. Presupuesto listo para consulta del cliente.',
    quotedAmount: 275000
  },
  {
    id: 'CLK-8505',
    code: 'CLK-8505',
    createdAt: '2026-08-10T08:30:00.000Z',
    clientType: 'particular',
    client: {
      name: 'Camila Morales',
      email: 'camila.morales@gmail.com',
      phone: '+57 311 200 4455',
      city: 'Bucaramanga'
    },
    input: {
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'Camila Morales',
      clientEmail: 'camila.morales@gmail.com',
      clientPhone: '+57 311 200 4455',
      clientCity: 'Bucaramanga',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Habitación Infantil',
      specificArea: 'Muros completos y cielo raso',
      surfaceType: 'concreto',
      currentConditionEnum: 'nuevo',
      currentCondition: 'bueno',
      estimatedM2: 24,
      spacesCount: 1,
      estimatedBudget: 280000,
      requiredProjectDate: '2026-08-18',
      createdAt: '2026-08-10T08:30:00.000Z',
      hasMoisture: false,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: 'Cambio de color para habitación de bebé con pintura ecológica sin olor y ultra lavable.',
      observations: 'Entrega finalizada a satisfacción total.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'habitacion_bebe.jpg',
      evidences: [],
      selectedColorHex: '#E5A93C',
      selectedColorName: 'Mostaza Cálido & Blanco Seda',
      selectedColorCode: 'VIN-304',
      selectedFinish: 'satinado',
      selectedStyle: 'Cálido Luminoso'
    },
    aiAnalysis: {
      detectedSurface: 'Estuco fino interior en óptimo estado',
      primaryProblem: 'Renovación estética e hipoalergénica',
      secondaryObservations: ['Superficie completamente curada y lista.'],
      environmentalFactors: ['Clima templado Bucaramanga'],
      ambientContext: 'Dormitorio infantil',
      complexityLevel: 'Baja (DIY)',
      overallConfidence: 99.8,
      environmentalSuitability: 'Excelente para Viniltex Biocuidado',
      moistureIndex: 8,
      adhesionScore: 95,
      detectionAreas: [],
      processingTimeMs: 220,
      conversationalSummary: 'Superficie en excelente estado lista para aplicación directa de Viniltex Biocuidado.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Viniltex Biocuidado Hipoalergénico',
      pintucoFamilyName: 'Viniltex Biocuidado Cero Olor',
      systemSummary: 'Pintura lavable con certificación de bienestar y pureza ambiental.',
      solutionType: 'Renovación Infantil & Bienestar',
      primerProduct: COATING_PRODUCTS.sellomax_antihumedad,
      mainCoatingProduct: COATING_PRODUCTS.viniltex_biocuidado,
      preparationSteps: ['1. Limpiar polvo.', '2. 2 manos de Viniltex Biocuidado.'],
      calculatedLiters: 6.0,
      calculatedGallons: 1.6,
      calculatedBuckets: 0,
      calculatedPrimerLiters: 0,
      estimatedLaborDays: 1,
      complexityLevel: 'Fácil (DIY)',
      estimatedCostRange: { min: 140000, max: 180000, currency: 'COP ($)' },
      technicalAdvice: 'Secado en 2 horas.',
      warrantyPeriod: '10 años certificada',
      suggestedFinish: 'Satinado',
      suggestedStyle: 'Cálido Luminoso',
      selectedColorHex: '#E5A93C',
      selectedColorName: 'Mostaza Cálido',
      selectedColorCode: 'VIN-304',
      nextSteps: []
    },
    status: 'finalizada',
    assignedTechnician: 'Ing. Carlos Mendoza (IA Pintuco)',
    technicianNotes: 'Proyecto ejecutado y finalizado exitosamente. Cliente calificó con 5/5 estrellas.',
    quotedAmount: 165000
  }
];

export interface ProcessStageConfig {
  key: string;
  stepNumber: number;
  label: string;
  shortLabel: string;
  clientLabel: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  dotColor: string;
  description: string;
  companyAction: string;
}

export const PROCESS_STAGES: ProcessStageConfig[] = [
  {
    key: 'nueva',
    stepNumber: 1,
    label: 'Nueva solicitud',
    shortLabel: 'Nueva',
    clientLabel: 'Recibida por ColorLink',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-500',
    dotColor: 'bg-emerald-500',
    description: 'Solicitud entrante registrada en plataforma con fotos y especificaciones.',
    companyAction: 'Revisar datos y admitir a pipeline'
  },
  {
    key: 'info_pendiente',
    stepNumber: 2,
    label: 'Información pendiente',
    shortLabel: 'Info Pendiente',
    clientLabel: 'Documentación o foto adicional requerida',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-500',
    dotColor: 'bg-amber-500',
    description: 'Se requiere metraje preciso, fotos de iluminación o acceso al inmueble.',
    companyAction: 'Solicitar aclaración o fotos al cliente'
  },
  {
    key: 'analizando',
    stepNumber: 3,
    label: 'Analizando IA',
    shortLabel: 'Analizando IA',
    clientLabel: 'Análisis de Visión & Patología IA en proceso',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-500',
    dotColor: 'bg-indigo-500',
    description: 'Red neuronal evaluando rugosidad, humedad, salitre y compatibilidad de base.',
    companyAction: 'Monitorear inferencia neural y métricas'
  },
  {
    key: 'validacion_tecnica',
    stepNumber: 4,
    label: 'Validación técnica',
    shortLabel: 'Peritaje Técnico',
    clientLabel: 'Validación por Perito Especialista Pintuco',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-500',
    dotColor: 'bg-blue-500',
    description: 'Ingeniero técnico Pintuco verificando dosificación, imprimación y rendimiento.',
    companyAction: 'Firmar dictamen y ajustar manos de pintura'
  },
  {
    key: 'recomendacion_generada',
    stepNumber: 5,
    label: 'Recomendación generada',
    shortLabel: 'Ficha Lista',
    clientLabel: 'Ficha técnica y presupuesto oficial listo',
    badgeBg: 'bg-violet-50 text-violet-800 border-violet-200',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-500',
    dotColor: 'bg-violet-500',
    description: 'Fórmula de producto, galones calculados, código de color y ficha descargable.',
    companyAction: 'Enviar propuesta formal al cliente'
  },
  {
    key: 'gestion_comercial',
    stepNumber: 6,
    label: 'Gestión comercial/operativa',
    shortLabel: 'Comercial/Operativa',
    clientLabel: 'Coordinación de despacho y cuadrilla',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-500',
    dotColor: 'bg-cyan-500',
    description: 'Coordinación logística de despacho Pintuco o asignación de contratista certificado.',
    companyAction: 'Programar entrega y fecha de inicio'
  },
  {
    key: 'finalizada',
    stepNumber: 7,
    label: 'Finalizada',
    shortLabel: 'Finalizada',
    clientLabel: 'Transformación completada con garantía',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-500',
    dotColor: 'bg-slate-500',
    description: 'Proyecto culminado, certificado de garantía emitido y cliente satisfecho.',
    companyAction: 'Archivar expediente con auditoría'
  }
];

export function normalizeRequestStatus(status: string): string {
  if (status === 'recibida') return 'nueva';
  if (status === 'revision_tecnica') return 'validacion_tecnica';
  if (status === 'recomendacion_lista') return 'recomendacion_generada';
  return status;
}

