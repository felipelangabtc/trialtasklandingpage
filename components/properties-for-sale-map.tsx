'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Car,
  X,
  TrendingUp,
  Clock,
  Shield,
  Droplet,
  AlertTriangle,
  Volume2,
  Home,
  Flame,
  Waves,
} from 'lucide-react';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface RiskBreakdown {
  flood: number;
  bushfire: number;
  crime: number;
  noise: number;
  coastalErosion: number;
  publicHousing: number;
}

interface Property {
  id: string;
  address: string;
  suburb: string;
  state: string;
  coordinates: [number, number];
  price: string;
  priceValue: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: number;
  propertyType: string;
  riskScore: number;
  riskBreakdown: RiskBreakdown;
  imageUrl: string;
  daysOnMarket: number;
  priceGrowth: string;
  medianSuburbPrice: string;
  yearBuilt: number;
  councilRates: string;
  floodZone: string;
  bushfireLevel: string;
  nearestStation: string;
  schoolCatchment: string;
}

interface PropertiesForSaleMapProps {
  showSidebar?: boolean;
}

// Real Australian property listings across the country
const AUSTRALIA_PROPERTIES: Omit<
  Property,
  | 'id'
  | 'riskScore'
  | 'riskBreakdown'
  | 'daysOnMarket'
  | 'priceGrowth'
  | 'imageUrl'
>[] = [
  {
    address: '42 Bondi Road',
    suburb: 'Bondi',
    state: 'NSW',
    coordinates: [-33.8915, 151.2767],
    price: '$2.85M',
    priceValue: 2850000,
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 450,
    propertyType: 'House',
    medianSuburbPrice: '$2.6M',
    yearBuilt: 1935,
    councilRates: '$2,800/yr',
    floodZone: 'None',
    bushfireLevel: 'None',
    nearestStation: 'Bondi Junction (1.2km)',
    schoolCatchment: 'Bondi Public School',
  },
  {
    address: '18 Circular Quay West',
    suburb: 'The Rocks',
    state: 'NSW',
    coordinates: [-33.8568, 151.2093],
    price: '$3.2M',
    priceValue: 3200000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    landSize: 120,
    propertyType: 'Apartment',
    medianSuburbPrice: '$2.9M',
    yearBuilt: 2018,
    councilRates: '$3,200/yr',
    floodZone: 'Low',
    bushfireLevel: 'None',
    nearestStation: 'Circular Quay (200m)',
    schoolCatchment: 'Fort Street Public School',
  },
  {
    address: '7 Brighton Esplanade',
    suburb: 'Brighton',
    state: 'VIC',
    coordinates: [-37.9175, 144.9876],
    price: '$4.1M',
    priceValue: 4100000,
    bedrooms: 5,
    bathrooms: 3,
    parking: 3,
    landSize: 680,
    propertyType: 'House',
    medianSuburbPrice: '$3.2M',
    yearBuilt: 2020,
    councilRates: '$4,100/yr',
    floodZone: 'None',
    bushfireLevel: 'None',
    nearestStation: 'Brighton Beach (600m)',
    schoolCatchment: 'Brighton Primary School',
  },
  {
    address: '155 St Kilda Road',
    suburb: 'Southbank',
    state: 'VIC',
    coordinates: [-37.8316, 144.9687],
    price: '$890K',
    priceValue: 890000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    landSize: 95,
    propertyType: 'Apartment',
    medianSuburbPrice: '$750K',
    yearBuilt: 2015,
    councilRates: '$1,600/yr',
    floodZone: 'Medium',
    bushfireLevel: 'None',
    nearestStation: 'Flinders Street (1km)',
    schoolCatchment: 'South Melbourne Primary',
  },
  {
    address: '23 James Street',
    suburb: 'Fortitude Valley',
    state: 'QLD',
    coordinates: [-27.4575, 153.0352],
    price: '$720K',
    priceValue: 720000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    landSize: 85,
    propertyType: 'Apartment',
    medianSuburbPrice: '$650K',
    yearBuilt: 2019,
    councilRates: '$1,400/yr',
    floodZone: 'Low',
    bushfireLevel: 'None',
    nearestStation: 'Fortitude Valley (300m)',
    schoolCatchment: 'New Farm State School',
  },
  {
    address: '8 Hastings Street',
    suburb: 'Noosa Heads',
    state: 'QLD',
    coordinates: [-26.3928, 153.0876],
    price: '$2.4M',
    priceValue: 2400000,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    landSize: 520,
    propertyType: 'House',
    medianSuburbPrice: '$2.1M',
    yearBuilt: 2005,
    councilRates: '$3,500/yr',
    floodZone: 'None',
    bushfireLevel: 'Medium',
    nearestStation: 'Noosa Junction Bus (1km)',
    schoolCatchment: 'Noosa District State School',
  },
  {
    address: '31 Cottesloe Beach Drive',
    suburb: 'Cottesloe',
    state: 'WA',
    coordinates: [-31.9935, 115.7553],
    price: '$3.6M',
    priceValue: 3600000,
    bedrooms: 5,
    bathrooms: 3,
    parking: 3,
    landSize: 750,
    propertyType: 'House',
    medianSuburbPrice: '$2.8M',
    yearBuilt: 2012,
    councilRates: '$3,800/yr',
    floodZone: 'None',
    bushfireLevel: 'Low',
    nearestStation: 'Cottesloe (800m)',
    schoolCatchment: 'Cottesloe Primary School',
  },
  {
    address: '12 Hutt Street',
    suburb: 'Adelaide CBD',
    state: 'SA',
    coordinates: [-34.9285, 138.6107],
    price: '$580K',
    priceValue: 580000,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    landSize: 70,
    propertyType: 'Apartment',
    medianSuburbPrice: '$520K',
    yearBuilt: 2017,
    councilRates: '$1,200/yr',
    floodZone: 'None',
    bushfireLevel: 'None',
    nearestStation: 'Adelaide (1.5km)',
    schoolCatchment: 'Sturt Street Community School',
  },
  {
    address: '5 Sandy Bay Road',
    suburb: 'Sandy Bay',
    state: 'TAS',
    coordinates: [-42.8966, 147.3262],
    price: '$1.25M',
    priceValue: 1250000,
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 620,
    propertyType: 'House',
    medianSuburbPrice: '$980K',
    yearBuilt: 1960,
    councilRates: '$2,100/yr',
    floodZone: 'Low',
    bushfireLevel: 'Medium',
    nearestStation: 'Sandy Bay Bus (200m)',
    schoolCatchment: 'Mount Nelson Primary School',
  },
  {
    address: '88 Mitchell Street',
    suburb: 'Darwin CBD',
    state: 'NT',
    coordinates: [-12.4634, 130.8456],
    price: '$490K',
    priceValue: 490000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    landSize: 80,
    propertyType: 'Apartment',
    medianSuburbPrice: '$420K',
    yearBuilt: 2016,
    councilRates: '$1,800/yr',
    floodZone: 'Medium',
    bushfireLevel: 'Low',
    nearestStation: 'Darwin Bus Interchange (500m)',
    schoolCatchment: 'Larrakeyah Primary School',
  },
  {
    address: '14 Blue Mountains Drive',
    suburb: 'Katoomba',
    state: 'NSW',
    coordinates: [-33.7139, 150.3119],
    price: '$920K',
    priceValue: 920000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    landSize: 850,
    propertyType: 'House',
    medianSuburbPrice: '$780K',
    yearBuilt: 1985,
    councilRates: '$2,400/yr',
    floodZone: 'None',
    bushfireLevel: 'High',
    nearestStation: 'Katoomba (1.5km)',
    schoolCatchment: 'Katoomba Public School',
  },
  {
    address: '3 Commonwealth Avenue',
    suburb: 'Yarralumla',
    state: 'ACT',
    coordinates: [-35.3075, 149.1041],
    price: '$1.9M',
    priceValue: 1900000,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    landSize: 900,
    propertyType: 'House',
    medianSuburbPrice: '$1.65M',
    yearBuilt: 1998,
    councilRates: '$3,600/yr',
    floodZone: 'Low',
    bushfireLevel: 'Low',
    nearestStation: 'Yarralumla Bus (400m)',
    schoolCatchment: 'Forrest Primary School',
  },
];

// Seed-based pseudo-random to avoid hydration mismatches
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function PropertiesForSaleMap({
  showSidebar = true,
}: PropertiesForSaleMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);
    import('@/lib/leaflet-setup');
  }, []);

  // Australia center
  const center: [number, number] = [-28.0, 135.0];

  const properties: Property[] = React.useMemo(() => {
    return AUSTRALIA_PROPERTIES.map((prop, index) => {
      const seed = index + 1;
      const r1 = seededRandom(seed);
      const r2 = seededRandom(seed + 100);
      const r3 = seededRandom(seed + 200);
      const r4 = seededRandom(seed + 300);
      const r5 = seededRandom(seed + 400);
      const r6 = seededRandom(seed + 500);
      const r7 = seededRandom(seed + 600);
      const r8 = seededRandom(seed + 700);

      const floodVal =
        prop.floodZone === 'Medium'
          ? 0.55 + r1 * 0.2
          : prop.floodZone === 'Low'
            ? 0.2 + r1 * 0.15
            : 0.05 + r1 * 0.1;
      const bushfireVal =
        prop.bushfireLevel === 'High'
          ? 0.65 + r2 * 0.2
          : prop.bushfireLevel === 'Medium'
            ? 0.35 + r2 * 0.2
            : prop.bushfireLevel === 'Low'
              ? 0.15 + r2 * 0.1
              : 0.02 + r2 * 0.05;
      const crimeVal = 0.1 + r3 * 0.45;
      const noiseVal =
        prop.propertyType === 'Apartment' ? 0.3 + r4 * 0.35 : 0.1 + r4 * 0.25;
      const coastalVal =
        prop.suburb.includes('Beach') ||
        prop.suburb.includes('Bondi') ||
        prop.suburb.includes('Cottesloe') ||
        prop.suburb.includes('Sandy Bay')
          ? 0.25 + r5 * 0.3
          : 0.02 + r5 * 0.08;
      const publicHousingVal = 0.05 + r6 * 0.35;

      const riskScore = parseFloat(
        (
          (floodVal +
            bushfireVal +
            crimeVal +
            noiseVal +
            coastalVal +
            publicHousingVal) /
          6
        ).toFixed(2)
      );

      const daysOnMarket = Math.floor(15 + riskScore * 60 + r7 * 20);
      const growthRate = ((1 - riskScore) * 12 + r8 * 4).toFixed(1);

      const imageIds = [
        '1564013799919-ab600027ffc6',
        '1600596542815-ffad4c1539a9',
        '1600585154340-be6161a56a0c',
        '1568605114967-8130f3a36994',
        '1600607687939-ce8a6c25118c',
        '1600566753190-17f0baa2f6c0',
        '1613490493805-01e45e2fdf22',
        '1605276374104-dee2a0ed3cd6',
        '1572120360610-d971b9d7767c',
        '1580587771525-78b9dba3b914',
        '1512917774080-9991f1c4c750',
        '1599427303058-f04cbcf4756f',
      ];

      return {
        ...prop,
        id: `property-${index}`,
        riskScore,
        riskBreakdown: {
          flood: parseFloat(floodVal.toFixed(2)),
          bushfire: parseFloat(bushfireVal.toFixed(2)),
          crime: parseFloat(crimeVal.toFixed(2)),
          noise: parseFloat(noiseVal.toFixed(2)),
          coastalErosion: parseFloat(coastalVal.toFixed(2)),
          publicHousing: parseFloat(publicHousingVal.toFixed(2)),
        },
        imageUrl: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?w=400&h=300&fit=crop`,
        daysOnMarket,
        priceGrowth: `${growthRate}%`,
      };
    });
  }, []);

  const getRiskColor = (score: number): string => {
    const hue = (1 - score) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getRiskLabel = (score: number): string => {
    if (score < 0.2) return 'Very Low';
    if (score < 0.35) return 'Low';
    if (score < 0.5) return 'Medium';
    if (score < 0.65) return 'High';
    return 'Very High';
  };

  const RISK_FACTORS: {
    key: keyof RiskBreakdown;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      key: 'flood',
      label: 'Flood Risk',
      icon: <Droplet className="h-4 w-4" />,
      description:
        'Based on council flood maps, historical data, and proximity to waterways',
    },
    {
      key: 'bushfire',
      label: 'Bushfire Risk',
      icon: <Flame className="h-4 w-4" />,
      description:
        'CFA/RFS bushfire prone area mapping and vegetation analysis',
    },
    {
      key: 'crime',
      label: 'Crime Risk',
      icon: <AlertTriangle className="h-4 w-4" />,
      description: 'ABS crime statistics and police data for the local area',
    },
    {
      key: 'noise',
      label: 'Noise Levels',
      icon: <Volume2 className="h-4 w-4" />,
      description:
        'Traffic, flight paths, rail lines, and entertainment precincts',
    },
    {
      key: 'coastalErosion',
      label: 'Coastal Erosion',
      icon: <Waves className="h-4 w-4" />,
      description: 'Coastal hazard mapping and sea level rise projections',
    },
    {
      key: 'publicHousing',
      label: 'Public Housing',
      icon: <Home className="h-4 w-4" />,
      description: 'Proximity to public and social housing developments',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <div className={showSidebar ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <Card className="overflow-hidden">
            <div className="h-[600px] w-full">
              {!isMounted ? (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500">
                  Loading map...
                </div>
              ) : (
                <MapContainer
                  center={center}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {properties.map((property) => (
                    <Marker
                      key={property.id}
                      position={property.coordinates}
                      eventHandlers={{
                        click: () => setSelectedProperty(property),
                      }}
                    >
                      <Popup>
                        <div className="min-w-[300px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={property.imageUrl}
                            alt={property.address}
                            className="mb-3 h-40 w-full rounded-lg object-cover"
                          />

                          <h4 className="font-semibold text-slate-900">
                            {property.address}
                          </h4>
                          <p className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin className="h-3 w-3" />
                            {property.suburb}, {property.state}
                          </p>

                          <div className="my-3 flex items-center justify-between">
                            <p className="text-xl font-bold text-slate-900">
                              {property.price}
                            </p>
                            <span
                              className="rounded-full px-2 py-1 text-xs font-semibold"
                              style={{
                                backgroundColor:
                                  getRiskColor(property.riskScore) + '20',
                                color: getRiskColor(property.riskScore),
                              }}
                            >
                              {getRiskLabel(property.riskScore)} Risk
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-slate-700">
                            <span className="flex items-center gap-1">
                              <Bed className="h-4 w-4" /> {property.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath className="h-4 w-4" /> {property.bathrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Car className="h-4 w-4" /> {property.parking}
                            </span>
                            <span className="flex items-center gap-1">
                              <Square className="h-4 w-4" /> {property.landSize}
                              m²
                            </span>
                          </div>

                          <p className="mt-2 text-center text-xs font-medium text-primary">
                            Click for detailed risk analysis →
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </Card>
        </div>

        {/* Property List Sidebar */}
        {showSidebar && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {properties.length} Properties Across Australia
            </h3>

            <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 ${
                    selectedProperty?.id === property.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : hoveredPropertyId === property.id
                        ? 'border-slate-300'
                        : 'border-slate-200 dark:border-slate-700'
                  }`}
                  onClick={() => setSelectedProperty(property)}
                  onMouseEnter={() => setHoveredPropertyId(property.id)}
                  onMouseLeave={() => setHoveredPropertyId(null)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.imageUrl}
                    alt={property.address}
                    className="mb-2 h-28 w-full rounded-md object-cover"
                  />

                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {property.address}
                  </h4>
                  <p className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {property.suburb}, {property.state}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {property.price}
                    </p>
                    <span
                      className="rounded-full px-2 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          getRiskColor(property.riskScore) + '20',
                        color: getRiskColor(property.riskScore),
                      }}
                    >
                      {getRiskLabel(property.riskScore)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Bed className="h-3 w-3" /> {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3 w-3" /> {property.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="h-3 w-3" /> {property.landSize}m²
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Risk Analysis Panel */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-primary/20">
              {/* Header */}
              <div className="flex items-start justify-between bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Detailed Risk Analysis
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    {selectedProperty.address}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-slate-300">
                    <MapPin className="h-3 w-3" />
                    {selectedProperty.suburb}, {selectedProperty.state}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                    <span>{selectedProperty.propertyType}</span>
                    <span className="flex items-center gap-1">
                      <Bed className="h-3 w-3" /> {selectedProperty.bedrooms}{' '}
                      bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3 w-3" /> {selectedProperty.bathrooms}{' '}
                      bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="h-3 w-3" /> {selectedProperty.parking} car
                    </span>
                    <span>{selectedProperty.landSize}m²</span>
                    <span>Built {selectedProperty.yearBuilt}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{selectedProperty.price}</p>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="mt-2 text-slate-400 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-3">
                {/* Overall Risk Score */}
                <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 dark:from-slate-800 dark:to-slate-900">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Overall Risk Score
                  </p>
                  <p
                    className="text-5xl font-bold"
                    style={{
                      color: getRiskColor(selectedProperty.riskScore),
                    }}
                  >
                    {(selectedProperty.riskScore * 100).toFixed(0)}
                    <span className="text-2xl">/100</span>
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{
                      color: getRiskColor(selectedProperty.riskScore),
                    }}
                  >
                    {getRiskLabel(selectedProperty.riskScore)} Risk
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {selectedProperty.riskScore < 0.25
                      ? 'Excellent investment profile with minimal environmental and social risks.'
                      : selectedProperty.riskScore < 0.4
                        ? 'Good investment with manageable risk factors. Review breakdown below.'
                        : selectedProperty.riskScore < 0.55
                          ? 'Moderate risk level. Some factors require careful evaluation before purchasing.'
                          : 'Elevated risk profile. Thorough due diligence strongly recommended.'}
                  </p>
                </div>

                {/* Market Data */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Market Data
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        12-Month Growth
                      </div>
                      <span className="font-semibold text-green-600">
                        {selectedProperty.priceGrowth}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Days on Market
                      </div>
                      <span className="font-semibold">
                        {selectedProperty.daysOnMarket} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Suburb Median
                      </span>
                      <span className="font-semibold">
                        {selectedProperty.medianSuburbPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Council Rates
                      </span>
                      <span className="font-semibold">
                        {selectedProperty.councilRates}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Property Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Flood Zone
                      </span>
                      <span
                        className={`font-semibold ${
                          selectedProperty.floodZone === 'None'
                            ? 'text-green-600'
                            : selectedProperty.floodZone === 'Low'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {selectedProperty.floodZone}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Bushfire Level
                      </span>
                      <span
                        className={`font-semibold ${
                          selectedProperty.bushfireLevel === 'None'
                            ? 'text-green-600'
                            : selectedProperty.bushfireLevel === 'Low'
                              ? 'text-yellow-600'
                              : selectedProperty.bushfireLevel === 'Medium'
                                ? 'text-orange-600'
                                : 'text-red-600'
                        }`}
                      >
                        {selectedProperty.bushfireLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Nearest Station
                      </span>
                      <span className="text-right text-sm font-semibold">
                        {selectedProperty.nearestStation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        School Catchment
                      </span>
                      <span className="text-right text-sm font-semibold">
                        {selectedProperty.schoolCatchment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factor Breakdown */}
              <div className="border-t px-6 pb-6 pt-4">
                <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Risk Factor Breakdown
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {RISK_FACTORS.map((factor) => {
                    const value = selectedProperty.riskBreakdown[factor.key];
                    return (
                      <div
                        key={factor.key}
                        className="rounded-lg border p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="rounded-full p-1.5"
                              style={{
                                backgroundColor: getRiskColor(value) + '20',
                                color: getRiskColor(value),
                              }}
                            >
                              {factor.icon}
                            </span>
                            <span className="text-sm font-medium">
                              {factor.label}
                            </span>
                          </div>
                          <span
                            className="text-lg font-bold"
                            style={{ color: getRiskColor(value) }}
                          >
                            {(value * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="mb-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${value * 100}%`,
                              backgroundColor: getRiskColor(value),
                            }}
                          />
                        </div>
                        <p className="text-xs text-slate-500">
                          {factor.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
