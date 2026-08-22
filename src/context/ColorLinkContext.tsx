import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode
} from 'react';
import {
  ClientUser,
  ClientProjectInput,
  AiTechnicalAnalysis,
  TechnicalRecommendation,
  CartItem,
  DeliveryDetails,
  ProjectOrder,
  ProjectRequest,
  RequestStatus,
  SampleImageOption
} from '../types';
import { INITIAL_REQUESTS, SAMPLE_IMAGES, SPACE_OPTIONS, COATING_PRODUCTS } from '../data/mockData';
import { runAiSurfaceDiagnostics } from '../utils/aiDiagnostics';
import {
  getSmartProjectProductsAndComparison,
  RetailProductItem,
  SmartProjectCalculation,
  ProjectSystemComparison
} from '../data/retailProducts';

// PRE-REGISTERED DEMO CLIENTS (MOCK DATABASE DE USUARIOS)
export const PRELOADED_USERS: ClientUser[] = [
  {
    id: 'usr-laura',
    name: 'Laura María Restrepo',
    email: 'laura.restrepo@pintuco-usuario.co',
    phone: '+57 312 847 2910',
    city: 'Bogotá D.C.',
    clientType: 'particular',
    documentType: 'CC',
    documentNumber: '1.020.485.912',
    registeredDate: '2026-08-10',
    activeProjectsCount: 2,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedAddresses: [
      {
        id: 'addr-laura-1',
        label: 'Residencia Principal',
        city: 'Bogotá D.C.',
        locality: 'Chapinero',
        neighborhood: 'Chicó Norte',
        address: 'Carrera 15 # 93-40',
        complement: 'Apto 402, Torre B',
        notes: 'Edificio Torre Andina, citófono 402',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-maria',
    name: 'María Fernanda Gómez',
    email: 'maria.gomez@gmail.com',
    phone: '+57 312 456 7890',
    city: 'Bogotá D.C.',
    clientType: 'particular',
    documentType: 'CC',
    documentNumber: '52.894.120',
    registeredDate: '2026-08-01',
    activeProjectsCount: 1,
    savedAddresses: [
      {
        id: 'addr-maria-1',
        label: 'Casa Salitre',
        city: 'Bogotá D.C.',
        locality: 'Fontibón',
        neighborhood: 'Ciudad Salitre',
        address: 'Calle 24B # 68-15',
        complement: 'Casa 12',
        notes: 'Conjunto Residencial Los Sauces',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-andres',
    name: 'Andrés Echeverry',
    email: 'operaciones@innovacion-retail.co',
    phone: '+57 300 890 1234',
    city: 'Medellín',
    clientType: 'empresa',
    documentType: 'NIT',
    documentNumber: '900.876.543-1',
    companyName: 'Innovación Retail S.A.S.',
    companyNit: '900.876.543-1',
    responsibleName: 'Andrés Echeverry',
    registeredDate: '2026-07-15',
    activeProjectsCount: 1,
    savedAddresses: [
      {
        id: 'addr-andres-1',
        label: 'Local Comercial El Poblado',
        city: 'Medellín',
        locality: 'El Poblado',
        neighborhood: 'El Poblado',
        address: 'Carrera 43A # 7-50',
        complement: 'Local 102',
        notes: 'Horario comercial 8:00 AM a 6:00 PM',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-roberto',
    name: 'Dr. Roberto Mendoza',
    email: 'direccion@clinica-odontologica-valle.com',
    phone: '+57 315 776 2211',
    city: 'Cali',
    clientType: 'empresa',
    documentType: 'NIT',
    documentNumber: '901.332.110-4',
    companyName: 'Clínica Dental & Estética Valle',
    companyNit: '901.332.110-4',
    responsibleName: 'Dr. Roberto Mendoza',
    registeredDate: '2026-07-28',
    activeProjectsCount: 1,
    savedAddresses: [
      {
        id: 'addr-roberto-1',
        label: 'Sede Clínica Principal',
        city: 'Cali',
        locality: 'Comuna 2 (Norte / Granada / Chipichape)',
        neighborhood: 'Granada',
        address: 'Avenida 6N # 35N-12',
        complement: 'Piso 2, Consultorio 201',
        notes: 'Recepción clínica 24 horas',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-felipe',
    name: 'Felipe Salamanca',
    email: 'felipe.salamanca@outlook.com',
    phone: '+57 320 994 3322',
    city: 'Barranquilla',
    clientType: 'particular',
    documentType: 'CC',
    documentNumber: '1.140.825.901',
    registeredDate: '2026-08-05',
    activeProjectsCount: 1,
    savedAddresses: [
      {
        id: 'addr-felipe-1',
        label: 'Apartamento Prado',
        city: 'Barranquilla',
        locality: 'Riomar (Alto Prado / Buenavista)',
        neighborhood: 'Alto Prado',
        address: 'Calle 84 # 51B-22',
        complement: 'Apto 801',
        notes: 'Portería principal',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-camila',
    name: 'Camila Morales',
    email: 'camila.morales@gmail.com',
    phone: '+57 311 200 4455',
    city: 'Bucaramanga',
    clientType: 'particular',
    documentType: 'CC',
    documentNumber: '1.098.765.432',
    registeredDate: '2026-08-02',
    activeProjectsCount: 1,
    savedAddresses: [
      {
        id: 'addr-camila-1',
        label: 'Casa Cabecera',
        city: 'Bucaramanga',
        locality: 'Cabecera del Llano',
        neighborhood: 'Cabecera del Llano',
        address: 'Carrera 33 # 48-15',
        complement: 'Interior 3',
        notes: 'Timbre 3',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-carlos',
    name: 'Carlos Eduardo Mendoza',
    email: 'carlos.mendoza@pintuco-usuario.co',
    phone: '+57 314 982 3410',
    city: 'Medellín',
    clientType: 'particular',
    documentType: 'CC',
    documentNumber: '1.032.458.129',
    registeredDate: '2026-08-12',
    activeProjectsCount: 0,
    savedAddresses: [
      {
        id: 'addr-carlos-1',
        label: 'Casa Laureles',
        city: 'Medellín',
        locality: 'Laureles - Estadio',
        neighborhood: 'Laureles',
        address: 'Circular 4 # 71-20',
        complement: 'Casa 2',
        notes: 'Frente al parque',
        isDefault: true
      }
    ]
  },
  {
    id: 'usr-marcela',
    name: 'Marcela Gómez Quintero',
    email: 'marcela.gomez@disenoacabados.com',
    phone: '+57 320 654 8921',
    city: 'Cali',
    clientType: 'empresa',
    documentType: 'NIT',
    documentNumber: '900.845.120-4',
    companyName: 'Diseño & Acabados del Valle S.A.S.',
    companyNit: '900.845.120-4',
    responsibleName: 'Marcela Gómez Quintero',
    registeredDate: '2026-08-08',
    activeProjectsCount: 0,
    savedAddresses: [
      {
        id: 'addr-marcela-1',
        label: 'Taller & Showroom',
        city: 'Cali',
        locality: 'Comuna 19 (San Fernando / Tequendama)',
        neighborhood: 'San Fernando',
        address: 'Calle 10 # 32-15',
        complement: 'Bodega 4',
        notes: 'Entrada por portón metálico',
        isDefault: true
      }
    ]
  }
];

// INITIAL REQUESTS WITH PROPER CLIENT ID LINKS
const ENRICHED_INITIAL_REQUESTS: ProjectRequest[] = [
  // Laura's default projects
  {
    id: 'CLK-8510',
    code: 'CLK-8510',
    clientId: 'usr-laura',
    cliente_id: 'usr-laura',
    createdAt: '2026-08-18T14:30:00.000Z',
    clientType: 'particular',
    client: {
      name: 'Laura María Restrepo',
      email: 'laura.restrepo@pintuco-usuario.co',
      phone: '+57 312 847 2910',
      city: 'Bogotá D.C.'
    },
    input: {
      clientId: 'usr-laura',
      cliente_id: 'usr-laura',
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'Laura María Restrepo',
      clientEmail: 'laura.restrepo@pintuco-usuario.co',
      clientPhone: '+57 312 847 2910',
      clientCity: 'Bogotá D.C.',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Sala / Comedor',
      specificArea: 'Zona social con muro de acento',
      surfaceType: 'concreto',
      currentConditionEnum: 'humedad',
      currentCondition: 'humedad',
      estimatedM2: 28,
      spacesCount: 1,
      estimatedBudget: 350000,
      requiredProjectDate: '2026-08-25',
      createdAt: '2026-08-18T14:30:00.000Z',
      hasMoisture: true,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      trafficLevel: 'medio',
      urgency: 'alta',
      description: 'Muro de sala con problemas leves de humedad inferior y deseo de acabado lino andino satinado.',
      imageUrl: SAMPLE_IMAGES[0].url,
      afterImageUrl: SAMPLE_IMAGES[0].afterUrl,
      imageFileName: 'muro_sala_humedad_bogota.jpg',
      evidences: [],
      selectedStyle: 'lino-andino',
      selectedColorName: 'Lino Andino',
      selectedColorCode: 'PT-104',
      selectedColorHex: '#EAE5D9'
    },
    aiAnalysis: {
      detectedSurface: 'Pañete tradicional con estuco y eflorescencia higroscópica',
      primaryProblem: 'Humedad por capilaridad en muro inferior con desprendimiento de película',
      secondaryObservations: [
        'Presión de vapor ascendente detectada en los primeros 60 cm del muro.',
        'Sustrato superior en buen estado, apto para recubrimiento vinil-acrílico.'
      ],
      environmentalFactors: ['Clima Bogotá (Humedad relativa 75%)'],
      ambientContext: 'Interior residencial con luz natural matutina',
      complexityLevel: 'Media',
      overallConfidence: 98.6,
      environmentalSuitability: 'Apto para sistema Sellomax + Viniltex Biocuidado',
      moistureIndex: 42,
      adhesionScore: 68,
      detectionAreas: [],
      processingTimeMs: 380,
      conversationalSummary: 'Superficie interior con señales de humedad en zócalo. Curar con Sellomax antes de pintar con Viniltex Biocuidado.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Pintuco Anti-Humedad & Viniltex Biocuidado',
      pintucoFamilyName: 'Sellomax Barrera + Viniltex Biocuidado Cero Olor',
      systemSummary: 'Tratamiento curativo de humedad por capilaridad + Capa de acabado lavable con iones de plata.',
      solutionType: 'Protección Integral Anti-Humedad & Bienestar',
      primerProduct: COATING_PRODUCTS.sellomax_barrera,
      mainCoatingProduct: COATING_PRODUCTS.viniltex_banos_cocinas,
      preparationSteps: [
        '1. Raspar la pintura suelta en el zócalo.',
        '2. Aplicar 1 mano de Sellomax Barrera.',
        '3. Aplicar 2 manos de Viniltex Biocuidado.'
      ],
      calculatedLiters: 6.0,
      calculatedGallons: 1.6,
      calculatedBuckets: 0,
      calculatedPrimerLiters: 2.8,
      estimatedLaborDays: 2,
      complexityLevel: 'Moderado',
      estimatedCostRange: { min: 254800, max: 320000, currency: 'COP ($)' },
      technicalAdvice: 'Ventilar el salón durante la aplicación para acelerar el curado.',
      warrantyPeriod: '8 años de protección certificada Pintuco',
      suggestedFinish: 'Satinado',
      suggestedStyle: 'Lino Andino',
      selectedColorHex: '#EAE5D9',
      selectedColorName: 'Lino Andino',
      selectedColorCode: 'PT-104',
      nextSteps: []
    },
    status: 'recomendacion_generada',
    assignedTechnician: 'Ing. Carlos Mendoza (IA Pintuco)',
    technicianNotes: 'Diagnóstico IA validado. Recomendación lista para compra o agendamiento.',
    quotedAmount: 254800,
    cartItems: [
      {
        id: 'ptc-vbiocuidado-gal',
        productId: 'ptc-vbiocuidado-gal',
        name: 'Viniltex® Biocuidado Cero Olor Antibacterial',
        category: 'Pinturas de Interiores',
        brand: 'Pintuco',
        pintucoLine: 'Línea Hogar & Decoración',
        imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
        presentation: 'Galón (3.785 L)',
        unitPriceCOP: 98900,
        quantity: 2,
        coverageM2: '35 - 40 m² a 2 manos por galón',
        finish: 'Satinado',
        colorName: 'Lino Andino',
        colorHex: '#EAE5D9',
        colorCode: 'PT-104',
        isAiRecommended: true
      },
      {
        id: 'ptc-sellomax-gal',
        productId: 'ptc-sellomax-gal',
        name: 'Sellomax® Barrera Anti-Humedad Fuerte',
        category: 'Impermeabilizantes',
        brand: 'Pintuco',
        pintucoLine: 'Línea de Preparación',
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
        presentation: 'Galón (3.785 L)',
        unitPriceCOP: 57000,
        quantity: 1,
        coverageM2: '18 - 22 m² por galón',
        finish: 'Mate Blanco',
        isAiRecommended: true
      }
    ]
  },
  {
    id: 'CLK-8511',
    code: 'CLK-8511',
    clientId: 'usr-laura',
    cliente_id: 'usr-laura',
    createdAt: '2026-08-12T11:00:00.000Z',
    clientType: 'particular',
    client: {
      name: 'Laura María Restrepo',
      email: 'laura.restrepo@pintuco-usuario.co',
      phone: '+57 312 847 2910',
      city: 'Bogotá D.C.'
    },
    input: {
      clientId: 'usr-laura',
      cliente_id: 'usr-laura',
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: 'Laura María Restrepo',
      clientEmail: 'laura.restrepo@pintuco-usuario.co',
      clientPhone: '+57 312 847 2910',
      clientCity: 'Bogotá D.C.',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Habitación Principal',
      specificArea: 'Muros de cabecero y laterales',
      surfaceType: 'drywall',
      currentConditionEnum: 'nuevo',
      currentCondition: 'bueno',
      estimatedM2: 20,
      spacesCount: 1,
      estimatedBudget: 200000,
      requiredProjectDate: '2026-08-20',
      createdAt: '2026-08-12T11:00:00.000Z',
      hasMoisture: false,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      trafficLevel: 'bajo',
      urgency: 'normal',
      description: 'Renovación estética de dormitorio principal con acabado suave y lavable.',
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      imageFileName: 'habitacion_laura.jpg',
      evidences: [],
      selectedStyle: 'calido-luminoso',
      selectedColorName: 'Blanco Seda',
      selectedColorCode: 'VIN-101',
      selectedColorHex: '#F8F6F0'
    },
    aiAnalysis: {
      detectedSurface: 'Drywall en excelente estado con pintura previa intacta',
      primaryProblem: 'Renovación de color y luminosidad',
      secondaryObservations: ['Superficie libre de humedad y polvo.'],
      environmentalFactors: ['Interior protegido'],
      ambientContext: 'Dormitorio principal',
      complexityLevel: 'Baja (DIY)',
      overallConfidence: 99.5,
      environmentalSuitability: 'Óptimo para Viniltex Avanzada',
      moistureIndex: 10,
      adhesionScore: 92,
      detectionAreas: [],
      processingTimeMs: 250,
      conversationalSummary: 'Superficie lista para aplicación directa a 2 manos de Viniltex Avanzada.'
    },
    recommendation: {
      recommendedSystem: 'Sistema Viniltex Avanzada Superlavable',
      pintucoFamilyName: 'Viniltex Avanzada Máximo Cubrimiento',
      systemSummary: 'Pintura vinílica premium tipo 1 con alta resistencia al frote y lavabilidad superior.',
      solutionType: 'Renovación Estética & Confort',
      primerProduct: COATING_PRODUCTS.sellomax_barrera,
      mainCoatingProduct: COATING_PRODUCTS.viniltex_avanzada,
      preparationSteps: ['1. Limpieza de polvo.', '2. 2 manos de Viniltex Avanzada.'],
      calculatedLiters: 4.0,
      calculatedGallons: 1.0,
      calculatedBuckets: 0,
      calculatedPrimerLiters: 0,
      estimatedLaborDays: 1,
      complexityLevel: 'Fácil (DIY)',
      estimatedCostRange: { min: 89900, max: 120000, currency: 'COP ($)' },
      technicalAdvice: 'Secado entre manos: 2 horas.',
      warrantyPeriod: '10 años certificada',
      suggestedFinish: 'Satinado',
      suggestedStyle: 'Cálido Luminoso',
      selectedColorHex: '#F8F6F0',
      selectedColorName: 'Blanco Seda',
      selectedColorCode: 'VIN-101',
      nextSteps: []
    },
    status: 'gestion_comercial',
    assignedTechnician: 'Ing. Carlos Mendoza (IA Pintuco)',
    technicianNotes: 'Despacho acordado vía Pintacasa Calle 127.',
    quotedAmount: 98900
  },
  // Map existing initial requests to their corresponding clientIds
  ...INITIAL_REQUESTS.map((req) => {
    let clientId = 'usr-maria';
    if (req.id === 'CLK-8501' || req.client?.email === 'maria.gomez@gmail.com') {
      clientId = 'usr-maria';
    } else if (req.id === 'CLK-8502' || req.client?.email === 'operaciones@innovacion-retail.co') {
      clientId = 'usr-andres';
    } else if (req.id === 'CLK-8503' || req.client?.email === 'direccion@clinica-odontologica-valle.com') {
      clientId = 'usr-roberto';
    } else if (req.id === 'CLK-8504' || req.client?.email === 'felipe.salamanca@outlook.com') {
      clientId = 'usr-felipe';
    } else if (req.id === 'CLK-8505' || req.client?.email === 'camila.morales@gmail.com') {
      clientId = 'usr-camila';
    }
    return {
      ...req,
      clientId,
      cliente_id: clientId,
      input: {
        ...req.input,
        clientId,
        cliente_id: clientId
      }
    };
  })
];

const STORAGE_KEY = 'colorlink_single_source_state_v2';

interface ColorLinkContextType {
  // Authentication & Users
  currentUser: ClientUser | null;
  allUsers: ClientUser[];
  loginUser: (user: ClientUser, rememberMe?: boolean) => void;
  loginByEmail: (email: string) => boolean;
  registerUser: (user: ClientUser) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<ClientUser>) => void;

  // Active Project (Single Source of Truth for Wizard)
  activeProjectInput: ClientProjectInput;
  aiAnalysis: AiTechnicalAnalysis;
  recommendation: TechnicalRecommendation;
  selectedTier: 'ia_recomendado' | 'costo_beneficio' | 'premium';
  smartProductCalculation: SmartProjectCalculation;
  systemComparison: ProjectSystemComparison;
  recommendedProducts: RetailProductItem[];
  
  // Cart & Pricing (Derived strictly from single data source)
  cartItems: CartItem[];
  cartFinancials: {
    subtotalCOP: number;
    isFreeShipping: boolean;
    shippingCOP: number;
    discountCOP: number;
    totalCOP: number;
    totalItemsCount: number;
  };
  deliveryDetails: DeliveryDetails | null;
  activeOrder: ProjectOrder | null;

  // Operations
  updateActiveProjectInput: (updates: Partial<ClientProjectInput>) => void;
  selectSampleImage: (sample: SampleImageOption) => void;
  setSelectedTier: (tier: 'ia_recomendado' | 'costo_beneficio' | 'premium') => void;
  addToCart: (product: RetailProductItem) => void;
  updateCartItemQuantity: (itemId: string, delta: number) => void;
  setCartItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  resetCartToTier: (tier?: 'ia_recomendado' | 'costo_beneficio' | 'premium') => void;
  setDeliveryDetails: (details: DeliveryDetails | null) => void;
  confirmOrder: (order: ProjectOrder) => void;
  createRequestFromActiveProject: (orderData?: ProjectOrder, cartData?: CartItem[]) => ProjectRequest;
  updateRequestStatus: (
    id: string,
    newStatus: RequestStatus,
    technicianNotes?: string,
    quotedAmount?: number
  ) => void;
  resetActiveProject: () => void;
  loadRequestIntoActiveProject: (req: ProjectRequest) => void;

  // Queries (Data Isolation)
  allRequests: ProjectRequest[];
  userRequests: ProjectRequest[];
  allOrders: ProjectOrder[];
  userOrders: ProjectOrder[];

  // Feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const ColorLinkContext = createContext<ColorLinkContextType | undefined>(undefined);

export const ColorLinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage if available
  const [users, setUsers] = useState<ClientUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading saved users from localStorage', e);
    }
    return PRELOADED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<ClientUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_currentUser');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading currentUser from localStorage', e);
    }
    return null; // Default to Guest mode (Sin sesión iniciada)
  });

  const [requests, setRequests] = useState<ProjectRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_requests');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading requests from localStorage', e);
    }
    return ENRICHED_INITIAL_REQUESTS;
  });

  const [orders, setOrders] = useState<ProjectOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading orders from localStorage', e);
    }
    return [];
  });

  // Selected Tier
  const [selectedTier, setSelectedTierState] = useState<'ia_recomendado' | 'costo_beneficio' | 'premium'>(
    'ia_recomendado'
  );

  // Default initial project input (supports guest testing immediately)
  const defaultSample = SAMPLE_IMAGES[0];
  const [activeProjectInput, setActiveProjectInput] = useState<ClientProjectInput>(() => {
    return {
      clientId: undefined,
      cliente_id: undefined,
      transformationTarget: 'hogar',
      clientType: 'particular',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientCity: 'Bogotá D.C.',
      spaceType: 'hogar',
      specificSpaceSubtype: 'Sala / Comedor',
      specificArea: 'Zona social con muro de acento',
      currentCondition: 'humedad',
      currentConditionEnum: 'humedad',
      surfaceType: 'concreto',
      estimatedM2: 28,
      spacesCount: 1,
      trafficLevel: 'medio',
      urgency: 'alta',
      description: defaultSample.defaultDescription,
      imageUrl: defaultSample.url,
      imageUrls: [defaultSample.url],
      imageFileName: 'muro_sala_humedad_bogota.jpg',
      preferredFinish: 'satinado',
      selectedStyle: 'lino-andino',
      selectedColorName: 'Lino Andino',
      selectedColorCode: 'PT-104',
      selectedColorHex: '#EAE5D9',
      hasMoisture: true,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      requiredProjectDate: '2026-08-25',
      createdAt: new Date().toISOString(),
      evidences: []
    };
  });

  // Active Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryDetails, setDeliveryDetailsState] = useState<DeliveryDetails | null>(null);
  const [activeOrder, setActiveOrder] = useState<ProjectOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync users to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_users', JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to persist users to localStorage', e);
    }
  }, [users]);

  // Sync currentUser to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY + '_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY + '_currentUser');
      }
    } catch (e) {
      console.warn('Failed to persist currentUser to localStorage', e);
    }
  }, [currentUser]);

  // Sync requests to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_requests', JSON.stringify(requests));
    } catch (e) {
      console.warn('Failed to persist requests to localStorage', e);
    }
  }, [requests]);

  // Sync orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to persist orders to localStorage', e);
    }
  }, [orders]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // When currentUser changes, harmonize active project client metadata
  useEffect(() => {
    if (currentUser) {
      setActiveProjectInput((prev) => ({
        ...prev,
        clientId: currentUser.id,
        cliente_id: currentUser.id,
        clientName: currentUser.name,
        clientEmail: currentUser.email,
        clientPhone: currentUser.phone,
        clientCity: currentUser.city,
        clientType: currentUser.clientType,
        companyName: currentUser.companyName,
        companyNit: currentUser.companyNit
      }));
    }
  }, [currentUser]);

  // Live AI diagnostic & coating recommendation derived from active project input
  const { aiAnalysis, recommendation } = useMemo(() => {
    return runAiSurfaceDiagnostics(activeProjectInput);
  }, [activeProjectInput]);

  // Live Smart Product Calculation & System Comparison (Single Source of Truth)
  const smartData = useMemo(() => {
    return getSmartProjectProductsAndComparison(activeProjectInput, selectedTier);
  }, [activeProjectInput, selectedTier]);

  // Auto-initialize cart items from recommended products when project specifications change or cart is empty
  useEffect(() => {
    if (smartData.recommendedProducts && smartData.recommendedProducts.length > 0) {
      // Map recommended products directly into cart items
      const newItems: CartItem[] = smartData.recommendedProducts.map((p) => ({
        id: p.id,
        productId: p.id,
        name: p.name,
        category: p.category,
        brand: p.brand,
        pintucoLine: p.pintucoLine,
        imageUrl: p.imageUrl,
        presentation: p.presentation,
        unitPriceCOP: p.priceCOP,
        quantity: p.suggestedQuantity,
        coverageM2: p.coverageM2,
        finish: p.finish,
        colorName: p.colorName,
        colorHex: p.colorHex,
        colorCode: p.colorCode,
        isAiRecommended: p.tier === 'ia_recomendado',
        benefitKey: p.benefitKey
      }));
      setCartItems(newItems);
    }
  }, [activeProjectInput.surfaceType, activeProjectInput.currentCondition, activeProjectInput.estimatedM2, selectedTier]);

  // UNIFIED FINANCIAL CALCULATIONS (Single Formula Everywhere)
  const cartFinancials = useMemo(() => {
    const subtotalCOP = cartItems.reduce((sum, it) => sum + it.unitPriceCOP * it.quantity, 0);
    const isPickup = deliveryDetails?.tipo_entrega === 'recoger_tienda';
    const isFreeShipping = subtotalCOP >= 150000 || isPickup;
    const shippingCOP = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 12500;
    const discountCOP = 0;
    const totalCOP = subtotalCOP + shippingCOP - discountCOP;
    const totalItemsCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

    return {
      subtotalCOP,
      isFreeShipping,
      shippingCOP,
      discountCOP,
      totalCOP,
      totalItemsCount
    };
  }, [cartItems, deliveryDetails]);

  // CART OPERATIONS
  const addToCart = useCallback((product: RetailProductItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((it) => it.productId === product.id || it.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
      const newItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        pintucoLine: product.pintucoLine,
        imageUrl: product.imageUrl,
        presentation: product.presentation,
        unitPriceCOP: product.priceCOP,
        quantity: product.suggestedQuantity || 1,
        coverageM2: product.coverageM2,
        finish: product.finish,
        colorName: product.colorName,
        colorHex: product.colorHex,
        colorCode: product.colorCode,
        isAiRecommended: product.tier === 'ia_recomendado',
        benefitKey: product.benefitKey
      };
      return [...prev, newItem];
    });
    showToast(`"${product.name}" agregado al carrito.`);
  }, [showToast]);

  const updateCartItemQuantity = useCallback((itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === itemId || it.productId === itemId) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const setCartItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((it) => it.id !== itemId && it.productId !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((it) =>
          it.id === itemId || it.productId === itemId ? { ...it, quantity } : it
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId && it.productId !== itemId));
    showToast('Producto eliminado del carrito.');
  }, [showToast]);

  const resetCartToTier = useCallback((tier: 'ia_recomendado' | 'costo_beneficio' | 'premium' = selectedTier) => {
    const data = getSmartProjectProductsAndComparison(activeProjectInput, tier);
    const initialCart: CartItem[] = data.recommendedProducts.map((p) => ({
      id: p.id,
      productId: p.id,
      name: p.name,
      category: p.category,
      brand: p.brand,
      pintucoLine: p.pintucoLine,
      imageUrl: p.imageUrl,
      presentation: p.presentation,
      unitPriceCOP: p.priceCOP,
      quantity: p.suggestedQuantity,
      coverageM2: p.coverageM2,
      finish: p.finish,
      colorName: p.colorName,
      colorHex: p.colorHex,
      colorCode: p.colorCode,
      isAiRecommended: p.tier === 'ia_recomendado',
      benefitKey: p.benefitKey
    }));
    setCartItems(initialCart);
  }, [activeProjectInput, selectedTier]);

  const setSelectedTier = useCallback((tier: 'ia_recomendado' | 'costo_beneficio' | 'premium') => {
    setSelectedTierState(tier);
    resetCartToTier(tier);
  }, [resetCartToTier]);

  const updateActiveProjectInput = useCallback((updates: Partial<ClientProjectInput>) => {
    setActiveProjectInput((prev) => {
      const next = { ...prev, ...updates };
      if (updates.spaceType && updates.spaceType !== prev.spaceType) {
        const spaceConf = SPACE_OPTIONS.find((s) => s.id === updates.spaceType);
        if (spaceConf && spaceConf.subtypes.length > 0) {
          next.specificArea = spaceConf.subtypes[0];
        }
      }
      return next;
    });
  }, []);

  const selectSampleImage = useCallback((sample: SampleImageOption) => {
    setActiveProjectInput((prev) => ({
      ...prev,
      imageUrl: sample.url,
      imageUrls: [sample.url],
      imageFileName: `${sample.category}_${sample.id}.jpg`,
      spaceType: sample.category,
      estimatedM2: sample.areaM2,
      description: sample.defaultDescription
    }));
    showToast(`Espacio "${sample.title}" cargado para análisis IA Pintuco.`);
  }, [showToast]);

  const setDeliveryDetails = useCallback((details: DeliveryDetails | null) => {
    setDeliveryDetailsState(details);
  }, []);

  const confirmOrder = useCallback((order: ProjectOrder) => {
    const finalOrder: ProjectOrder = {
      ...order,
      clientId: currentUser?.id || 'usr-anonimo',
      cliente_id: currentUser?.id || 'usr-anonimo'
    };
    setActiveOrder(finalOrder);
    setOrders((prev) => [finalOrder, ...prev]);
  }, [currentUser]);

  const createRequestFromActiveProject = useCallback(
    (orderData?: ProjectOrder, cartData?: CartItem[]): ProjectRequest => {
      const randomCodeNum = Math.floor(8500 + Math.random() * 999);
      const newCode = orderData?.code || `CLK-${randomCodeNum}`;
      const itemsToSave = cartData || (orderData?.items ? orderData.items : cartItems);
      const subtotalVal = itemsToSave.reduce((acc, it) => acc + it.unitPriceCOP * it.quantity, 0);
      const totalVal = orderData?.totalCOP || subtotalVal;

      const newRequest: ProjectRequest = {
        id: newCode,
        code: newCode,
        clientId: currentUser?.id || 'usr-laura',
        cliente_id: currentUser?.id || 'usr-laura',
        createdAt: 'Hace un momento',
        clientType: activeProjectInput.clientType || currentUser?.clientType || 'particular',
        client: {
          name: activeProjectInput.clientType === 'empresa'
            ? (activeProjectInput.companyContactPerson || activeProjectInput.companyName || 'Responsable Empresa')
            : (activeProjectInput.clientName || currentUser?.name || 'Cliente Pintuco'),
          email: activeProjectInput.clientEmail || currentUser?.email || 'cliente@pintuco.co',
          phone: activeProjectInput.clientPhone || currentUser?.phone || '+57 300 123 4567',
          city: activeProjectInput.clientCity || currentUser?.city || 'Bogotá D.C.',
          companyName: activeProjectInput.companyName || currentUser?.companyName,
          companyNit: activeProjectInput.companyNit || currentUser?.companyNit,
          contactPerson: activeProjectInput.companyContactPerson
        },
        input: {
          ...activeProjectInput,
          clientId: currentUser?.id || 'usr-laura',
          cliente_id: currentUser?.id || 'usr-laura'
        },
        aiAnalysis: { ...aiAnalysis },
        recommendation: { ...recommendation },
        status: orderData
          ? (orderData.requiresHumanAdvisory ? 'validacion_tecnica' : 'gestion_comercial')
          : 'nueva',
        assignedTechnician: 'Ing. Carlos Mendoza (Pintuco Asesoría Técnica)',
        technicianNotes: orderData
          ? `Pedido registrado (${orderData.code}). Despacho: ${orderData.deliveryOption}. Pago: ${orderData.paymentMethod}. Total: $${orderData.totalCOP.toLocaleString('es-CO')} COP.`
          : `Solicitud registrada en ColorLink. Espacio: ${activeProjectInput.specificSpaceSubtype || 'Espacio'} (${activeProjectInput.estimatedM2} m²). Sistema formulado: ${recommendation.recommendedSystem}. Total estimado materiales: $${subtotalVal.toLocaleString('es-CO')} COP.`,
        quotedAmount: totalVal,
        cartItems: itemsToSave,
        orderId: orderData?.id,
        deliveryOption: orderData?.deliveryOption,
        paymentMethod: orderData?.paymentMethod,
        requiresHumanAdvisory: orderData?.requiresHumanAdvisory,
        lastUpdated: 'Ahora'
      };

      setRequests((prev) => [newRequest, ...prev]);
      showToast(`¡Solicitud ${newCode} registrada exitosamente en ColorLink!`);
      return newRequest;
    },
    [activeProjectInput, aiAnalysis, recommendation, cartItems, currentUser, showToast]
  );

  const updateRequestStatus = useCallback(
    (
      id: string,
      newStatus: RequestStatus,
      technicianNotes?: string,
      quotedAmount?: number
    ) => {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === id) {
            return {
              ...req,
              status: newStatus,
              technicianNotes: technicianNotes !== undefined ? technicianNotes : req.technicianNotes,
              quotedAmount: quotedAmount !== undefined ? quotedAmount : req.quotedAmount,
              lastUpdated: 'Reciente'
            };
          }
          return req;
        })
      );
      showToast(`Estado de solicitud actualizado a "${newStatus.toUpperCase()}".`);
    },
    [showToast]
  );

  const resetActiveProject = useCallback(() => {
    setActiveProjectInput({
      clientId: currentUser?.id,
      cliente_id: currentUser?.id,
      transformationTarget: 'hogar',
      clientType: currentUser?.clientType || 'particular',
      clientName: currentUser?.name || 'Laura María Restrepo',
      clientEmail: currentUser?.email || 'laura.restrepo@pintuco-usuario.co',
      clientPhone: currentUser?.phone || '+57 312 847 2910',
      clientCity: currentUser?.city || 'Bogotá D.C.',
      companyName: currentUser?.companyName,
      companyNit: currentUser?.companyNit,
      spaceType: 'hogar',
      specificSpaceSubtype: 'Sala / Comedor',
      specificArea: 'Zona social con muro de acento',
      currentCondition: 'bueno',
      currentConditionEnum: 'nuevo',
      surfaceType: 'concreto',
      estimatedM2: 28,
      spacesCount: 1,
      trafficLevel: 'medio',
      urgency: 'normal',
      description: '',
      imageUrl: SAMPLE_IMAGES[0].url,
      imageUrls: [SAMPLE_IMAGES[0].url],
      imageFileName: 'espacio_pintuco.jpg',
      preferredFinish: 'satinado',
      selectedStyle: 'lino-andino',
      selectedColorName: 'Lino Andino',
      selectedColorCode: 'PT-104',
      selectedColorHex: '#EAE5D9',
      hasMoisture: false,
      hasCracks: false,
      acceptsTerms: true,
      requiresTechnicalVisit: false,
      requiredProjectDate: '2026-08-28',
      createdAt: new Date().toISOString(),
      evidences: []
    });
    setDeliveryDetailsState(null);
    setActiveOrder(null);
  }, [currentUser]);

  const loadRequestIntoActiveProject = useCallback((req: ProjectRequest) => {
    if (req.input) {
      setActiveProjectInput({ ...req.input });
    }
    if (req.cartItems && req.cartItems.length > 0) {
      setCartItems([...req.cartItems]);
    }
    showToast(`Solicitud ${req.code} cargada en el asistente.`);
  }, [showToast]);

  // AUTHENTICATION OPERATIONS
  const loginUser = useCallback((user: ClientUser, rememberMe: boolean = true) => {
    setCurrentUser(user);
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
      if (exists) {
        return prev.map((u) =>
          u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...user } : u
        );
      }
      return [...prev, user];
    });

    // Seamlessly attach current active project to the authenticated user
    setActiveProjectInput((prev) => ({
      ...prev,
      clientId: user.id,
      cliente_id: user.id,
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone,
      clientCity: user.city,
      clientType: user.clientType,
      companyName: user.companyName,
      companyNit: user.companyNit
    }));

    // If user has saved address, initialize delivery details
    if (user.savedAddresses && user.savedAddresses.length > 0) {
      const defaultAddr = user.savedAddresses.find((a) => a.isDefault) || user.savedAddresses[0];
      setDeliveryDetailsState((prev) => ({
        tipo_entrega: prev?.tipo_entrega || 'domicilio',
        ciudad: defaultAddr.city || user.city,
        localidad: defaultAddr.locality || 'Chapinero',
        barrio: defaultAddr.neighborhood || '',
        direccion: defaultAddr.address || '',
        complemento: defaultAddr.complement || '',
        instrucciones: defaultAddr.notes || '',
        latitud: prev?.latitud || 4.6792,
        longitud: prev?.longitud || -74.0531,
        costo_envio: 0,
        fecha_estimada: '2 - 3 días hábiles',
        tiempo_estimado: '24 - 48 horas',
        direccion_confirmada: true,
        disponibilidad_stock: 'todos_disponibles'
      }));
    }

    showToast(`¡Bienvenido(a), ${user.name}!`);
  }, [showToast]);

  const loginByEmail = useCallback((email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) {
      loginUser(found);
      return true;
    }
    return false;
  }, [users, loginUser]);

  const registerUser = useCallback((newUser: ClientUser) => {
    setUsers((prev) => [newUser, ...prev]);
    loginUser(newUser);
    showToast(`¡Cuenta creada con éxito! Bienvenido(a) a ColorLink Pintuco.`);
  }, [loginUser, showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setActiveProjectInput((prev) => ({
      ...prev,
      clientId: undefined,
      cliente_id: undefined,
      clientName: '',
      clientEmail: '',
      clientPhone: ''
    }));
    setDeliveryDetailsState(null);
    showToast('Has cerrado sesión en ColorLink Pintuco.');
  }, [showToast]);

  const updateUserProfile = useCallback((updates: Partial<ClientUser>) => {
    if (!currentUser) return;
    const nextUser = { ...currentUser, ...updates };
    setCurrentUser(nextUser);
    setUsers((prev) => prev.map((u) => (u.id === nextUser.id ? nextUser : u)));
    showToast('Perfil actualizado correctamente.');
  }, [currentUser, showToast]);

  // STRICT DATA ISOLATION (USER REQUESTS & ORDERS)
  const userRequests = useMemo(() => {
    if (!currentUser) return [];
    const currentId = currentUser.id.toLowerCase();
    const currentEmail = currentUser.email.toLowerCase();
    const currentName = currentUser.name.toLowerCase();

    return requests.filter((r) => {
      const reqClientId = (r.clientId || r.cliente_id || '').toLowerCase();
      const reqClientEmail = (r.client?.email || r.input?.clientEmail || '').toLowerCase();
      const reqClientName = (r.client?.name || r.input?.clientName || '').toLowerCase();

      return (
        reqClientId === currentId ||
        reqClientEmail === currentEmail ||
        (reqClientName && reqClientName === currentName)
      );
    });
  }, [requests, currentUser]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    const currentId = currentUser.id.toLowerCase();
    const currentEmail = currentUser.email.toLowerCase();

    return orders.filter((o) => {
      const orderClientId = (o.clientId || o.cliente_id || '').toLowerCase();
      const orderClientEmail = (o.client?.email || '').toLowerCase();

      return orderClientId === currentId || orderClientEmail === currentEmail;
    });
  }, [orders, currentUser]);

  const contextValue: ColorLinkContextType = {
    currentUser,
    allUsers: users,
    loginUser,
    loginByEmail,
    registerUser,
    logout,
    updateUserProfile,
    activeProjectInput,
    aiAnalysis,
    recommendation,
    selectedTier,
    smartProductCalculation: smartData.calculation,
    systemComparison: smartData.comparison,
    recommendedProducts: smartData.recommendedProducts,
    cartItems,
    cartFinancials,
    deliveryDetails,
    activeOrder,
    updateActiveProjectInput,
    selectSampleImage,
    setSelectedTier,
    addToCart,
    updateCartItemQuantity,
    setCartItemQuantity,
    removeFromCart,
    resetCartToTier,
    setDeliveryDetails,
    confirmOrder,
    createRequestFromActiveProject,
    updateRequestStatus,
    resetActiveProject,
    loadRequestIntoActiveProject,
    allRequests: requests,
    userRequests,
    allOrders: orders,
    userOrders,
    toastMessage,
    showToast
  };

  return (
    <ColorLinkContext.Provider value={contextValue}>
      {children}
    </ColorLinkContext.Provider>
  );
};

export const useColorLink = (): ColorLinkContextType => {
  const context = useContext(ColorLinkContext);
  if (!context) {
    throw new Error('useColorLink must be used within a ColorLinkProvider');
  }
  return context;
};
