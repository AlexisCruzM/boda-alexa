"use client";

import React from "react";
import { Calendar, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldenGlow } from "../effects/golden-glow";

interface HeroSectionProps {
  onShare: () => void;
  onAddToCalendar: () => void;
}

/**
 * Sección Hero principal de la invitación de boda
 * Muestra imagen de fondo, nombres de los novios y fecha
 * Incluye botones para compartir y agregar al calendario
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onShare,
  onAddToCalendar
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Título principal "Nuestra Boda" */}
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl mb-6 text-white leading-tight">
            Nuestra Boda
          </h1>

          {/* Nombres de los novios con efecto dorado */}
          <GoldenGlow>
            <h2 className="font-script text-5xl sm:text-6xl md:text-8xl mb-8 text-white leading-tight">
              Alexandra & Fabian
            </h2>
          </GoldenGlow>
        </div>
      </div>
    </section>
  );
};
