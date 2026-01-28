'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface PocketData {
  x: number;
  y: number;
  value: number;
  label: string;
}

interface PocketHeatmapProps {
  animate?: boolean;
}

/**
 * Stylized pocket heatmap visualization component.
 * Shows street-level risk variation using animated cells.
 */
export function PocketHeatmap({ animate = true }: PocketHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPocket, setHoveredPocket] = useState<PocketData | null>(null);

  // Generate simulated pocket data
  const pockets: PocketData[] = React.useMemo(() => {
    const data: PocketData[] = [];
    const rows = 8;
    const cols = 12;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Create variation to show pockets
        const baseValue = 0.5;
        const variation = Math.sin(x * 0.5) * Math.cos(y * 0.7) * 0.3;
        const noise = (Math.random() - 0.5) * 0.2;
        const value = Math.max(0, Math.min(1, baseValue + variation + noise));

        data.push({
          x,
          y,
          value,
          label: `Block ${y * cols + x + 1}`,
        });
      }
    }

    return data;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 40;
    const gap = 4;
    canvas.width = 12 * (cellSize + gap);
    canvas.height = 8 * (cellSize + gap);

    let animationFrame: number;
    let time = 0;

    const drawHeatmap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pockets.forEach((pocket) => {
        const x = pocket.x * (cellSize + gap);
        const y = pocket.y * (cellSize + gap);

        // Animate pulse effect
        const pulseOffset = animate ? Math.sin(time * 0.002 + pocket.x * 0.3 + pocket.y * 0.3) * 0.1 : 0;
        const adjustedValue = Math.max(0, Math.min(1, pocket.value + pulseOffset));

        // Color gradient from green (low risk) to red (high risk)
        const hue = (1 - adjustedValue) * 120; // 120 = green, 0 = red
        const saturation = 70;
        const lightness = 50 + adjustedValue * 10;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, cellSize, cellSize);

        // Add subtle border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);
      });

      time += 16;
      if (animate) {
        animationFrame = requestAnimationFrame(drawHeatmap);
      }
    };

    drawHeatmap();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [pockets, animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = 40;
    const gap = 4;
    const col = Math.floor(x / (cellSize + gap));
    const row = Math.floor(y / (cellSize + gap));

    const pocket = pockets.find((p) => p.x === col && p.y === row);
    setHoveredPocket(pocket || null);
  };

  const handleMouseLeave = () => {
    setHoveredPocket(null);
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Street-Level Risk Variation
        </h3>
        <p className="text-sm text-slate-300">
          Each block represents a pocket with unique risk profile
        </p>
      </div>

      <div className="relative">
        <motion.canvas
          ref={canvasRef}
          className="rounded-lg"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ cursor: 'pointer' }}
        />

        {hoveredPocket && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 shadow-lg"
          >
            <p className="text-sm font-medium">{hoveredPocket.label}</p>
            <p className="text-xs text-muted-foreground">
              Risk Score: {(hoveredPocket.value * 100).toFixed(0)}%
            </p>
          </motion.div>
        )}
      </div>

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
