import { PintacasaStore, CartItem } from '../types';
import { calculateSimulatedCoordinates } from './colombiaLocations';

export const PINTACASA_STORES_COLOMBIA: PintacasaStore[] = [
  // BOGOTÁ D.C.
  {
    tienda_id: 'ptc-bogota-chico',
    nombre: 'Pintacasa Pintuco Calle 94 - Chicó',
    direccion: 'Calle 94 # 14-38, Chicó Norte',
    ciudad: 'Bogotá D.C.',
    localidad: 'Chapinero',
    barrio: 'Chicó Norte',
    latitud: 4.6792,
    longitud: -74.0531,
    horario: 'Lun - Sáb: 7:30 AM - 6:00 PM • Dom: 9:00 AM - 2:00 PM',
    telefono: '(601) 745-8820',
    distancia_km: 1.2,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Punto más cercano con 100% de stock disponible y entintado computarizado inmediato.',
    features: ['ColorStudio Computarizado', 'Asesoría Técnica Pintuco', 'Parqueadero Gratis', 'Entintado Express']
  },
  {
    tienda_id: 'ptc-bogota-80',
    nombre: 'Pintacasa Pintuco Calle 80 - Metrópolis',
    direccion: 'Calle 80 # 68-45, Barrio Metrópolis',
    ciudad: 'Bogotá D.C.',
    localidad: 'Engativá',
    barrio: 'Metrópolis',
    latitud: 4.6865,
    longitud: -74.0842,
    horario: 'Lun - Sáb: 7:00 AM - 5:30 PM',
    telefono: '(601) 311-4020',
    distancia_km: 3.4,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Centro de distribución especializado en alta capacidad y kits de aplicación.',
    features: ['Centro de Mezclas', 'Atención Constructor', 'Cargue Rápido']
  },
  {
    tienda_id: 'ptc-bogota-127',
    nombre: 'Pintacasa Pintuco Av. 127 - Unicentro',
    direccion: 'Av. Calle 127 # 19-32, Santa Bárbara',
    ciudad: 'Bogotá D.C.',
    localidad: 'Usaquén',
    barrio: 'Santa Bárbara',
    latitud: 4.7042,
    longitud: -74.0489,
    horario: 'Lun - Sáb: 8:00 AM - 6:00 PM • Dom: 10:00 AM - 3:00 PM',
    telefono: '(601) 620-1928',
    distancia_km: 4.1,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Especialista en acabados decorativos y líneas Viniltex Supreme Seda.',
    features: ['Galería de Color Pintuco', 'Asesoría Arquitectónica', 'Datafono PSE']
  },
  {
    tienda_id: 'ptc-bogota-americas',
    nombre: 'Pintacasa Pintuco Américas',
    direccion: 'Av. de las Américas # 62-10, Puente Aranda',
    ciudad: 'Bogotá D.C.',
    localidad: 'Puente Aranda',
    barrio: 'Salazar Gómez',
    latitud: 4.6288,
    longitud: -74.1165,
    horario: 'Lun - Sáb: 7:30 AM - 5:00 PM',
    telefono: '(601) 260-8451',
    distancia_km: 6.8,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Punto aliado industrial con amplio surtido.',
    features: ['Líneas Industriales y Anticorrosivas', 'Asesoría en Obra']
  },
  {
    tienda_id: 'ptc-bogota-suba',
    nombre: 'Pintacasa Pintuco Suba - La Campiña',
    direccion: 'Av. Suba # 98-40, La Campiña',
    ciudad: 'Bogotá D.C.',
    localidad: 'Suba',
    barrio: 'La Campiña',
    latitud: 4.7431,
    longitud: -74.0862,
    horario: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    telefono: '(601) 682-9011',
    distancia_km: 5.5,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Punto norte con laboratorio de color.',
    features: ['Entintado Rápido', 'Atención Profesional']
  },

  // MEDELLÍN
  {
    tienda_id: 'ptc-medellin-poblado',
    nombre: 'Pintacasa Pintuco El Poblado',
    direccion: 'Carrera 43A # 7-50, El Poblado',
    ciudad: 'Medellín',
    localidad: 'El Poblado',
    barrio: 'Patio Bonito',
    latitud: 6.2089,
    longitud: -75.5714,
    horario: 'Lun - Sáb: 7:30 AM - 6:00 PM',
    telefono: '(604) 448-9100',
    distancia_km: 1.8,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Tienda principal con stock completo y laboratorio de color.',
    features: ['ColorStudio', 'Zona Lounge', 'Parqueadero']
  },
  {
    tienda_id: 'ptc-medellin-laureles',
    nombre: 'Pintacasa Pintuco Laureles',
    direccion: 'Transversal 39B # 72-18, Nutibara',
    ciudad: 'Medellín',
    localidad: 'Laureles - Estadio',
    barrio: 'Laureles',
    latitud: 6.2442,
    longitud: -75.5925,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(604) 412-3344',
    distancia_km: 3.2,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Excelente ubicación con despacho express.',
    features: ['Entintado Rápido', 'Asesoría Personalizada']
  },
  {
    tienda_id: 'ptc-medellin-belen',
    nombre: 'Pintacasa Pintuco Belén - Los Alpes',
    direccion: 'Calle 30 # 76-20, Belén',
    ciudad: 'Medellín',
    localidad: 'Belén',
    barrio: 'Los Alpes',
    latitud: 6.2310,
    longitud: -75.6015,
    horario: 'Lun - Sáb: 8:00 AM - 5:30 PM',
    telefono: '(604) 345-1290',
    distancia_km: 4.5,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Punto oeste con amplio parqueadero y asesoría técnica.',
    features: ['Atención al Pintor', 'Parqueadero Gratuito']
  },
  {
    tienda_id: 'ptc-medellin-envigado',
    nombre: 'Pintacasa Pintuco Envigado - Vegas',
    direccion: 'Carrera 48 # 39 Sur - 40, Las Vegas',
    ciudad: 'Medellín',
    localidad: 'Envigado / Sabaneta',
    barrio: 'San Marcos',
    latitud: 6.1730,
    longitud: -75.5880,
    horario: 'Lun - Sáb: 7:30 AM - 6:00 PM',
    telefono: '(604) 331-5080',
    distancia_km: 5.1,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Atención al sur del Valle de Aburrá.',
    features: ['Línea Arquitectónica', 'Entintado Computarizado']
  },

  // CALI
  {
    tienda_id: 'ptc-cali-granada',
    nombre: 'Pintacasa Pintuco Granada - Chipichape',
    direccion: 'Av. 6N # 35N-12, Barrio Granada',
    ciudad: 'Cali',
    localidad: 'Comuna 2 (Norte / Granada / Chipichape)',
    barrio: 'Granada',
    latitud: 3.4682,
    longitud: -76.5298,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(602) 661-2290',
    distancia_km: 2.1,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Punto flagship en Cali con todo el catálogo Viniltex y Koraza.',
    features: ['ColorStudio Computarizado', 'Garantía Directa']
  },
  {
    tienda_id: 'ptc-cali-sanfernando',
    nombre: 'Pintacasa Pintuco San Fernando',
    direccion: 'Calle 5 # 34-18, San Fernando',
    ciudad: 'Cali',
    localidad: 'Comuna 19 (San Fernando / Tequendama)',
    barrio: 'San Fernando',
    latitud: 3.4350,
    longitud: -76.5410,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(602) 554-1120',
    distancia_km: 3.6,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Especialistas en remodelación de interiores y clínicas.',
    features: ['Viniltex Biocuidado', 'Entintado Computarizado']
  },
  {
    tienda_id: 'ptc-cali-ciudadjardin',
    nombre: 'Pintacasa Pintuco Ciudad Jardín',
    direccion: 'Carrera 100 # 14-80, Ciudad Jardín',
    ciudad: 'Cali',
    localidad: 'Comuna 22 (Ciudad Jardín / Pance)',
    barrio: 'Ciudad Jardín',
    latitud: 3.3720,
    longitud: -76.5340,
    horario: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    telefono: '(602) 330-9840',
    distancia_km: 5.4,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Ubicación sur con amplios inventarios de alta gama.',
    features: ['Línea Supreme', 'Asesoría en Diseño']
  },

  // BARRANQUILLA
  {
    tienda_id: 'ptc-barranquilla-prado',
    nombre: 'Pintacasa Pintuco Calle 84 - Alto Prado',
    direccion: 'Calle 84 # 51B-22, Alto Prado',
    ciudad: 'Barranquilla',
    localidad: 'Riomar (Alto Prado / Buenavista)',
    barrio: 'Alto Prado',
    latitud: 11.0041,
    longitud: -74.8193,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(605) 378-4411',
    distancia_km: 1.5,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Punto principal de la Costa Caribe con especialidad en climas cálidos y Koraza.',
    features: ['Anti-hongos Expertise', 'ColorStudio', 'Despacho Rápido']
  },
  {
    tienda_id: 'ptc-barranquilla-centro',
    nombre: 'Pintacasa Pintuco Centro Histórico',
    direccion: 'Carrera 44 # 38-25, Centro',
    ciudad: 'Barranquilla',
    localidad: 'Norte - Centro Histórico',
    barrio: 'Centro',
    latitud: 10.9850,
    longitud: -74.7890,
    horario: 'Lun - Sáb: 7:30 AM - 5:00 PM',
    telefono: '(605) 340-9922',
    distancia_km: 3.8,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Punto central con alta rotación y precios de distribuidor.',
    features: ['Venta por Volumen', 'Atención Maestro']
  },
  {
    tienda_id: 'ptc-barranquilla-murillo',
    nombre: 'Pintacasa Pintuco Murillo',
    direccion: 'Calle 45 (Murillo) # 21-50',
    ciudad: 'Barranquilla',
    localidad: 'Sur Occidente',
    barrio: 'San José',
    latitud: 10.9650,
    longitud: -74.7950,
    horario: 'Lun - Sáb: 8:00 AM - 5:00 PM',
    telefono: '(605) 362-1144',
    distancia_km: 4.9,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Excelente conectividad para despachos en el sur.',
    features: ['Cargue Directo', 'Asesoría Técnica']
  },

  // BUCARAMANGA
  {
    tienda_id: 'ptc-bucaramanga-cabecera',
    nombre: 'Pintacasa Pintuco Cabecera del Llano',
    direccion: 'Carrera 33 # 48-15, Cabecera',
    ciudad: 'Bucaramanga',
    localidad: 'Cabecera del Llano',
    barrio: 'Cabecera del Llano',
    latitud: 7.1193,
    longitud: -73.1098,
    horario: 'Lun - Sáb: 8:00 AM - 5:30 PM',
    telefono: '(607) 643-9900',
    distancia_km: 1.9,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Atención técnica certificada y amplio inventario en stock.',
    features: ['ColorStudio', 'Atención Técnica']
  },
  {
    tienda_id: 'ptc-bucaramanga-canaveral',
    nombre: 'Pintacasa Pintuco Cañaveral',
    direccion: 'Autopista Floridablanca # 29-10, Cañaveral',
    ciudad: 'Bucaramanga',
    localidad: 'Cañaveral / Floridablanca',
    barrio: 'Cañaveral',
    latitud: 7.0680,
    longitud: -73.1020,
    horario: 'Lun - Sáb: 7:30 AM - 6:00 PM',
    telefono: '(607) 638-5544',
    distancia_km: 4.2,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Punto estratégico en Floridablanca.',
    features: ['Parqueadero', 'Laboratorio de Color']
  },
  {
    tienda_id: 'ptc-bucaramanga-centro',
    nombre: 'Pintacasa Pintuco Centro',
    direccion: 'Calle 36 # 17-22, Centro',
    ciudad: 'Bucaramanga',
    localidad: 'Centro / García Rovira',
    barrio: 'Centro',
    latitud: 7.1280,
    longitud: -73.1240,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(607) 671-8833',
    distancia_km: 3.1,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Centro neurálgico con gran variedad de complementarios.',
    features: ['Herramientas y Accesorios', 'Atención Rápida']
  },

  // CARTAGENA
  {
    tienda_id: 'ptc-cartagena-bocagrande',
    nombre: 'Pintacasa Pintuco Bocagrande',
    direccion: 'Av. San Martín # 6-40, Bocagrande',
    ciudad: 'Cartagena',
    localidad: 'Bocagrande / Castillogrande',
    barrio: 'Bocagrande',
    latitud: 10.3990,
    longitud: -75.5560,
    horario: 'Lun - Sáb: 8:00 AM - 6:00 PM',
    telefono: '(605) 665-4321',
    distancia_km: 2.3,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: true,
    recommendationReason: 'Especialista en ambientes marinos, protección anti-salitre y Koraza.',
    features: ['Resistencia Marina', 'ColorStudio', 'Atención Bilingüe']
  },
  {
    tienda_id: 'ptc-cartagena-manga',
    nombre: 'Pintacasa Pintuco Manga',
    direccion: 'Calle Real de Manga # 24-18',
    ciudad: 'Cartagena',
    localidad: 'Manga',
    barrio: 'Manga',
    latitud: 10.4120,
    longitud: -75.5380,
    horario: 'Lun - Sáb: 7:30 AM - 5:30 PM',
    telefono: '(605) 660-1920',
    distancia_km: 3.7,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 2 horas',
    isRecommended: false,
    recommendationReason: 'Punto céntrico cerca a la zona portuaria.',
    features: ['Líneas Industriales', 'Entintado Express']
  },
  {
    tienda_id: 'ptc-cartagena-crespo',
    nombre: 'Pintacasa Pintuco Zona Norte - Crespo',
    direccion: 'Av. Santander # 68-12, Crespo',
    ciudad: 'Cartagena',
    localidad: 'Zona Norte (Crespo / Morros)',
    barrio: 'Crespo',
    latitud: 10.4450,
    longitud: -75.5180,
    horario: 'Lun - Sáb: 8:00 AM - 5:30 PM',
    telefono: '(605) 656-7890',
    distancia_km: 4.8,
    disponibilidad: '100% Disponible',
    stockTotalItems: 5,
    availableItemsCount: 5,
    tiempo_estimado_recogida: 'Listo en 1 hora',
    isRecommended: false,
    recommendationReason: 'Cobertura hacia la zona norte y condominios.',
    features: ['Atención Hoteles y Condominios', 'Despacho Rápido']
  }
];

/**
 * Calculates distance in km between two lat/lng points using Haversine formula
 */
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Number(Math.max(0.6, d).toFixed(1));
}

/**
 * Gets stores filtered by city and dynamically calculates real distances and stock validation
 */
export function getStoresForLocation(
  cityName: string,
  localityName?: string,
  neighborhood?: string,
  address?: string,
  cartItems: CartItem[] = []
): PintacasaStore[] {
  const normalized = (cityName || '').toLowerCase();
  
  let baseStores = PINTACASA_STORES_COLOMBIA.filter(s => {
    const sCity = s.ciudad.toLowerCase();
    return sCity.includes(normalized) || normalized.includes(sCity.split(' ')[0]);
  });

  // Fallback if city has no explicit stores: return Bogota stores as simulated closest regional hubs
  if (baseStores.length === 0) {
    baseStores = PINTACASA_STORES_COLOMBIA.filter(s => s.ciudad === 'Bogotá D.C.');
  }

  // Calculate client coordinates
  const clientCoords = calculateSimulatedCoordinates(cityName, localityName, neighborhood, address);

  // Compute total unique cart products required
  const totalCartCount = cartItems.length > 0 ? cartItems.length : 3;

  // Recalculate distance and stock for each store
  const updatedStores = baseStores.map((store, index) => {
    const dist = calculateDistanceKm(clientCoords.lat, clientCoords.lng, store.latitud, store.longitud);
    
    // Simulate availability based on store capacity (most have 100%, some peripheral have partial)
    const isFullStock = index !== 3; // 4th store has slight partial stock for realistic comparison
    const availableCount = isFullStock ? totalCartCount : Math.max(1, totalCartCount - 1);
    const availabilityLabel: '100% Disponible' | 'Parcial (4/5)' = isFullStock ? '100% Disponible' : 'Parcial (4/5)';

    return {
      ...store,
      distancia_km: dist,
      stockTotalItems: totalCartCount,
      availableItemsCount: availableCount,
      disponibilidad: availabilityLabel,
      tiempo_estimado_recogida: dist < 3 ? 'Listo en 1 hora' : 'Listo en 2 horas'
    };
  });

  // Sort by recommendation criteria: (1) 100% stock availability, (2) distance, (3) pickup speed
  updatedStores.sort((a, b) => {
    const aStockRatio = a.availableItemsCount / a.stockTotalItems;
    const bStockRatio = b.availableItemsCount / b.stockTotalItems;
    if (aStockRatio !== bStockRatio) return bStockRatio - aStockRatio;
    return a.distancia_km - b.distancia_km;
  });

  // Mark the best ranked as recommended
  return updatedStores.map((st, idx) => ({
    ...st,
    isRecommended: idx === 0,
    recommendationReason: idx === 0
      ? `Punto Pintacasa más conveniente a ${st.distancia_km} km con 100% de stock disponible para tu proyecto.`
      : st.recommendationReason
  }));
}

export function findSmartRecommendedStore(stores: PintacasaStore[]): {
  recommendedStore: PintacasaStore;
  reason: string;
} {
  const best = stores.find(s => s.isRecommended) || stores[0];
  const reason = best.availableItemsCount === best.stockTotalItems
    ? `Encontramos la tienda Pintacasa "${best.nombre}" a ${best.distancia_km} km con todos los productos de tu proyecto disponibles y lista para retiro en ${best.tiempo_estimado_recogida.toLowerCase()}.`
    : `Punto aliado más cercano a ${best.distancia_km} km con atención técnica certificada.`;

  return {
    recommendedStore: best,
    reason
  };
}

export function getStoresByCity(city: string): PintacasaStore[] {
  return getStoresForLocation(city);
}
