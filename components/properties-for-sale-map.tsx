'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

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

interface Property {
  id: string;
  address: string;
  suburb: string;
  coordinates: [number, number];
  price: string;
  priceValue: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: number;
  propertyType: string;
  riskScore: number;
  riskBreakdown: {
    flood: number;
    crime: number;
    noise: number;
    publicHousing: number;
  };
  imageUrl: string;
  daysOnMarket: number;
  priceGrowth: string;
}

interface PropertiesForSaleMapProps {
  showSidebar?: boolean;
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

  // Only render map on client side
  useEffect(() => {
    setIsMounted(true);
    // Import Leaflet setup for icon configuration
    import('@/lib/leaflet-setup');
  }, []);

  // Melbourne CBD center
  const center: [number, number] = [-37.8136, 144.9631];

  // Generate realistic property listings for Melbourne
  const properties: Property[] = React.useMemo(() => {
    const melbourneProperties = [
      {
        address: '12 Collins St',
        suburb: 'Melbourne CBD',
        lat: -37.8136,
        lng: 144.9631,
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        landSize: 85,
        basePrice: 750000,
      },
      {
        address: '45 Bourke St',
        suburb: 'Melbourne CBD',
        lat: -37.814,
        lng: 144.9645,
        propertyType: 'Apartment',
        bedrooms: 1,
        bathrooms: 1,
        parking: 1,
        landSize: 55,
        basePrice: 520000,
      },
      {
        address: '78 Flinders St',
        suburb: 'Melbourne CBD',
        lat: -37.8175,
        lng: 144.9685,
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        landSize: 120,
        basePrice: 950000,
      },
      {
        address: '23 Elizabeth St',
        suburb: 'Melbourne CBD',
        lat: -37.8105,
        lng: 144.9625,
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 1,
        parking: 1,
        landSize: 75,
        basePrice: 680000,
      },
      {
        address: '56 Swanston St',
        suburb: 'Melbourne CBD',
        lat: -37.8155,
        lng: 144.9655,
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        landSize: 90,
        basePrice: 820000,
      },
      {
        address: '89 Spencer St',
        suburb: 'Docklands',
        lat: -37.8195,
        lng: 144.9545,
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        landSize: 135,
        basePrice: 1050000,
      },
      {
        address: '34 King St',
        suburb: 'Melbourne CBD',
        lat: -37.8175,
        lng: 144.9565,
        propertyType: 'Apartment',
        bedrooms: 1,
        bathrooms: 1,
        parking: 0,
        landSize: 45,
        basePrice: 480000,
      },
      {
        address: '67 Queen St',
        suburb: 'Melbourne CBD',
        lat: -37.8125,
        lng: 144.9605,
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        landSize: 80,
        basePrice: 720000,
      },
    ];

    return melbourneProperties.map((prop, index) => {
      // Calculate risk score with variation
      const baseRisk = 0.25 + Math.sin(index * 0.8) * 0.25;
      const riskScore = Math.max(
        0.1,
        Math.min(0.75, baseRisk + (Math.random() - 0.5) * 0.2)
      );

      // Risk breakdown
      const floodRisk = Math.max(
        0,
        Math.min(1, riskScore + (Math.random() - 0.5) * 0.3)
      );
      const crimeRisk = Math.max(
        0,
        Math.min(1, riskScore + (Math.random() - 0.5) * 0.25)
      );
      const noiseRisk = Math.max(
        0,
        Math.min(1, riskScore + (Math.random() - 0.5) * 0.3)
      );
      const publicHousingRisk = Math.max(
        0,
        Math.min(1, riskScore + (Math.random() - 0.5) * 0.2)
      );

      // Price adjustment based on risk
      const priceAdjustment = (1 - riskScore * 0.15) * prop.basePrice;
      const finalPrice = Math.round(priceAdjustment / 1000) * 1000;

      // Days on market (higher risk = more days)
      const daysOnMarket = Math.floor(20 + riskScore * 50 + Math.random() * 15);

      // Price growth (lower risk = higher growth)
      const growthRate = ((1 - riskScore) * 10 + Math.random() * 5).toFixed(1);

      return {
        id: `property-${index}`,
        address: prop.address,
        suburb: prop.suburb,
        coordinates: [prop.lat, prop.lng] as [number, number],
        price: `$${(finalPrice / 1000).toFixed(0)}k`,
        priceValue: finalPrice,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        parking: prop.parking,
        landSize: prop.landSize,
        propertyType: prop.propertyType,
        riskScore: parseFloat(riskScore.toFixed(2)),
        riskBreakdown: {
          flood: parseFloat(floodRisk.toFixed(2)),
          crime: parseFloat(crimeRisk.toFixed(2)),
          noise: parseFloat(noiseRisk.toFixed(2)),
          publicHousing: parseFloat(publicHousingRisk.toFixed(2)),
        },
        imageUrl: `https://images.unsplash.com/photo-${1560184000000 + index * 100000000}?w=400&h=300&fit=crop`,
        daysOnMarket,
        priceGrowth: `${growthRate}%`,
      };
    });
  }, []);

  // Get color based on risk score
  const getRiskColor = (riskScore: number): string => {
    const hue = (1 - riskScore) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getRiskLabel = (riskScore: number): string => {
    if (riskScore < 0.3) return 'Low Risk';
    if (riskScore < 0.6) return 'Medium Risk';
    return 'Higher Risk';
  };

  return (
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
                zoom={14}
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
                      <div className="min-w-[320px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={property.imageUrl}
                          alt={property.address}
                          className="mb-3 h-48 w-full rounded-lg object-cover"
                        />

                        <h4 className="font-semibold text-slate-900">
                          {property.address}
                        </h4>
                        <p className="flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="h-3 w-3" />
                          {property.suburb}
                        </p>

                        <div className="my-3 flex items-center justify-between">
                          <p className="text-2xl font-bold text-slate-900">
                            {property.price}
                          </p>
                          <div className="text-right">
                            <p className="text-xs text-slate-600">Risk Score</p>
                            <p
                              className="text-lg font-bold"
                              style={{
                                color: getRiskColor(property.riskScore),
                              }}
                            >
                              {(property.riskScore * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-700">
                          <span className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            {property.landSize}m²
                          </span>
                        </div>

                        <div className="mt-3 space-y-1 border-t border-slate-200 pt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">
                              Days on Market
                            </span>
                            <span className="font-medium text-slate-900">
                              {property.daysOnMarket} days
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">12mo Growth</span>
                            <span className="font-semibold text-green-600">
                              {property.priceGrowth}
                            </span>
                          </div>
                        </div>
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
            {properties.length} Properties Available
          </h3>

          <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow-md ${
                  selectedProperty?.id === property.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : hoveredPropertyId === property.id
                      ? 'border-slate-300'
                      : 'border-slate-200'
                }`}
                onClick={() => setSelectedProperty(property)}
                onMouseEnter={() => setHoveredPropertyId(property.id)}
                onMouseLeave={() => setHoveredPropertyId(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.imageUrl}
                  alt={property.address}
                  className="mb-2 h-32 w-full rounded-md object-cover"
                />

                <h4 className="font-semibold text-slate-900">
                  {property.address}
                </h4>
                <p className="flex items-center gap-1 text-xs text-slate-600">
                  <MapPin className="h-3 w-3" />
                  {property.suburb}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-900">
                    {property.price}
                  </p>
                  <span
                    className="rounded-full px-2 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: getRiskColor(property.riskScore) + '20',
                      color: getRiskColor(property.riskScore),
                    }}
                  >
                    {getRiskLabel(property.riskScore)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-700">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3 w-3" />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-3 w-3" />
                    {property.landSize}m²
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
