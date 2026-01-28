'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Home,
  Droplet,
  Volume2,
  AlertTriangle,
  MapPin,
} from 'lucide-react';

interface RiskLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const RISK_LAYERS: RiskLayer[] = [
  {
    id: 'flooding',
    name: 'Flood Risk',
    icon: <Droplet className="h-4 w-4" />,
    color: 'rgba(59, 130, 246, 0.6)',
    description: 'Historical flooding and flood zone data',
  },
  {
    id: 'public_housing',
    name: 'Public Housing',
    icon: <Home className="h-4 w-4" />,
    color: 'rgba(168, 85, 247, 0.6)',
    description: 'Proximity to public housing areas',
  },
  {
    id: 'noise',
    name: 'Noise Levels',
    icon: <Volume2 className="h-4 w-4" />,
    color: 'rgba(251, 146, 60, 0.6)',
    description: 'Traffic and environmental noise data',
  },
  {
    id: 'fire',
    name: 'Fire Risk',
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'rgba(239, 68, 68, 0.6)',
    description: 'Bushfire and fire hazard zones',
  },
];

/**
 * Interactive risk overlay demonstration component.
 * Shows how different risk layers can be toggled on/off.
 */
export function RiskOverlayDemo() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(['flooding'])
  );

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

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Map Visualization */}
        <div className="relative aspect-square bg-slate-200 dark:bg-slate-700 lg:aspect-auto">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-full w-full">
              {/* Base map */}
              <svg
                className="h-full w-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Street grid */}
                <g opacity="0.3">
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={i * 40 + 20}
                        y1="20"
                        x2={i * 40 + 20}
                        y2="380"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="20"
                        y1={i * 40 + 20}
                        x2="380"
                        y2={i * 40 + 20}
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </React.Fragment>
                  ))}
                </g>

                {/* Property marker */}
                <circle cx="200" cy="200" r="8" fill="currentColor" />
                <MapPin className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
              </svg>

              {/* Risk overlays */}
              <AnimatePresence>
                {RISK_LAYERS.map(
                  (layer) =>
                    activeLayers.has(layer.id) && (
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at ${getLayerPosition(layer.id)}, ${layer.color} 0%, transparent 60%)`,
                        }}
                      />
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Risk Layer Controls</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Toggle different risk overlays to see comprehensive property analysis
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

function getLayerPosition(layerId: string): string {
  const positions: Record<string, string> = {
    flooding: '30% 70%',
    public_housing: '60% 40%',
    noise: '80% 60%',
    fire: '40% 30%',
  };
  return positions[layerId] || '50% 50%';
}
