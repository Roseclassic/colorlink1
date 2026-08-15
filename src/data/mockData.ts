import { CoatingProduct, ProjectRequest, SampleImageOption, SpaceType } from '../types';

export const SPACE_OPTIONS = [
  {
    id: 'hogar' as SpaceType,
    title: 'Hogar / Residencial',
    subtitle: 'Interiores, fachadas, terrazas y zonas húmedas',
    iconName: 'Home',
    popularBadge: 'Más frecuente',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/50',
    accentColor: 'text-amber-400',
    subtypes: [
      'Salón / Comedor',
      'Habitaciones',
      'Cocina / Baños',
      'Fachada exterior',
      'Terraza / Balcón',
      'Pintura de puertas y techos'
    ]
  },
  {
    id: 'oficina' as SpaceType,
    title: 'Oficina / Corporativo',
    subtitle: 'Espacios de trabajo, salas de juntas y recepciones',
    iconName: 'Building2',
    popularBadge: 'Rápido secado',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderColor: 'group-hover:border-cyan-500/50',
    accentColor: 'text-cyan-400',
    subtypes: [
      'Open Space / Coworking',
      'Despachos privados',
      'Sala de conferencias',
      'Pasillos de alto tráfico',
      'Recepción y lobby'
    ]
  },
  {
    id: 'comercio' as SpaceType,
    title: 'Comercio / Retail & Horeca',
    subtitle: 'Locales comerciales, restaurantes y boutiques',
    iconName: 'Store',
    popularBadge: 'Alta resistencia',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'group-hover:border-emerald-500/50',
    accentColor: 'text-emerald-400',
    subtypes: [
      'Tienda a pie de calle',
      'Restaurante / Cafetería',
      'Gimnasio / Estudio',
      'Centro de estética',
      'Escaparates y carpintería'
    ]
  },
  {
    id: 'industria' as SpaceType,
    title: 'Industria / Logística',
    subtitle: 'Pavimentos de alta carga, naves, estructuras metálicas',
    iconName: 'Factory',
    popularBadge: 'Grado Técnico',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'group-hover:border-purple-500/50',
    accentColor: 'text-purple-400',
    subtypes: [
      'Suelo de nave / Epoxi industrial',
      'Estructuras metálicas / Ignífugo',
      'Almacén logístico',
      'Taller mecánico',
      'Cubiertas y silos'
    ]
  }
];

export const SAMPLE_IMAGES: SampleImageOption[] = [
  {
    id: 'sample-1',
    title: 'Muro interior con humedad y descascarillado',
    category: 'hogar',
    surface: 'Yeso laminado sobre ladrillo',
    problem: 'Humedad por capilaridad y desprendimiento',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    defaultDescription: 'Pared del salón con manchas de humedad en la base y pintura abombada que se desprende al tacto.',
    areaM2: 24
  },
  {
    id: 'sample-2',
    title: 'Suelo de taller con desgaste y aceite',
    category: 'industria',
    surface: 'Hormigón pulido poroso',
    problem: 'Manchas de grasa, fisuras superficiales y abrasión',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    defaultDescription: 'Suelo de concreto con tránsito de carretillas, manchas de aceite penetradas y desgaste severo en pasillos.',
    areaM2: 120
  },
  {
    id: 'sample-3',
    title: 'Oficina moderna a renovar',
    category: 'oficina',
    surface: 'Pladur liso en buen estado',
    problem: 'Marcas de roces leves y cambio de imagen corporativa',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    defaultDescription: 'Queremos renovar la imagen de las salas de reunión con tonos neutros mate y pintura lavable sin olor.',
    areaM2: 65
  },
  {
    id: 'sample-4',
    title: 'Fachada comercial con moho y polución',
    category: 'comercio',
    surface: 'Mortero monocapa exterior',
    problem: 'Eflorescencias, manchas de escorrentía y contaminación',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    defaultDescription: 'Exterior de cafetería en zona peatonal, fachada oscurecida por polución y marcas de agua tras lluvias.',
    areaM2: 48
  },
  {
    id: 'sample-5',
    title: 'Barandilla y perfiles metálicos oxidados',
    category: 'hogar',
    surface: 'Hierro forjado y acero al carbono',
    problem: 'Corrosión galvánica y pérdida de capa protectora',
    url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    defaultDescription: 'Verja exterior y pilares con óxido visible tras el invierno, requiere saneamiento y pintura anticorrosiva.',
    areaM2: 15
  }
];

export const COATING_PRODUCTS: Record<string, CoatingProduct> = {
  primer_hidro: {
    id: 'prod-p1',
    name: 'ColorLink HydroBlock Pro Primer',
    category: 'Imprimación & Sellador',
    brand: 'ColorLink TechLine',
    type: 'Sellador acrílico fijador al siloxano',
    base: 'Acuosa hidrófuga',
    yieldM2PerLiter: 10,
    recommendedCoats: 1,
    dryingTimeHours: 3,
    durabilityYears: 10,
    features: ['Bloquea eflorescencias', 'Penetra 3mm en sustrato', 'Transpirable al vapor'],
    pricePerLiterEst: 14.5
  },
  latex_antihumedad: {
    id: 'prod-c1',
    name: 'ColorLink ShieldUltra Anti-Moho',
    category: 'Pintura de Acabado Premium',
    brand: 'ColorLink TechLine',
    type: 'Pintura vinil-veova con iones de plata fungicidas',
    base: 'Acuosa de bajo VOC',
    yieldM2PerLiter: 8,
    recommendedCoats: 2,
    dryingTimeHours: 4,
    durabilityYears: 8,
    features: ['Lavabilidad Clase 1 (norma EN 13300)', '99.9% resistente a hongos', 'Cero olor residual'],
    pricePerLiterEst: 18.0
  },
  primer_epoxi: {
    id: 'prod-p2',
    name: 'ColorLink EpoxyGrip 2K Primer',
    category: 'Imprimación Industrial',
    brand: 'ColorLink Industrial',
    type: 'Imprimación epoxídica bicomponente penetrante',
    base: 'Epoxi 100% sólidos',
    yieldM2PerLiter: 6,
    recommendedCoats: 1,
    dryingTimeHours: 8,
    durabilityYears: 15,
    features: ['Anclaje mecánico sobre hormigón', 'Resistente a aceites y sales', 'Cero retracción'],
    pricePerLiterEst: 26.0
  },
  epoxi_autonivelante: {
    id: 'prod-c2',
    name: 'ColorLink HardFloor Epoxi 2K',
    category: 'Revestimiento de Alto Rendimiento',
    brand: 'ColorLink Industrial',
    type: 'Resina epóxica autonivelante de alto tráfico',
    base: 'Epoxi bicomponente poliamida',
    yieldM2PerLiter: 4,
    recommendedCoats: 2,
    dryingTimeHours: 12,
    durabilityYears: 12,
    features: ['Soporta paso de carretillas', 'Acabado espejo antipolvo', 'Resistencia química grado ISO'],
    pricePerLiterEst: 34.0
  },
  esmalte_poliuretano: {
    id: 'prod-c3',
    name: 'ColorLink AcrylPure CleanAir',
    category: 'Esmalte al Agua Monocapa',
    brand: 'ColorLink Architectural',
    type: 'Esmalte acrílico-poliuretano al agua',
    base: 'Acuosa ecológica A+',
    yieldM2PerLiter: 11,
    recommendedCoats: 2,
    dryingTimeHours: 2,
    durabilityYears: 9,
    features: ['Secado express al tacto 45 min', 'Ultra lavable sin brillos', 'Sin solventes'],
    pricePerLiterEst: 19.5
  },
  antiox_directo: {
    id: 'prod-c4',
    name: 'ColorLink FerroGuard Direct-to-Rust',
    category: 'Protección Metálica',
    brand: 'ColorLink HeavyDuty',
    type: 'Esmalte anticorrosivo poliuretano con inhibidores activos',
    base: 'Solvente sintético bajo olor',
    yieldM2PerLiter: 9,
    recommendedCoats: 2,
    dryingTimeHours: 5,
    durabilityYears: 10,
    features: ['Aplicación directa sobre óxido firme', 'Barrera antihumedad UV', 'Garantía 10 años'],
    pricePerLiterEst: 22.0
  }
};

export const COLOR_PALETTES = [
  { name: 'Blanco Lino Nórdico', hex: '#F4F4F0', group: 'Neutros Claros', code: 'CL-01' },
  { name: 'Gris Caliza Cálido', hex: '#E5E4DE', group: 'Neutros Claros', code: 'CL-02' },
  { name: 'Gris Pizarra Mate', hex: '#64748B', group: 'Urban & Office', code: 'CL-03' },
  { name: 'Azul Cobalto Profundo', hex: '#1E293B', group: 'Acentos Premium', code: 'CL-04' },
  { name: 'Verde Salvia Botánico', hex: '#94A3B8', group: 'Tendencia Orgánica', code: 'CL-05' },
  { name: 'Gris Industrial RAL 7035', hex: '#CBD5E1', group: 'Industrial', code: 'CL-06' },
  { name: 'Terracota Suave', hex: '#C27B66', group: 'Acentos Premium', code: 'CL-07' }
];

export const INITIAL_REQUESTS: ProjectRequest[] = [
  {
    id: 'req-001',
    code: 'CLK-8492',
    createdAt: 'Hace 14 minutos',
    client: {
      name: 'Sofía Valenzuela',
      email: 'sofia.valenzuela@gmail.com',
      phone: '+34 612 849 201',
      city: 'Madrid, Chamartín'
    },
    input: {
      spaceType: 'hogar',
      specificArea: 'Salón / Comedor',
      currentCondition: 'humedad',
      estimatedM2: 28,
      trafficLevel: 'medio',
      urgency: 'alta',
      description: 'Pared principal con zócalo desconchado tras filtración de agua del piso superior. Deseamos acabado mate lavable.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      imageFileName: 'muro_salon_humedad.jpg',
      preferredFinish: 'mate',
      clientName: 'Sofía Valenzuela',
      clientEmail: 'sofia.valenzuela@gmail.com',
      clientPhone: '+34 612 849 201',
      clientCity: 'Madrid'
    },
    aiAnalysis: {
      detectedSurface: 'Yeso laminar y mortero con humedad residual',
      primaryProblem: 'Humedad por capilaridad con descascarillado activo y sales',
      secondaryObservations: [
        'Humedad relativa en sustrato estimada en 18.5%',
        'Pérdida de adherencia en el 35% del área inferior',
        'Sustrato superior estable apto para repintado directo'
      ],
      complexityLevel: 'Media',
      overallConfidence: 98.4,
      environmentalSuitability: 'Interior residencial con ventilación moderada',
      moistureIndex: 42,
      adhesionScore: 58,
      processingTimeMs: 1420,
      detectionAreas: [
        {
          id: 'det-1',
          label: 'Eflorescencia salina & descascarillado',
          confidence: 99.1,
          x: 18,
          y: 52,
          width: 64,
          height: 38,
          severity: 'alta',
          description: 'Desprendimiento de película por presión hidrostática.'
        },
        {
          id: 'det-2',
          label: 'Zona seca con microfisuras leves',
          confidence: 96.8,
          x: 25,
          y: 12,
          width: 50,
          height: 32,
          severity: 'baja',
          description: 'Apta para imprimación directa sin raspado severo.'
        }
      ]
    },
    recommendation: {
      recommendedSystem: 'Sistema ColorLink AntiHumedad Triple Acción',
      systemSummary: 'Fijación profunda con siloxano hidrófugo + Revestimiento transpirable con conservante anti-moho.',
      primerProduct: COATING_PRODUCTS.primer_hidro,
      mainCoatingProduct: COATING_PRODUCTS.latex_antihumedad,
      preparationSteps: [
        '1. Raspado mecánico con espátula de la pintura suelta hasta llegar a base firme.',
        '2. Limpieza con solución fungicida neutra y secado controlado de 48h.',
        '3. Aplicación de 1 mano de Sellador HydroBlock Pro a rodillo de pelo corto.',
        '4. Aplicación de 2 manos de acabado ShieldUltra Anti-Moho (intervalo de 4h).'
      ],
      calculatedLiters: 7,
      calculatedPrimerLiters: 3,
      estimatedLaborDays: 2,
      estimatedCostRange: {
        min: 340,
        max: 460,
        currency: 'EUR'
      },
      technicalAdvice: 'Verificar que la fuga superior esté 100% subsanada antes de sellar para garantizar la garantía de 8 años.',
      warrantyPeriod: '8 años de garantía técnica',
      selectedColorHex: '#F4F4F0',
      selectedColorName: 'Blanco Lino Nórdico'
    },
    status: 'en_analisis',
    assignedTechnician: 'Carlos M. (Inspector Certificado)',
    technicianNotes: 'Imágenes analizadas por IA correctas. Se recomienda enviar muestra de tono CL-01.',
    lastUpdated: '14 min'
  },
  {
    id: 'req-002',
    code: 'CLK-8488',
    createdAt: 'Hace 1 hora',
    client: {
      name: 'Marcos Benítez - AutoTech S.L.',
      email: 'm.benitez@autotech-servicios.es',
      phone: '+34 670 112 339',
      city: 'Barcelona, Polígono Zona Franca'
    },
    input: {
      spaceType: 'industria',
      specificArea: 'Suelo de nave / Epoxi industrial',
      currentCondition: 'oxido',
      estimatedM2: 120,
      trafficLevel: 'extremo',
      urgency: 'inmediata',
      description: 'Suelo de concreto con tráfico continuo de transpaletas y manchas de fluidos hidráulicos. Requiere homologación antideslizante.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      imageFileName: 'suelo_taller_autotech.jpg',
      preferredFinish: 'satinado',
      clientName: 'Marcos Benítez',
      clientEmail: 'm.benitez@autotech-servicios.es',
      clientPhone: '+34 670 112 339',
      clientCity: 'Barcelona'
    },
    aiAnalysis: {
      detectedSurface: 'Hormigón industrial fratasado con hidrocarburos',
      primaryProblem: 'Pérdida de capa de rodadura y saturación por aceites',
      secondaryObservations: [
        'Porosidad irregular con restos de sellador degradado',
        'Contaminación por aceites en el 22% del pavimento',
        'Resistencia a compresión estimada > 25 MPa'
      ],
      complexityLevel: 'Especializada',
      overallConfidence: 99.2,
      environmentalSuitability: 'Ambiente industrial pesado interior',
      moistureIndex: 12,
      adhesionScore: 84,
      processingTimeMs: 1680,
      detectionAreas: [
        {
          id: 'det-1',
          label: 'Zona de manchas de aceite penetradas',
          confidence: 99.4,
          x: 10,
          y: 40,
          width: 80,
          height: 45,
          severity: 'critica',
          description: 'Requiere desengrasado con tensoactivos antes de granallado.'
        }
      ]
    },
    recommendation: {
      recommendedSystem: 'Sistema ColorLink Industrial HardFloor 2K Heavy',
      systemSummary: 'Desbaste con diamante + Imprimación Epoxi 100% sólidos + Revestimiento autonivelante 2K grado químico.',
      primerProduct: COATING_PRODUCTS.primer_epoxi,
      mainCoatingProduct: COATING_PRODUCTS.epoxi_autonivelante,
      preparationSteps: [
        '1. Desengrasado biológico con limpiador alcalino ColorLink Degrease.',
        '2. Fresado/Diamantado mecánico para apertura de poro CSP-3.',
        '3. Aspirado industrial de alta eficiencia (HEPA).',
        '4. Imprimación EpoxyGrip 2K a llana con espolvoreo de sílice antideslizante.',
        '5. Capa de sellado HardFloor Epoxi 2K color Gris RAL 7035.'
      ],
      calculatedLiters: 60,
      calculatedPrimerLiters: 20,
      estimatedLaborDays: 3,
      estimatedCostRange: {
        min: 2850,
        max: 3600,
        currency: 'EUR'
      },
      technicalAdvice: 'Planificar parada técnica en fin de semana para cumplir 48h de curado antes del tránsito de carretillas.',
      warrantyPeriod: '12 años de garantía industrial',
      selectedColorHex: '#CBD5E1',
      selectedColorName: 'Gris Industrial RAL 7035'
    },
    status: 'validada',
    assignedTechnician: 'Lucía Torres (Ingeniería de Recubrimientos)',
    technicianNotes: 'Propuesta validada. Se adjunta ficha técnica al cliente con protocolo de desengrasado previo.',
    quotedAmount: 3240,
    lastUpdated: '1 hora'
  },
  {
    id: 'req-003',
    code: 'CLK-8472',
    createdAt: 'Hace 3 horas',
    client: {
      name: 'Elena Gómez - Nexo Coworking',
      email: 'elena@nexocowork.com',
      phone: '+34 688 990 123',
      city: 'Valencia, Ruzafa'
    },
    input: {
      spaceType: 'oficina',
      specificArea: 'Open Space / Coworking',
      currentCondition: 'bueno',
      estimatedM2: 75,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: 'Renovación estética completa de paredes principales. Queremos pintura de rápido secado sin olor para no interrumpir a los coworkers.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      imageFileName: 'espacio_nexo_cowork.jpg',
      preferredFinish: 'satinado',
      clientName: 'Elena Gómez',
      clientEmail: 'elena@nexocowork.com',
      clientPhone: '+34 688 990 123',
      clientCity: 'Valencia'
    },
    aiAnalysis: {
      detectedSurface: 'Placa de yeso laminado pintada previamente',
      primaryProblem: 'Desgaste estético superficial por rozaduras',
      secondaryObservations: [
        'Superficie perfectamente nivelada sin patologías de humedad',
        'Pintura base anterior con óptima adherencia',
        'Requiere nula emisión VOC por actividad en curso'
      ],
      complexityLevel: 'Baja',
      overallConfidence: 99.6,
      environmentalSuitability: 'Espacio de trabajo continuo climatizado',
      moistureIndex: 8,
      adhesionScore: 96,
      processingTimeMs: 1150,
      detectionAreas: [
        {
          id: 'det-1',
          label: 'Superficie homogénea apta para repintado',
          confidence: 99.7,
          x: 20,
          y: 15,
          width: 60,
          height: 70,
          severity: 'baja',
          description: 'Sin necesidad de imprimación total, solo lijado suave.'
        }
      ]
    },
    recommendation: {
      recommendedSystem: 'Sistema ColorLink EcoClean Air Express',
      systemSummary: 'Esmalte acrílico poliuretánico al agua A+, secado ultra-rápido en 45 min y cero emisión de vapores.',
      primerProduct: COATING_PRODUCTS.primer_hidro,
      mainCoatingProduct: COATING_PRODUCTS.esmalte_poliuretano,
      preparationSteps: [
        '1. Limpieza suave con paño húmedo antiestático.',
        '2. Masillado puntual de orificios de cuadros.',
        '3. Lijado superficial grano 180.',
        '4. Dos capas cruzadas de AcrylPure CleanAir con rodillo de microfibra.'
      ],
      calculatedLiters: 14,
      calculatedPrimerLiters: 0,
      estimatedLaborDays: 1,
      estimatedCostRange: {
        min: 680,
        max: 890,
        currency: 'EUR'
      },
      technicalAdvice: 'Se puede pintar en horario vespertino y reabrir el coworking a la mañana siguiente sin molestias olfativas.',
      warrantyPeriod: '9 años de garantía estética',
      selectedColorHex: '#E5E4DE',
      selectedColorName: 'Gris Caliza Cálido'
    },
    status: 'finalizada',
    assignedTechnician: 'Carlos M.',
    technicianNotes: 'Trabajo ejecutado con éxito el 12/08. Cliente 100% satisfecho con la ausencia de olor.',
    quotedAmount: 780,
    lastUpdated: 'Ayer'
  }
];
