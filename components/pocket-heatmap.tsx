'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Rectangle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Rectangle),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface PocketData {
  id: string;
  bounds: [[number, number], [number, number]];
  riskScore: number;
  streetName: string;
  suburb: string;
  medianPrice: string;
}

interface PocketHeatmapProps {
  animate?: boolean;
}

/**
 * Real pocket heatmap visualization component using Leaflet.
 * Shows street-level risk variation on an actual map of Melbourne.
 */
export function PocketHeatmap({ animate = true }: PocketHeatmapProps) {
  const [selectedPocket, setSelectedPocket] = useState<PocketData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only render map on client side
  useEffect(() => {
    setIsMounted(true);
    // Import Leaflet setup for icon configuration
    import('@/lib/leaflet-setup');
  }, []);

  // Melbourne CBD center coordinates
  const center: [number, number] = [-37.8136, 144.9631];

  // Generate realistic pocket data for Melbourne streets
  const pockets: PocketData[] = React.useMemo(() => {
    const melbourneStreets = [
      {
        name: 'Collins St',
        lat: -37.8136,
        lng: 144.9631,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'Bourke St',
        lat: -37.814,
        lng: 144.9633,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'Flinders St',
        lat: -37.8183,
        lng: 144.9671,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'Elizabeth St',
        lat: -37.81,
        lng: 144.962,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'Swanston St',
        lat: -37.815,
        lng: 144.965,
        suburb: 'Melbourne CBD',
      },
      { name: 'Spencer St', lat: -37.819, lng: 144.954, suburb: 'Docklands' },
      { name: 'King St', lat: -37.817, lng: 144.956, suburb: 'Melbourne CBD' },
      {
        name: 'William St',
        lat: -37.811,
        lng: 144.957,
        suburb: 'Melbourne CBD',
      },
      { name: 'Queen St', lat: -37.812, lng: 144.96, suburb: 'Melbourne CBD' },
      {
        name: 'Lonsdale St',
        lat: -37.811,
        lng: 144.964,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'La Trobe St',
        lat: -37.809,
        lng: 144.9645,
        suburb: 'Melbourne CBD',
      },
      {
        name: 'Little Collins St',
        lat: -37.8145,
        lng: 144.9635,
        suburb: 'Melbourne CBD',
      },
    ];

    return melbourneStreets.map((street, index) => {
      // Create small rectangles representing pockets (approx 100m x 100m)
      const latOffset = 0.0009; // ~100m
      const lngOffset = 0.0012; // ~100m

      // Vary risk scores to show variation
      const baseRisk = 0.3 + Math.sin(index * 0.7) * 0.3;
      const riskScore = Math.max(
        0.1,
        Math.min(0.9, baseRisk + (Math.random() - 0.5) * 0.2)
      );

      // Vary median prices based on location
      const basePrice = 800000;
      const priceVariation = Math.floor(
        riskScore * -200000 + Math.random() * 100000
      );
      const medianPrice = `$${((basePrice + priceVariation) / 1000).toFixed(0)}k`;

      return {
        id: `pocket-${index}`,
        bounds: [
          [street.lat, street.lng],
          [street.lat + latOffset, street.lng + lngOffset],
        ] as [[number, number], [number, number]],
        riskScore: parseFloat(riskScore.toFixed(2)),
        streetName: street.name,
        suburb: street.suburb,
        medianPrice,
      };
    });
  }, []);

  // Get color based on risk score
  const getRiskColor = (riskScore: number): string => {
    const hue = (1 - riskScore) * 120; // 120 = green, 0 = red
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Street-Level Risk Variation
        </h3>
        <p className="text-sm text-slate-300">
          Real Melbourne streets showing pocket-level risk profiles
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[500px] w-full overflow-hidden rounded-lg"
      >
        {!isMounted ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-700 text-white">
            Loading map...
          </div>
        ) : (
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pockets.map((pocket) => (
              <Rectangle
                key={pocket.id}
                bounds={pocket.bounds}
                pathOptions={{
                  fillColor: getRiskColor(pocket.riskScore),
                  fillOpacity: 0.6,
                  color: getRiskColor(pocket.riskScore),
                  weight: 2,
                  opacity: animate ? 0.8 : 0.6,
                }}
                eventHandlers={{
                  click: () => setSelectedPocket(pocket),
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.8,
                      weight: 3,
                    });
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.6,
                      weight: 2,
                    });
                  },
                }}
              >
                <Popup>
                  <div className="min-w-[200px] p-2">
                    <h4 className="font-semibold text-slate-900">
                      {pocket.streetName}
                    </h4>
                    <p className="text-sm text-slate-600">{pocket.suburb}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Risk Score:</span>{' '}
                        <span
                          className="font-semibold"
                          style={{ color: getRiskColor(pocket.riskScore) }}
                        >
                          {(pocket.riskScore * 100).toFixed(0)}%
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Median Price:</span>{' '}
                        {pocket.medianPrice}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Rectangle>
            ))}
          </MapContainer>
        )}
      </motion.div>

      {selectedPocket && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-white p-4 shadow-lg"
        >
          <h4 className="font-semibold text-slate-900">
            {selectedPocket.streetName}, {selectedPocket.suburb}
          </h4>
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600">Risk Score</p>
              <p
                className="text-lg font-bold"
                style={{ color: getRiskColor(selectedPocket.riskScore) }}
              >
                {(selectedPocket.riskScore * 100).toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-slate-600">Median Price</p>
              <p className="text-lg font-bold text-slate-900">
                {selectedPocket.medianPrice}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-500" />
          Lower Risk
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-yellow-500" />
          Medium Risk
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          Higher Risk
        </span>
      </div>
    </Card>
  );
}
