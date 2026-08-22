export interface CityLocationConfig {
  city: string;
  localities: string[];
  centerLat: number;
  centerLng: number;
}

export const COLOMBIA_CITIES_CONFIG: CityLocationConfig[] = [
  {
    city: 'Bogotá D.C.',
    centerLat: 4.6792,
    centerLng: -74.0531,
    localities: [
      'Usaquén',
      'Chapinero',
      'Santa Fe',
      'San Cristóbal',
      'Usme',
      'Tunjuelito',
      'Bosa',
      'Kennedy',
      'Fontibón',
      'Engativá',
      'Suba',
      'Barrios Unidos',
      'Teusaquillo',
      'Los Mártires',
      'Antonio Nariño',
      'Puente Aranda',
      'La Candelaria',
      'Rafael Uribe Uribe',
      'Ciudad Bolívar',
      'Sumapaz'
    ]
  },
  {
    city: 'Medellín',
    centerLat: 6.2442,
    centerLng: -75.5812,
    localities: [
      'El Poblado',
      'Laureles - Estadio',
      'Belén',
      'La Candelaria (Centro)',
      'Envigado / Sabaneta',
      'Robledo / Castilla',
      'Guayabal',
      'Buenos Aires',
      'San Javier',
      'América'
    ]
  },
  {
    city: 'Cali',
    centerLat: 3.4516,
    centerLng: -76.5320,
    localities: [
      'Comuna 2 (Norte / Granada / Chipichape)',
      'Comuna 19 (San Fernando / Tequendama)',
      'Comuna 22 (Ciudad Jardín / Pance)',
      'Comuna 17 (El Limonar / Capri)',
      'Comuna 3 (San Antonio / Centro)',
      'Comuna 4 (Flora Industrial)',
      'Comuna 10 (Guabal / El Dorado)'
    ]
  },
  {
    city: 'Barranquilla',
    centerLat: 10.9685,
    centerLng: -74.7813,
    localities: [
      'Riomar (Alto Prado / Buenavista)',
      'Norte - Centro Histórico',
      'Sur Occidente',
      'Metropolitana',
      'Sur Oriente'
    ]
  },
  {
    city: 'Bucaramanga',
    centerLat: 7.1254,
    centerLng: -73.1198,
    localities: [
      'Cabecera del Llano',
      'Cañaveral / Floridablanca',
      'Centro / García Rovira',
      'Provenza',
      'San Francisco',
      'Sotomayor'
    ]
  },
  {
    city: 'Cartagena',
    centerLat: 10.3910,
    centerLng: -75.4794,
    localities: [
      'Bocagrande / Castillogrande',
      'Centro Histórico / Getsemaní',
      'Manga',
      'Zona Norte (Crespo / Morros)',
      'Pie de la Popa / Santa Lucía'
    ]
  },
  {
    city: 'Pereira',
    centerLat: 4.8133,
    centerLng: -75.6961,
    localities: [
      'Circunvalar / Pinares',
      'Centro',
      'Cerritos',
      'Dosquebradas',
      'Cuba'
    ]
  },
  {
    city: 'Manizales',
    centerLat: 5.0689,
    centerLng: -75.5174,
    localities: [
      'El Cable / Palermo',
      'Centro',
      'La Francia / Chipre',
      'Milán / La Sultana',
      'Villamaría'
    ]
  },
  {
    city: 'Santa Marta',
    centerLat: 11.2408,
    centerLng: -74.1990,
    localities: [
      'El Rodadero',
      'Centro Histórico',
      'Bavaria / Jardín',
      'Pozos Colorados / Bello Horizonte'
    ]
  },
  {
    city: 'Ibagué',
    centerLat: 4.4389,
    centerLng: -75.2322,
    localities: [
      'Zona Centro / La Pola',
      'Zona Norte / Vergel',
      'Zona Jordán / Quinta',
      'Mirolindo / Picaleña'
    ]
  }
];

export const COLOMBIAN_CITIES_NAMES = COLOMBIA_CITIES_CONFIG.map(c => c.city);

export function getLocalitiesForCity(cityName: string): string[] {
  const normalized = (cityName || '').toLowerCase().trim();
  const found = COLOMBIA_CITIES_CONFIG.find(c =>
    c.city.toLowerCase().includes(normalized) || normalized.includes(c.city.toLowerCase().split(' ')[0])
  );
  if (found) return found.localities;
  return ['Zona Norte', 'Zona Centro', 'Zona Sur', 'Zona Oriente', 'Zona Occidente'];
}

/**
 * Calculates a simulated deterministic coordinate based on address string + city + locality
 */
export function calculateSimulatedCoordinates(
  cityName: string,
  localityName?: string,
  neighborhood?: string,
  address?: string
): { lat: number; lng: number } {
  const normalizedCity = (cityName || '').toLowerCase();
  const config = COLOMBIA_CITIES_CONFIG.find(c =>
    c.city.toLowerCase().includes(normalizedCity) || normalizedCity.includes(c.city.toLowerCase().split(' ')[0])
  ) || COLOMBIA_CITIES_CONFIG[0];

  // Hash-like deterministic shift from locality, neighborhood, and address
  const fullText = `${localityName || ''}_${neighborhood || ''}_${address || ''}`;
  let hash = 0;
  for (let i = 0; i < fullText.length; i++) {
    hash = (hash << 5) - hash + fullText.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = ((Math.abs(hash) % 100) - 50) * 0.0003;
  const lngOffset = ((Math.abs(hash >> 3) % 100) - 50) * 0.0003;

  return {
    lat: Number((config.centerLat + latOffset).toFixed(4)),
    lng: Number((config.centerLng + lngOffset).toFixed(4))
  };
}
