'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Home, Droplet, Volume2, AlertTriangle } from 'lucide-react';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polygon),
  { ssr: false }
);
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface RiskLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  zones: Array<{
    name: string;
    coordinates: [number, number][];
    severity: 'low' | 'medium' | 'high';
  }>;
}

const RISK_LAYERS: RiskLayer[] = [
  {
    id: 'flooding',
    name: 'Flood Risk',
    icon: <Droplet className="h-4 w-4" />,
    color: 'rgba(59, 130, 246, 0.6)',
    description: 'Historical flooding and flood zone data',
    zones: [
      {
        name: 'Yarra River Flood Zone',
        severity: 'high',
        coordinates: [
          [-37.819, 144.96],
          [-37.82, 144.965],
          [-37.818, 144.968],
          [-37.817, 144.963],
        ],
      },
      {
        name: 'Minor Flood Zone',
        severity: 'medium',
        coordinates: [
          [-37.81, 144.958],
          [-37.812, 144.962],
          [-37.809, 144.964],
          [-37.808, 144.96],
        ],
      },
    ],
  },
  {
    id: 'public_housing',
    name: 'Public Housing',
    icon: <Home className="h-4 w-4" />,
    color: 'rgba(168, 85, 247, 0.6)',
    description: 'Proximity to public housing areas',
    zones: [
      {
        name: 'Housing Estate Area',
        severity: 'medium',
        coordinates: [
          [-37.808, 144.965],
          [-37.81, 144.968],
          [-37.807, 144.97],
          [-37.806, 144.967],
        ],
      },
    ],
  },
  {
    id: 'noise',
    name: 'Noise Levels',
    icon: <Volume2 className="h-4 w-4" />,
    color: 'rgba(251, 146, 60, 0.6)',
    description: 'Traffic and environmental noise data',
    zones: [
      {
        name: 'High Traffic Zone',
        severity: 'high',
        coordinates: [
          [-37.815, 144.955],
          [-37.817, 144.959],
          [-37.814, 144.96],
          [-37.813, 144.956],
        ],
      },
      {
        name: 'Train Line Noise',
        severity: 'medium',
        coordinates: [
          [-37.812, 144.968],
          [-37.814, 144.972],
          [-37.811, 144.973],
          [-37.81, 144.969],
        ],
      },
    ],
  },
  {
    id: 'fire',
    name: 'Fire Risk',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'rgba(239, 68, 68, 0.6)',
    description: 'Bushfire and fire hazard zones',
    zones: [
      {
        name: 'Bushfire Prone Area',
        severity: 'high',
        coordinates: [
          [-37.805, 144.96],
          [-37.807, 144.963],
          [-37.804, 144.965],
          [-37.803, 144.962],
        ],
      },
    ],
  },
];

/**
 * Interactive risk overlay demonstration component using real maps.
 * Shows how different risk layers can be toggled on/off on a real Melbourne map.
 */
export function RiskOverlayDemo() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(['flooding'])
  );
  const [isMounted, setIsMounted] = useState(false);

  // Only render map on client side
  useEffect(() => {
    setIsMounted(true);
    // Import Leaflet setup for icon configuration
    import('@/lib/leaflet-setup');
  }, []);

  // Melbourne CBD center coordinates
  const center: [number, number] = [-37.8136, 144.9631];
  const propertyLocation: [number, number] = [-37.8136, 144.9631];

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const getSeverityColor = (
    severity: 'low' | 'medium' | 'high',
    baseColor: string
  ): string => {
    const opacityMap = {
      low: '0.3',
      medium: '0.5',
      high: '0.7',
    };
    return baseColor.replace(/[\d.]+\)$/, `${opacityMap[severity]})`);
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Map Visualization */}
        <div className="relative aspect-square bg-slate-200 dark:bg-slate-700 lg:aspect-auto">
          <div className="h-full w-full">
            {!isMounted ? (
              <div className="flex h-full w-full items-center justify-center text-slate-500">
                Loading map...
              </div>
            ) : (
              <MapContainer
                center={center}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Property Location Marker */}
                <Circle
                  center={propertyLocation}
                  radius={100}
                  pathOptions={{
                    color: '#ef4444',
                    fillColor: '#ef4444',
                    fillOpacity: 0.8,
                    weight: 3,
                  }}
                />

                {/* Risk Layer Overlays */}
                {RISK_LAYERS.map((layer) =>
                  activeLayers.has(layer.id)
                    ? layer.zones.map((zone, index) => (
                        <Polygon
                          key={`${layer.id}-${index}`}
                          positions={zone.coordinates}
                          pathOptions={{
                            color: getSeverityColor(zone.severity, layer.color),
                            fillColor: getSeverityColor(
                              zone.severity,
                              layer.color
                            ),
                            fillOpacity: 0.6,
                            weight: 2,
                          }}
                        >
                          <Popup>
                            <div className="p-2">
                              <div className="mb-2 flex items-center gap-2">
                                {layer.icon}
                                <h4 className="font-semibold text-slate-900">
                                  {layer.name}
                                </h4>
                              </div>
                              <p className="text-sm text-slate-700">
                                {zone.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                Severity:{' '}
                                <span
                                  className={`font-semibold ${
                                    zone.severity === 'high'
                                      ? 'text-red-600'
                                      : zone.severity === 'medium'
                                        ? 'text-orange-600'
                                        : 'text-yellow-600'
                                  }`}
                                >
                                  {zone.severity.toUpperCase()}
                                </span>
                              </p>
                            </div>
                          </Popup>
                        </Polygon>
                      ))
                    : null
                )}
              </MapContainer>
            )}
          </div>
        </div>

        {/* Layer Controls */}
        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Risk Layer Controls</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Toggle different risk overlays to see comprehensive property
              analysis
            </p>
          </div>

          <div className="space-y-4">
            {RISK_LAYERS.map((layer) => (
              <motion.div
                key={layer.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="mt-1 rounded-full p-2"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.icon}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor={layer.id}
                    className="cursor-pointer font-medium"
                  >
                    {layer.name}
                  </Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {layer.description}
                  </p>
                  {activeLayers.has(layer.id) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-xs font-medium text-primary"
                    >
                      {layer.zones.length} zone
                      {layer.zones.length !== 1 ? 's' : ''} visible
                    </motion.p>
                  )}
                </div>
                <Switch
                  id={layer.id}
                  checked={activeLayers.has(layer.id)}
                  onCheckedChange={() => toggleLayer(layer.id)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-primary/10 p-4">
            <p className="text-sm font-medium">
              {activeLayers.size} {activeLayers.size === 1 ? 'layer' : 'layers'}{' '}
              active
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Combine multiple layers for comprehensive risk assessment
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
