'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapFallback } from '@/components/map-fallback';

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
  riskBreakdown: {
    flood: number;
    crime: number;
    noise: number;
    publicHousing: number;
  };
  priceGrowth: string;
  daysOnMarket: number;
}

interface PocketHeatmapProps {
  animate?: boolean;
}

// Seed-based pseudo-random to avoid hydration mismatches
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/**
 * Real pocket heatmap visualization component using Leaflet.
 * Shows street-level risk variation on an actual map of Sydney.
 */
export function PocketHeatmap({ animate = true }: PocketHeatmapProps) {
  const [selectedPocket, setSelectedPocket] = useState<PocketData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only render map on client side
  useEffect(() => {
    import('@/lib/leaflet-setup')
      .then(() => setIsMounted(true))
      .catch((err) => {
        console.error('[PocketHeatmap] Failed to load Leaflet:', err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (
          typeof window !== 'undefined' &&
          (window as Record<string, any>).Sentry
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as Record<string, any>).Sentry.captureException(err);
        }
      });
  }, []);

  // Sydney CBD center coordinates
  const center: [number, number] = [-33.8688, 151.2093];

  // Generate realistic pocket data for Sydney streets
  const pockets: PocketData[] = React.useMemo(() => {
    const sydneyStreets = [
      {
        name: 'George Street',
        lat: -33.8688,
        lng: 151.2069,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Pitt Street',
        lat: -33.8695,
        lng: 151.209,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Elizabeth Street',
        lat: -33.871,
        lng: 151.2105,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Castlereagh Street',
        lat: -33.8705,
        lng: 151.2095,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Macquarie Street',
        lat: -33.8675,
        lng: 151.2135,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Oxford Street',
        lat: -33.8765,
        lng: 151.213,
        suburb: 'Darlinghurst',
      },
      {
        name: 'Crown Street',
        lat: -33.878,
        lng: 151.215,
        suburb: 'Surry Hills',
      },
      {
        name: 'Bourke Street',
        lat: -33.879,
        lng: 151.212,
        suburb: 'Surry Hills',
      },
      {
        name: 'Harbour Street',
        lat: -33.8735,
        lng: 151.2035,
        suburb: 'Darling Harbour',
      },
      {
        name: 'Sussex Street',
        lat: -33.87,
        lng: 151.204,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Kent Street',
        lat: -33.868,
        lng: 151.205,
        suburb: 'Sydney CBD',
      },
      {
        name: 'Market Street',
        lat: -33.8715,
        lng: 151.207,
        suburb: 'Sydney CBD',
      },
    ];

    return sydneyStreets.map((street, index) => {
      // Create small rectangles representing pockets (approx 100m x 100m)
      const latOffset = 0.0009; // ~100m
      const lngOffset = 0.0012; // ~100m

      const seed = index + 42;
      const r1 = seededRandom(seed);
      const r2 = seededRandom(seed + 10);
      const r3 = seededRandom(seed + 20);
      const r4 = seededRandom(seed + 30);
      const r5 = seededRandom(seed + 40);
      const r6 = seededRandom(seed + 50);
      const r7 = seededRandom(seed + 60);

      // Vary risk scores to show variation
      const baseRisk = 0.3 + Math.sin(index * 0.7) * 0.3;
      const riskScore = Math.max(
        0.1,
        Math.min(0.9, baseRisk + (r1 - 0.5) * 0.2)
      );

      // Vary median prices based on location
      const basePrice = 1200000;
      const priceVariation = Math.floor(riskScore * -300000 + r2 * 150000);
      const medianPrice = `$${((basePrice + priceVariation) / 1000).toFixed(0)}k`;

      // Generate risk breakdown components
      const floodRisk = Math.max(0, Math.min(1, riskScore + (r3 - 0.5) * 0.3));
      const crimeRisk = Math.max(0, Math.min(1, riskScore + (r4 - 0.5) * 0.4));
      const noiseRisk = Math.max(0, Math.min(1, riskScore + (r5 - 0.5) * 0.35));
      const publicHousingRisk = Math.max(
        0,
        Math.min(1, riskScore + (r6 - 0.5) * 0.25)
      );

      // Price growth based on risk (lower risk = higher growth)
      const growthRate = ((1 - riskScore) * 8 + r7 * 4).toFixed(1);
      const priceGrowth = `${growthRate}%`;

      // Days on market (higher risk = more days)
      const daysOnMarket = Math.floor(
        30 + riskScore * 40 + seededRandom(seed + 70) * 20
      );

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
        riskBreakdown: {
          flood: parseFloat(floodRisk.toFixed(2)),
          crime: parseFloat(crimeRisk.toFixed(2)),
          noise: parseFloat(noiseRisk.toFixed(2)),
          publicHousing: parseFloat(publicHousingRisk.toFixed(2)),
        },
        priceGrowth,
        daysOnMarket,
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
          Street-Level Risk Variation — Sydney CBD
        </h3>
        <p className="text-sm text-slate-300">
          Pocket-level risk profiles reveal what suburb averages hide —
          available across all Australian suburbs
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[500px] w-full overflow-hidden rounded-lg"
      >
        {!isMounted ? (
          <MapFallback label="Sydney pocket heatmap" />
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
                  <div className="min-w-[280px] p-3">
                    <h4 className="font-semibold text-slate-900">
                      {pocket.streetName}
                    </h4>
                    <p className="text-sm text-slate-600">{pocket.suburb}</p>

                    <div className="mt-3 space-y-2">
                      {/* Overall Risk Score */}
                      <div className="rounded-lg bg-slate-50 p-2">
                        <p className="text-xs font-medium text-slate-700">
                          Overall Risk Score
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: getRiskColor(pocket.riskScore) }}
                        >
                          {(pocket.riskScore * 100).toFixed(0)}%
                        </p>
                      </div>

                      {/* Risk Breakdown */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-700">
                          Risk Factors
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Flood Risk</span>
                            <span
                              className="font-medium"
                              style={{
                                color: getRiskColor(pocket.riskBreakdown.flood),
                              }}
                            >
                              {(pocket.riskBreakdown.flood * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Crime Risk</span>
                            <span
                              className="font-medium"
                              style={{
                                color: getRiskColor(pocket.riskBreakdown.crime),
                              }}
                            >
                              {(pocket.riskBreakdown.crime * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Noise Levels</span>
                            <span
                              className="font-medium"
                              style={{
                                color: getRiskColor(pocket.riskBreakdown.noise),
                              }}
                            >
                              {(pocket.riskBreakdown.noise * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">
                              Public Housing Proximity
                            </span>
                            <span
                              className="font-medium"
                              style={{
                                color: getRiskColor(
                                  pocket.riskBreakdown.publicHousing
                                ),
                              }}
                            >
                              {(
                                pocket.riskBreakdown.publicHousing * 100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Market Data */}
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2">
                        <div>
                          <p className="text-xs text-slate-600">Median Price</p>
                          <p className="text-sm font-semibold text-slate-900">
                            {pocket.medianPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">12mo Growth</p>
                          <p className="text-sm font-semibold text-green-600">
                            {pocket.priceGrowth}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-slate-600">
                            Avg Days on Market
                          </p>
                          <p className="text-sm font-semibold text-slate-900">
                            {pocket.daysOnMarket} days
                          </p>
                        </div>
                      </div>
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
          className="mt-4 rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">
                {selectedPocket.streetName}
              </h4>
              <p className="text-sm text-slate-600">{selectedPocket.suburb}</p>
            </div>
            <button
              onClick={() => setSelectedPocket(null)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Overall Risk Score */}
          <div className="mt-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <p className="text-sm font-medium text-slate-700">
              Overall Risk Score
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: getRiskColor(selectedPocket.riskScore) }}
            >
              {(selectedPocket.riskScore * 100).toFixed(0)}%
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {selectedPocket.riskScore < 0.3
                ? 'Low Risk - Excellent investment potential'
                : selectedPocket.riskScore < 0.6
                  ? 'Medium Risk - Good investment with some considerations'
                  : 'Higher Risk - Requires careful evaluation'}
            </p>
          </div>

          {/* Risk Breakdown */}
          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Risk Factor Breakdown
            </p>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Flood Risk</span>
                  <span
                    className="font-semibold"
                    style={{
                      color: getRiskColor(selectedPocket.riskBreakdown.flood),
                    }}
                  >
                    {(selectedPocket.riskBreakdown.flood * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedPocket.riskBreakdown.flood * 100}%`,
                      backgroundColor: getRiskColor(
                        selectedPocket.riskBreakdown.flood
                      ),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Crime Risk</span>
                  <span
                    className="font-semibold"
                    style={{
                      color: getRiskColor(selectedPocket.riskBreakdown.crime),
                    }}
                  >
                    {(selectedPocket.riskBreakdown.crime * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedPocket.riskBreakdown.crime * 100}%`,
                      backgroundColor: getRiskColor(
                        selectedPocket.riskBreakdown.crime
                      ),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">Noise Levels</span>
                  <span
                    className="font-semibold"
                    style={{
                      color: getRiskColor(selectedPocket.riskBreakdown.noise),
                    }}
                  >
                    {(selectedPocket.riskBreakdown.noise * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedPocket.riskBreakdown.noise * 100}%`,
                      backgroundColor: getRiskColor(
                        selectedPocket.riskBreakdown.noise
                      ),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">
                    Public Housing Proximity
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      color: getRiskColor(
                        selectedPocket.riskBreakdown.publicHousing
                      ),
                    }}
                  >
                    {(selectedPocket.riskBreakdown.publicHousing * 100).toFixed(
                      0
                    )}
                    %
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedPocket.riskBreakdown.publicHousing * 100}%`,
                      backgroundColor: getRiskColor(
                        selectedPocket.riskBreakdown.publicHousing
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Market Data */}
          <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg border border-slate-200 p-4">
            <div>
              <p className="text-xs text-slate-600">Median Price</p>
              <p className="text-lg font-bold text-slate-900">
                {selectedPocket.medianPrice}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600">12mo Growth</p>
              <p className="text-lg font-bold text-green-600">
                {selectedPocket.priceGrowth}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Days on Market</p>
              <p className="text-lg font-bold text-slate-900">
                {selectedPocket.daysOnMarket}
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
