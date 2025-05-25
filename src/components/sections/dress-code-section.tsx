"use client";

import React, { useState, useEffect } from "react";
import { Shirt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Sección del código de vestimenta con animación de entrada
 * Aparece con una animación de deslizamiento desde arriba
 */
export const DressCodeSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  // Intersection Observer para activar la animación al hacer scroll
  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Imagen de ancho completo (placeholder) */}
        <div className="w-full h-48 sm:h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Decoración elegante de boda"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenedor del código de vestimenta */}
        <div
          ref={setElementRef}
          className="max-w-md mx-auto"
        >
          <Card
            className={`
              border-wedding-gold/30 shadow-xl transition-all duration-1000 transform
              ${isVisible
                ? 'translate-y-0 opacity-100'
                : '-translate-y-12 opacity-0'
              }
            `}
          >
            <CardContent className="p-6 text-center">
              {/* Icono central con animación */}
              <div className="mb-6 flex justify-center">
                <div className={`
                  bg-wedding-gold/10 rounded-full p-4 transition-all duration-700 delay-300
                  ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
                `}>
                  <Shirt
                    size={32}
                    className="text-wedding-gold"
                  />
                </div>
              </div>

              {/* Título */}
              <h3 className={`
                font-serif text-xl sm:text-2xl text-wedding-green mb-4 transition-all duration-700 delay-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                Código de Vestimenta
              </h3>

              {/* Contenido */}
              <div className={`
                space-y-4 transition-all duration-700 delay-700
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                <div className="bg-wedding-cream/50 rounded-lg p-4">
                  <h4 className="font-medium text-wedding-green mb-2">
                    Ropa Formal
                  </h4>
                  <p className="text-sm text-wedding-green/80">
                    Te pedimos vestir con elegancia para esta ocasión especial
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-700 mb-2">
                    Colores a Evitar
                  </h4>
                  <p className="text-sm text-red-600">
                    Por favor evita usar <strong>blanco y verde</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
