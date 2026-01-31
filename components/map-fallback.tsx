'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface MapFallbackProps {
  /** Time in ms before showing the fallback (default 3000) */
  timeout?: number;
  /** Label shown in the centre of the placeholder */
  label?: string;
  /** Extra CSS classes forwarded to the outer wrapper */
  className?: string;
}

/**
 * Shown while a Leaflet map is loading.
 * After `timeout` ms it switches from a spinner to a styled static placeholder
 * so the user is never stuck on an empty box.
 */
export function MapFallback({
  timeout = 3000,
  label = 'Interactive map',
  className = '',
}: MapFallbackProps) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), timeout);
    return () => clearTimeout(id);
  }, [timeout]);

  if (!timedOut) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 ${className}`}
      >
        {/* simple CSS spinner */}
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-primary" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading map…
        </p>
      </div>
    );
  }

  // Static placeholder when the map hasn't mounted in time
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-slate-100 dark:bg-slate-800 ${className}`}
    >
      {/* Decorative grid / heatmap placeholder */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full opacity-[0.07] dark:opacity-[0.12]"
        aria-hidden="true"
      >
        {/* Grid lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <line
              x1={i * 40}
              y1={0}
              x2={i * 40}
              y2={300}
              stroke="currentColor"
              strokeWidth={0.5}
            />
            <line
              x1={0}
              y1={i * 30}
              x2={400}
              y2={i * 30}
              stroke="currentColor"
              strokeWidth={0.5}
            />
          </React.Fragment>
        ))}
        {/* Coloured cells suggesting a heatmap */}
        <rect
          x={80}
          y={90}
          width={40}
          height={30}
          rx={4}
          fill="#22c55e"
          opacity={0.5}
        />
        <rect
          x={120}
          y={90}
          width={40}
          height={30}
          rx={4}
          fill="#eab308"
          opacity={0.5}
        />
        <rect
          x={160}
          y={90}
          width={40}
          height={30}
          rx={4}
          fill="#ef4444"
          opacity={0.4}
        />
        <rect
          x={120}
          y={120}
          width={40}
          height={30}
          rx={4}
          fill="#22c55e"
          opacity={0.6}
        />
        <rect
          x={160}
          y={120}
          width={40}
          height={30}
          rx={4}
          fill="#eab308"
          opacity={0.4}
        />
        <rect
          x={200}
          y={120}
          width={40}
          height={30}
          rx={4}
          fill="#22c55e"
          opacity={0.5}
        />
        <rect
          x={200}
          y={90}
          width={40}
          height={30}
          rx={4}
          fill="#eab308"
          opacity={0.5}
        />
        <rect
          x={240}
          y={90}
          width={40}
          height={30}
          rx={4}
          fill="#22c55e"
          opacity={0.45}
        />
        <rect
          x={80}
          y={120}
          width={40}
          height={30}
          rx={4}
          fill="#ef4444"
          opacity={0.35}
        />
        <rect
          x={240}
          y={120}
          width={40}
          height={30}
          rx={4}
          fill="#eab308"
          opacity={0.4}
        />
        <rect
          x={160}
          y={150}
          width={40}
          height={30}
          rx={4}
          fill="#22c55e"
          opacity={0.5}
        />
        <rect
          x={200}
          y={150}
          width={40}
          height={30}
          rx={4}
          fill="#ef4444"
          opacity={0.3}
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-2 rounded-xl bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:bg-slate-900/80">
        <MapPin className="h-8 w-8 text-primary" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </p>
        <p className="max-w-[240px] text-center text-xs text-slate-500 dark:text-slate-400">
          The interactive map could not be loaded. Try refreshing the page.
        </p>
      </div>
    </div>
  );
}
