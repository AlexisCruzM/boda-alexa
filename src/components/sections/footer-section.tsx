"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

/**
 * Footer animado con las iniciales de los novios
 * El texto aparece con una animación desde abajo
 * Incluye imagen de fondo y efecto de overlay
 */
export const FooterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  // Intersection Observer para activar la animación
  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 200);
          observer.unobserve(elementRef);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(elementRef);

    return () => {
      if (elementRef) observer.unobserve(elementRef);
    };
  }, [elementRef]);

  return (
    <footer
      ref={setElementRef}
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(40, 71, 48, 0.8), rgba(40, 71, 48, 0.9)), url('https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Contenido del footer */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Iniciales grandes con animación */}
        <div className={`
          transition-all duration-1000 ease-out
          ${isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
          }
        `}>
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl mb-4 text-wedding-gold-light">
            A & F
          </h1>
        </div>

        {/* Fecha con animación retardada */}
        <div className={`
          transition-all duration-1000 ease-out delay-300
          ${isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
          }
        `}>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-wedding-gold-light w-12 sm:w-16"></div>
            <Heart className="mx-4 text-wedding-gold-light" size={24} />
            <div className="h-px bg-wedding-gold-light w-12 sm:w-16"></div>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-serif mb-2">
            06 • 09 • 2025
          </p>
        </div>

        {/* Mensaje final con animación más retardada */}
        <div className={`
          transition-all duration-1000 ease-out delay-500
          ${isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
          }
        `}>
          <p className="text-white/80 text-sm sm:text-base font-light">
            Esperamos celebrar contigo este día tan especial
          </p>
        </div>

        {/* Nombres completos con animación final */}
        <div className={`
          mt-8 transition-all duration-1000 ease-out delay-700
          ${isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
          }
        `}>
          <p className="font-script text-lg sm:text-xl text-wedding-gold-light/80">
            Alexandra & Fabian
          </p>
        </div>
      </div>
    </footer>
  );
};
