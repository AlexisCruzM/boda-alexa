"use client";

import React from "react";

interface GoldenGlowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente que aplica un efecto de brillo dorado sutil
 * Se usa para destacar elementos importantes como títulos
 */
export const GoldenGlow: React.FC<GoldenGlowProps> = ({
  children,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Efecto de brillo de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wedding-gold/20 to-transparent animate-pulse rounded-lg blur-sm"></div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
